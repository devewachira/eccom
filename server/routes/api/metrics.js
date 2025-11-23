const express = require('express');
const router = express.Router();

const Order = require('../../models/order');
const Cart = require('../../models/cart');
const User = require('../../models/user');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const { ROLES } = require('../../constants');

// Helper to format currency values consistently
const formatCurrency = value => {
  const amount = Number(value || 0);
  return Math.round(amount);
};

// GET /api/metrics/summary
// Basic KPI dashboard for admins
router.get(
  '/summary',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      // Time ranges
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOf7DaysAgo = new Date(startOfToday);
      startOf7DaysAgo.setDate(startOfToday.getDate() - 6);

      // Base query: all orders (admins) or merchant-specific (future enhancement)
      const match = {};

      const allOrders = await Order.find(match).populate({
        path: 'user',
        select: '_id'
      });

      const totalOrders = allOrders.length;
      const totalRevenueRaw = allOrders.reduce((sum, o) => sum + (o.total || 0), 0);

      const customersSet = new Set(allOrders.map(o => String(o.user?._id || '')));
      customersSet.delete('');
      const totalCustomers = customersSet.size;

      const todayRevenueRaw = allOrders
        .filter(o => o.created >= startOfToday)
        .reduce((sum, o) => sum + (o.total || 0), 0);

      const last7DaysRevenueRaw = allOrders
        .filter(o => o.created >= startOf7DaysAgo)
        .reduce((sum, o) => sum + (o.total || 0), 0);

      const averageOrderValueRaw = totalOrders > 0 ? totalRevenueRaw / totalOrders : 0;

      // Repeat purchase rate: customers with 2+ orders / customers with at least 1 order
      const ordersByUser = {};
      allOrders.forEach(o => {
        const userId = String(o.user?._id || '');
        if (!userId) return;
        ordersByUser[userId] = (ordersByUser[userId] || 0) + 1;
      });
      const customersWithOrders = Object.keys(ordersByUser).length;
      const repeatCustomers = Object.values(ordersByUser).filter(c => c >= 2).length;
      const repeatPurchaseRate = customersWithOrders
        ? ((repeatCustomers / customersWithOrders) * 100).toFixed(1)
        : '0.0';

      // Cart-based metrics (rough approximations for now)
      const cartsCount = await Cart.countDocuments({});
      const cartsWithOrders = totalOrders; // since each order references exactly one cart in this app
      const cartAbandonmentRate = cartsCount
        ? (((cartsCount - cartsWithOrders) / cartsCount) * 100).toFixed(1)
        : '0.0';

      // Refund / return data is not explicitly modeled; expose 0 for now so UI is consistent
      const refundRate = '0.0';

      // Conversion rate and net revenue require traffic and refund data; 
      // here we provide placeholders that can be wired to analytics later.
      const conversionRate = '0.0';
      const netRevenueRaw = totalRevenueRaw; // adjust when refunds/discounts are modeled

      res.status(200).json({
        totalRevenue: formatCurrency(totalRevenueRaw),
        netRevenue: formatCurrency(netRevenueRaw),
        totalOrders,
        totalCustomers,
        averageOrderValue: formatCurrency(averageOrderValueRaw),
        conversionRate,
        repeatPurchaseRate,
        refundRate,
        cartAbandonmentRate,
        todayRevenue: formatCurrency(todayRevenueRaw),
        last7DaysRevenue: formatCurrency(last7DaysRevenueRaw)
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

module.exports = router;

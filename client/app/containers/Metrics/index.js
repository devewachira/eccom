/**
 *
 * Metrics (Admin KPI Dashboard)
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';

import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import actions from '../../actions';

class Metrics extends React.PureComponent {
  componentDidMount() {
    this.props.fetchMetrics();
  }

  renderStat(label, value, helper) {
    return (
      <Card className='mb-3 metrics-card'>
        <CardBody>
          <p className='metrics-label mb-1'>{label}</p>
          <h2 className='metrics-value mb-1'>{value}</h2>
          {helper && <p className='metrics-helper mb-0'>{helper}</p>}
        </CardBody>
      </Card>
    );
  }

  render() {
    const { isLoading, summary } = this.props;

    if (isLoading) {
      return <LoadingIndicator />;
    }

    if (!summary) {
      return <NotFound message='No metrics available yet.' />;
    }

    const {
      totalRevenue,
      netRevenue,
      totalOrders,
      totalCustomers,
      averageOrderValue,
      conversionRate,
      repeatPurchaseRate,
      refundRate,
      cartAbandonmentRate,
      todayRevenue,
      last7DaysRevenue
    } = summary;

    return (
      <div className='metrics-dashboard'>
        <h1 className='mb-4'>Store Metrics</h1>

        <Row>
          <Col md='4'>{this.renderStat('Gross Revenue', totalRevenue, 'Total revenue from all orders')}</Col>
          <Col md='4'>{this.renderStat('Net Revenue', netRevenue, 'After refunds and adjustments')}</Col>
          <Col md='4'>{this.renderStat('Total Orders', totalOrders, 'All completed orders')}</Col>
        </Row>

        <Row>
          <Col md='4'>{this.renderStat('Average Order Value', averageOrderValue, 'Revenue / Orders')}</Col>
          <Col md='4'>{this.renderStat('Conversion Rate', `${conversionRate}%`, 'Purchases / Visitors')}</Col>
          <Col md='4'>{this.renderStat('Repeat Purchase Rate', `${repeatPurchaseRate}%`, 'Customers with 2+ orders')}</Col>
        </Row>

        <Row>
          <Col md='4'>{this.renderStat('Refund / Return Rate', `${refundRate}%`, 'Refunded orders / total')}</Col>
          <Col md='4'>{this.renderStat('Cart Abandonment Rate', `${cartAbandonmentRate}%`, 'Carts not converted')}</Col>
          <Col md='4'>{this.renderStat('Total Customers', totalCustomers, 'Unique customers with orders')}</Col>
        </Row>

        <Row>
          <Col md='6'>{this.renderStat('Today\'s Revenue', todayRevenue)}</Col>
          <Col md='6'>{this.renderStat('Last 7 Days Revenue', last7DaysRevenue)}</Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    summary: state.metrics.summary,
    isLoading: state.metrics.isLoading
  };
};

export default connect(mapStateToProps, actions)(Metrics);

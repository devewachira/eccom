/**
 *
 * OrderSummary
 *
 */

import React from 'react';

import { Col } from 'reactstrap';
import { formatCurrency } from '../../../utils/store';

const OrderSummary = props => {
  const { order } = props;

  return (
    <Col className='order-summary pt-3'>
      <h2>Order Summary</h2>
      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Subtotal</p>
        <p className='summary-value ml-auto'>{formatCurrency(order.total)}</p>
      </div>
      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Est. Sales Tax</p>
        <p className='summary-value ml-auto'>{formatCurrency(order.totalTax)}</p>
      </div>

      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Shipping & Handling</p>
        <p className='summary-value ml-auto'>KSh 0</p>
      </div>

      <hr />
      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Total</p>
        <p className='summary-value ml-auto'>{formatCurrency(order.totalWithTax)}</p>
      </div>
    </Col>
  );
};

export default OrderSummary;

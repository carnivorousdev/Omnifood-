import React from 'react';
import WeeklySales from './WeeklySales';
import { Row, Col } from 'react-bootstrap';
import {
  marketShare,
  totalOrder,
  weeklySalesData,
  weather,
} from 'data/dashboard/default';
import TotalOrder from './TotalOrder';
import MarketShare from './MarketShare';
import Weather from './Weather';

const Dashboard = () => {
  return (
    <>
      <Row className="g-3 mb-3">
        <Col md={6} xxl={3}>
          <WeeklySales data={weeklySalesData} />
        </Col>
        <Col md={6} xxl={3}>
          <TotalOrder data={totalOrder} />
        </Col>
        <Col md={6} xxl={3}>
          <MarketShare data={marketShare} radius={['100%', '87%']} />
        </Col>
        <Col md={6} xxl={3}>
          <Weather data={weather} />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;

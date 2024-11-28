import React from 'react'
import Chart1 from '../Charts/Chart1';
import Chart2 from '../Charts/Chart2';
import { Card, CardBody } from '@nextui-org/react';

const Charts = () => {
  return (
    <Card fullWidth>
      <CardBody className='flex justify-center items-center'>
        <Chart1 />
        <Chart2 />
      </CardBody>
    </Card> 
  )
}

export default Charts
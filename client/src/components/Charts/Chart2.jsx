import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { addLabels, balanceSheet } from './data2';

export default function Chart2() {
  return (
    <BarChart
      dataset={balanceSheet}
      series={addLabels([
        { dataKey: 'currAss', stack: 'assets' },
        { dataKey: 'nCurrAss', stack: 'assets' },
        { dataKey: 'curLia', stack: 'liability' },
        { dataKey: 'nCurLia', stack: 'liability' },
        { dataKey: 'capStock', stack: 'equity' },
        { dataKey: 'retEarn', stack: 'equity' },
        { dataKey: 'treas', stack: 'equity' },
      ])}
      xAxis={[{ scaleType: 'band', dataKey: 'year' }]}
      slotProps={{ legend: { hidden: true } }}
      width={600}
      height={250}
    />
  );
}

import React from 'react';
import { EuiPanel } from '../../../../../src';
import { Chart, LayoutDirection, Metric, Settings } from '@elastic/charts';
import { useChartBaseTheme } from '../utils/use_chart_base_theme';

export default () => {
  const chartBaseTheme = useChartBaseTheme();

  return (
    <EuiPanel paddingSize="none" style={{ overflow: 'hidden', width: 600 }}>
      <Chart size={[600, 200]}>
        <Settings baseTheme={chartBaseTheme} />
        <Metric
          id="1"
          data={[
            [
              {
                color: '#F1D86F',
                title: 'CPU Usage',
                value: 34.2,
                domainMax: 100,
                valueFormatter: (v) => `${v}%`,
                progressBarDirection: LayoutDirection.Vertical,
              },
              {
                color: '#FF7E62',
                title: 'Memory Usage',
                value: 59.5,
                domainMax: 100,
                valueFormatter: (v) => `${v}%`,
                progressBarDirection: LayoutDirection.Vertical,
              },
              {
                color: '#6ECCB1',
                title: 'Swap Usage',
                value: 21.0,
                domainMax: 100,
                valueFormatter: (v) => `${v.toFixed(1)}%`,
                progressBarDirection: LayoutDirection.Vertical,
              },
            ],
          ]}
        />
      </Chart>
    </EuiPanel>
  );
};

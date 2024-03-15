import React from 'react';
import { EuiPanel } from '../../../../../src';
import { Chart, Metric, Settings } from '@elastic/charts';
import { useChartBaseTheme } from '../utils/use_chart_base_theme';

export default () => {
  const chartBaseTheme = useChartBaseTheme();

  const data = Array.from({ length: 30 }).map((d, i) => ({
    x: i,
    y: Math.random() * 1000 + 10000,
  }));
  return (
    <EuiPanel paddingSize="none" style={{ overflow: 'hidden', width: 200 }}>
      <Chart size={[200, 200]}>
        <Settings baseTheme={chartBaseTheme} />
        <Metric
          id="1"
          data={[
            [
              {
                color: '#0277CC',
                title: 'Number of visitors',
                subtitle: 'www.elastic.co',
                extra: (
                  <span>
                    Total visitors <strong>345k</strong>
                  </span>
                ),
                value: data[data.length - 1].y,
                valueFormatter: (v) => `${(v / 1000).toFixed(0)}K`,
                trend: data,
              },
            ],
          ]}
        />
      </Chart>
    </EuiPanel>
  );
};

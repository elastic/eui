import { EuiPanel } from '../../../../../src';

import { Chart, Metric, Settings } from '@elastic/charts';
import React from 'react';
import { useChartBaseTheme } from '../utils/use_chart_base_theme';

export default () => {
  const chartBaseTheme = useChartBaseTheme();

  return (
    <div
      style={{
        height: '300px',
        width: '300px',
      }}
    >
      <div
        style={{
          resize: 'both',
          padding: '0px',
          overflow: 'auto',
          height: '200px',
          width: '200px',
        }}
      >
        <EuiPanel
          paddingSize="none"
          style={{ overflow: 'hidden', height: '100%', width: '100%' }}
        >
          <Chart size={['100%', '100%']}>
            <Settings baseTheme={chartBaseTheme} />
            <Metric
              id="1"
              data={[
                [
                  {
                    color: '#504EE9',
                    title: 'Current number of visitors',
                    subtitle: 'www.elastic.co',
                    extra: (
                      <span>
                        Total visitors <strong>353k</strong>
                      </span>
                    ),
                    value: 231,
                    valueFormatter: (v) => `${v}K`,
                  },
                ],
              ]}
            />
          </Chart>
        </EuiPanel>
      </div>
    </div>
  );
};

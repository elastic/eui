import React from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiPanel } from '../../../../../src';
import { Chart, LayoutDirection, Metric, Settings } from '@elastic/charts';
import { useChartBaseTheme } from '../utils/use_chart_base_theme';

export default () => {
  const chartBaseTheme = useChartBaseTheme();

  return (
    <EuiFlexGroup gutterSize="l" alignItems="flexStart" direction="row">
      <EuiFlexItem grow={false}>
        <EuiPanel
          paddingSize="none"
          style={{ overflow: 'hidden', width: '200px' }}
        >
          <Chart size={[200, 200]}>
            <Settings baseTheme={chartBaseTheme} />
            <Metric
              id="1"
              data={[
                [
                  {
                    color: '#A2CB9F',
                    title: 'CPU Usage',
                    subtitle: 'eui.co',
                    value: 34.2,
                    valueFormatter: (v) => `${v}%`,
                    domainMax: 100,
                    progressBarDirection: LayoutDirection.Vertical,
                    extra: (
                      <span>
                        last 10 min <strong>18.3%</strong>
                      </span>
                    ),
                  },
                ],
              ]}
            />{' '}
          </Chart>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiPanel
          paddingSize="none"
          style={{ overflow: 'hidden', width: '200px' }}
        >
          <Chart size={[200, 200]}>
            <Settings baseTheme={chartBaseTheme} />
            <Metric
              id="1"
              data={[
                [
                  {
                    color: '#E07A5F',
                    title: 'CPU Usage',
                    subtitle: 'charts.co',
                    extra: (
                      <span>
                        last 10 min <strong>18.3%</strong>
                      </span>
                    ),
                    value: 74.2,
                    valueFormatter: (v) => `${v}%`,
                    domainMax: 100,
                    progressBarDirection: LayoutDirection.Horizontal,
                  },
                ],
              ]}
            />
          </Chart>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

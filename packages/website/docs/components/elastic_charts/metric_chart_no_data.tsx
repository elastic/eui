import React from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiText,
} from '@elastic/eui';
import { Chart, Metric, Settings } from '@elastic/charts';
import { useChartBaseTheme } from './use_chart_base_theme';

export const MetricChartNoData = () => {
  const chartBaseTheme = useChartBaseTheme();

  return (
    <EuiFlexGroup gutterSize="l" alignItems="flexStart">
      <EuiFlexItem grow={0}>
        <EuiFlexGroup gutterSize="s" alignItems="center" direction="column">
          <EuiText textAlign="center">No Data</EuiText>
          <EuiPanel paddingSize="none" style={{ overflow: 'hidden' }}>
            <Chart size={[200, 200]}>
              <Settings baseTheme={chartBaseTheme} />
              <Metric
                id="1"
                data={[
                  [
                    {
                      color: chartBaseTheme.background.color,
                      title: 'Number of visitors',
                      extra: (
                        <span>
                          Prev Week <strong>N/A</strong>
                        </span>
                      ),
                      value: NaN,
                      valueFormatter: (v) => `${v}k`,
                    },
                  ],
                ]}
              />{' '}
            </Chart>
          </EuiPanel>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={0}>
        <EuiFlexGroup gutterSize="s" alignItems="center" direction="column">
          <EuiText textAlign="center">Filtered Out</EuiText>
          <EuiPanel paddingSize="none" style={{ overflow: 'hidden' }}>
            <Chart size={[200, 200]}>
              <Settings baseTheme={chartBaseTheme} />
              <Metric id="1" data={[[undefined]]} />{' '}
            </Chart>
          </EuiPanel>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

import React from 'react';

import {
  Chart,
  Partition,
  Settings,
  PartitionLayout,
  PartialTheme,
} from '@elastic/charts';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';
import { useChartBaseTheme } from './utils/use_chart_base_theme';

const STATUS_DATA = [
  {
    status: 'Open',
    count: 25,
  },
  {
    status: 'Closed',
    count: 319,
  },
];

const LANGUAGE_DATA = [
  {
    language: 'JavaScript',
    percent: 51.4,
  },
  {
    language: 'TypeScript',
    percent: 39.6,
  },
  {
    language: 'CSS',
    percent: 8.7,
  },
];

export default () => {
  const chartBaseTheme = useChartBaseTheme();
  const htmlId = htmlIdGenerator();
  const exampleOne = htmlId();
  const exampleTwo = htmlId();

  const themeOverrides: PartialTheme = {
    partition: { emptySizeRatio: 0.4 },
  };

  return (
    <div>
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiTitle className="eui-textCenter" size="xs">
            <h3 id={exampleOne}>Year to date PR count by status</h3>
          </EuiTitle>
          <EuiSpacer />
          <Chart size={{ height: 200 }}>
            <Settings
              baseTheme={chartBaseTheme}
              theme={themeOverrides}
              ariaLabelledBy={exampleOne}
            />
            <Partition
              id="pieByPR"
              data={STATUS_DATA}
              layout={PartitionLayout.sunburst}
              valueAccessor={(d) => d.count}
              layers={[
                {
                  groupByRollup: (d: (typeof STATUS_DATA)[0]) => d.status,
                  shape: {
                    fillColor: (_, sortIndex) =>
                      chartBaseTheme.colors.vizColors![sortIndex],
                  },
                },
              ]}
              clockwiseSectors={false}
            />
          </Chart>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiTitle className="eui-textCenter" size="xs">
            <h3 id={exampleTwo}>Code languages</h3>
          </EuiTitle>
          <EuiSpacer />
          <Chart size={{ height: 200 }}>
            <Settings baseTheme={chartBaseTheme} ariaLabelledBy={exampleTwo} />
            <Partition
              id="donutByLanguage"
              data={LANGUAGE_DATA}
              layout={PartitionLayout.sunburst}
              valueAccessor={(d) => Number(d.percent)}
              valueFormatter={() => ''}
              layers={[
                {
                  groupByRollup: (d: (typeof LANGUAGE_DATA)[0]) => d.language,
                  shape: {
                    fillColor: (_, sortIndex) =>
                      chartBaseTheme.colors.vizColors![sortIndex],
                  },
                },
              ]}
              clockwiseSectors={false}
            />
          </Chart>
        </EuiFlexItem>
      </EuiFlexGrid>
    </div>
  );
};

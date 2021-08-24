import React, { useContext } from 'react';
import { ThemeContext } from '../../components';
import { Chart, Partition, Settings } from '@elastic/charts';

import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';
import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const themeContext = useContext(ThemeContext);
  const htmlId = htmlIdGenerator();
  const exampleOne = htmlId();
  const exampleTwo = htmlId();

  /**
   * Setup theme based on current light/dark theme
   */
  const isDarkTheme = themeContext.theme.includes('dark');
  const euiChartTheme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK
    : EUI_CHARTS_THEME_LIGHT;
  const euiPartitionConfig = euiChartTheme.partition;

  return (
    <div>
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiTitle className="eui-textCenter" size="xs">
            <h3 id={exampleOne}>Year to date PR count by status</h3>
          </EuiTitle>
          <EuiSpacer />
          <Chart size={{ height: 200 }}>
            <Settings ariaLabelledBy={exampleOne} />
            <Partition
              id="pieByPR"
              data={[
                {
                  status: 'Open',
                  count: 25,
                },
                {
                  status: 'Closed',
                  count: 319,
                },
              ]}
              valueAccessor={(d) => d.count}
              layers={[
                {
                  groupByRollup: (d) => d.status,
                  shape: {
                    fillColor: (d) =>
                      euiChartTheme.theme.colors.vizColors[d.sortIndex],
                  },
                },
              ]}
              config={{
                ...euiPartitionConfig,
                clockwiseSectors: false,
              }}
            />
          </Chart>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiTitle className="eui-textCenter" size="xs">
            <h3 id={exampleTwo}>Code languages</h3>
          </EuiTitle>
          <EuiSpacer />
          <Chart size={{ height: 200 }}>
            <Settings ariaLabelledBy={exampleTwo} />
            <Partition
              id="donutByLanguage"
              data={[
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
              ]}
              valueAccessor={(d) => Number(d.percent)}
              valueFormatter={() => ''}
              layers={[
                {
                  groupByRollup: (d) => d.language,
                  shape: {
                    fillColor: (d) =>
                      euiChartTheme.theme.colors.vizColors[d.sortIndex],
                  },
                },
              ]}
              config={{
                ...euiPartitionConfig,
                emptySizeRatio: 0.4,
                clockwiseSectors: false,
              }}
            />
          </Chart>
        </EuiFlexItem>
      </EuiFlexGrid>
    </div>
  );
};

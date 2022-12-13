import React from 'react';
import { Chart, Partition, Settings, PartitionLayout } from '@elastic/charts';

import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';
import { EuiTitle, EuiSpacer } from '../../../../src/components';
import { useEuiTheme, htmlIdGenerator } from '../../../../src/services';

export default () => {
  const { colorMode } = useEuiTheme();
  const id = htmlIdGenerator()();

  /**
   * Setup theme based on current light/dark theme
   */
  const isDarkTheme = colorMode === 'DARK';
  const euiChartTheme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK
    : EUI_CHARTS_THEME_LIGHT;
  const { vizColors } = euiChartTheme.theme.colors;

  const data = [
    { fruit: 'Apple', count: 100 },
    { fruit: 'Banana', count: 50 },
    { fruit: 'Tomato', count: 25 },
    { fruit: 'Mango', count: 30 },
    { fruit: 'Cherry', count: 31 },
    { fruit: 'Peach', count: 12 },
    { fruit: 'Orange', count: 14 },
    { fruit: 'Clementine', count: 22 },
    { fruit: 'Grapefruit', count: 25 },
    { fruit: 'Grape', count: 15 },
    { fruit: 'Jackfruit', count: 10 },
    { fruit: 'Durian', count: 1 },
    { fruit: 'Raspberry', count: 15 },
    { fruit: 'Blueberry', count: 10 },
    { fruit: 'Blackberry', count: 10 },
    { fruit: 'Lulo', count: 2 },
  ];

  return (
    <>
      <EuiTitle className="eui-textCenter" size="xs">
        <h3 id={id}>Students&apos; favorite fruit</h3>
      </EuiTitle>
      <EuiSpacer />
      <Chart size={{ height: 200 }}>
        <Settings
          theme={euiChartTheme.theme}
          ariaLabelledBy={id}
          ariaDescription="There is a great variety of reported favorite fruit"
          ariaTableCaption="For the chart representation, after Clementine (22) individual results are not labelled as the segments become too small"
        />
        <Partition
          data={data}
          layout={PartitionLayout.sunburst}
          valueAccessor={({ count }) => count}
          layers={[
            {
              groupByRollup: ({ fruit }) => fruit,
              shape: {
                fillColor: ({ sortIndex }) =>
                  vizColors[sortIndex % vizColors.length],
              },
            },
          ]}
          clockwiseSectors={false}
        />
      </Chart>
    </>
  );
};

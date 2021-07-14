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
import {
  htmlIdGenerator,
  useIsWithinBreakpoints,
} from '../../../../src/services';
import { EuiCode } from '../../../../src/components/code';

export const Sunburst = () => {
  const themeContext = useContext(ThemeContext);
  const id = htmlIdGenerator()();
  const isDesktop = useIsWithinBreakpoints(['l', 'xl']);

  /**
   * Setup theme based on current light/dark theme
   */
  const isDarkTheme = themeContext.theme.includes('dark');
  const euiChartTheme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK
    : EUI_CHARTS_THEME_LIGHT;
  const euiPartitionConfig = euiChartTheme.partition;
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
    <EuiFlexGrid direction={isDesktop ? 'row' : 'column'} columns={2}>
      <EuiFlexItem>
        <EuiTitle className="eui-textCenter" size="xs">
          <h3 id={id}>Students&apos; favorite fruit</h3>
        </EuiTitle>
        <EuiSpacer />
        <Chart size={{ height: 200 }}>
          <Settings
            ariaLabelledBy={id}
            ariaDescription="There is a great variety of reported favorite fruit"
            ariaTableCaption="For the chart representation, after Clementine (22) individual results are not labelled as the segments become too small"
          />
          <Partition
            data={data}
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
            config={{
              ...euiPartitionConfig,
              clockwiseSectors: false,
            }}
          />
        </Chart>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiTitle className="eui-textCenter" size="xs">
          <h3>Visually hidden content for chart</h3>
        </EuiTitle>
        <EuiSpacer />
        <EuiCode language="jsx" inline={false}>
          {`<p>There is a great variety of reported favorite fruit</p>

<dl>
  <dt>Chart type:</dt>
  <dd>sunburst chart</dd>
</dd>

<table>
  <caption>
    After Clementine (22), individual results are not labelled as the segments become too small
  </caption>
  <thead>
    <tr>
      <th scope="col">Label</th>
      <th scope="col">Value</th>
      <th scope="col">Percentage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Apple</th>
      <td>100</td>
      <td>27%</td>
    </tr>
    {/* rows abbreviated */}
    <tr>
      <th>Durian</th>
      <td>1</td>
      <td>0%</td>
    </tr>
  </tbody>
</table>`}
        </EuiCode>
      </EuiFlexItem>
    </EuiFlexGrid>
  );
};

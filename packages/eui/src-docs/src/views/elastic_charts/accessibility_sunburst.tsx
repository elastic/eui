import React from 'react';
import { Chart, Partition, Settings, PartitionLayout } from '@elastic/charts';

import { EuiTitle, EuiSpacer } from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';
import { useChartBaseTheme } from './utils/use_chart_base_theme';

export default () => {
  const chartBaseTheme = useChartBaseTheme();
  const id = htmlIdGenerator()();

  const { vizColors } = chartBaseTheme.colors;

  type Data = { fruit: string; count: number };
  const data: Data[] = [
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
          baseTheme={chartBaseTheme}
          ariaLabelledBy={id}
          ariaDescription="There is a great variety of reported favorite fruit"
          ariaTableCaption="For the chart representation, after Clementine (22) individual results are not labelled as the segments become too small"
        />
        <Partition
          id="partitionId"
          data={data}
          layout={PartitionLayout.sunburst}
          valueAccessor={({ count }) => count}
          layers={[
            {
              groupByRollup: ({ fruit }: Data) => fruit,
              shape: {
                fillColor: (_, sortIndex) =>
                  vizColors![sortIndex % vizColors!.length],
              },
            },
          ]}
          clockwiseSectors={false}
        />
      </Chart>
    </>
  );
};

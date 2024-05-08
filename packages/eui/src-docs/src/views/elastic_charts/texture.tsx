import React from 'react';
import {
  Chart,
  BarSeries,
  AreaSeries,
  Settings,
  Axis,
  Position,
} from '@elastic/charts';

import { EuiSpacer, EuiTitle } from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';
import { useChartBaseTheme } from './utils/use_chart_base_theme';

export const SAMPLE_SMALL_DATA = [
  { x: 0, y: 10.934269 },
  { x: 1, y: 14.660253928 },
  { x: 2, y: 14.039862184 },
  { x: 3, y: 13.388734576 },
  { x: 4, y: 13.051608256 },
  { x: 5, y: 12.078351999999999 },
  { x: 6, y: 11.823124744 },
  { x: 7, y: 11.7314602 },
  { x: 8, y: 12.89177344 },
  { x: 9, y: 11.837041216 },
];
export const SAMPLE_SMALL_DATA_2 = [
  { x: 0, y: 10.009588 },
  { x: 1, y: 13.591318 },
  { x: 2, y: 14.493893151999998 },
  { x: 3, y: 11.112153736 },
  { x: 4, y: 12.202770376 },
  { x: 5, y: 14.948682999999999 },
  { x: 6, y: 11.527410016000001 },
  { x: 7, y: 14.404530544 },
  { x: 8, y: 14.007384976 },
  { x: 9, y: 14.639346376 },
];

export default () => {
  const id = htmlIdGenerator()();
  const chartBaseTheme = useChartBaseTheme();

  return (
    <>
      <EuiTitle className="eui-textCenter" size="xs">
        <h3 id={id}>Example chart with texture fills</h3>
      </EuiTitle>

      <EuiSpacer size="s" />
      <Chart size={{ height: 200 }}>
        <Settings
          baseTheme={chartBaseTheme}
          ariaLabelledBy={id}
          ariaDescription="This chart has two series with texture fills. The bar series has squares and the area series is comprised of circles."
          ariaUseDefaultSummary={false}
        />
        <BarSeries
          key={1}
          id={'series-1'}
          xAccessor={'x'}
          yAccessors={['y']}
          barSeriesStyle={{
            rect: {
              opacity: 0.2,
              texture: {
                opacity: 1,
                shape: 'square',
                size: 9,
              },
            },
          }}
          stackAccessors={['yes']}
          data={SAMPLE_SMALL_DATA}
        />
        <AreaSeries
          key={2}
          id={'series-2'}
          xAccessor={'x'}
          yAccessors={['y']}
          areaSeriesStyle={{
            area: {
              opacity: 0.05,
              texture: {
                opacity: 1,
                shape: 'circle',
                size: 5,
                spacing: {
                  x: 0,
                  y: 0,
                },
                offset: {
                  x: 0,
                  y: 1,
                },
              },
            },
          }}
          data={SAMPLE_SMALL_DATA_2}
        />
        <Axis
          id="yAxis"
          hide
          position={Position.Left}
          tickFormat={(d) => Number(d).toFixed(2)}
        />
      </Chart>
    </>
  );
};

import React, { Fragment } from 'react';
import { Chart, CurveType, BarSeries, AreaSeries } from '@elastic/charts';
import { EuiSpacer, EuiTitle } from '../../../../src/components';
import { SAMPLE_SMALL_DATA, SAMPLE_SMALL_DATA_2 } from './data';

export const TextureMultiSeriesChart = () => {
  return (
    <Fragment>
      <EuiTitle size="xs">
        <h3>Example chart with texture fills</h3>
      </EuiTitle>

      <EuiSpacer size="s" />
      <Chart size={{ height: 200 }}>
        <BarSeries
          key={1}
          id={'series-1'}
          barSeriesStyle={{
            rect: {
              opacity: 0.2,
              texture: {
                opacity: 1,
                offset: { x: undefined, y: undefined },
                rotation: undefined,
                shape: 'square',
                shapeRotation: undefined,
                size: 9,
                spacing: { x: undefined, y: undefined },
              },
            },
          }}
          stackAccessors={['yes']}
          data={SAMPLE_SMALL_DATA}
          curve={CurveType.CURVE_MONOTONE_X}
        />
        <AreaSeries
          key={2}
          id={'series-2'}
          areaSeriesStyle={{
            area: {
              opacity: 0.05,
              shape: 'circle',
              texture: {
                opacity: 1,
                shape: 'circle',
                rotation: undefined,
                shapeRotation: undefined,
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
      </Chart>
    </Fragment>
  );
};

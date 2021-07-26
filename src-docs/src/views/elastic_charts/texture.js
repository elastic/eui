import React, { Fragment } from 'react';
import {
  Chart,
  CurveType,
  BarSeries,
  AreaSeries,
  Settings,
} from '@elastic/charts';
import { EuiSpacer, EuiTitle } from '../../../../src/components';
import { SAMPLE_SMALL_DATA, SAMPLE_SMALL_DATA_2 } from './data';
import { htmlIdGenerator } from '../../../../src/services';

export const TextureMultiSeriesChart = () => {
  const id = htmlIdGenerator()();

  return (
    <Fragment>
      <EuiTitle className="eui-textCenter" size="xs">
        <h3 id={id}>Example chart with texture fills</h3>
      </EuiTitle>

      <EuiSpacer size="s" />
      <Chart size={{ height: 200 }}>
        <Settings
          ariaLabelledBy={id}
          ariaDescription="This chart has two series with texture fills. The bar series has squares and the area series is comprised of circles."
          ariaUseDefaultSummary={false}
        />
        <BarSeries
          key={1}
          id={'series-1'}
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

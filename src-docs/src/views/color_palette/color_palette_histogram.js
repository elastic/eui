import React, { Component, Fragment } from 'react';

import { EuiSpacer } from '../../../../src/components';
import {
  EuiSeriesChart,
  EuiHistogramSeries,
  EuiSeriesChartUtils,
} from '../../../../src/experimental';
import { colorPalette, palettes } from '../../../../src/services/color';

const { SCALE } = EuiSeriesChartUtils;
const timestamp = Date.now();
const ONE_HOUR = 3600000;
const margins = {
  top: 10,
  left: 80,
  right: 0,
  bottom: 20,
};
const qualColors = palettes.euiPaletteColorBlind.colors;
const quantColors = colorPalette('#FFFF6D', '#1EA593', 6);

function randomizeData(size = 24, max = 8) {
  return new Array(size)
    .fill(0)
    .map((d, i) => ({
      x0: ONE_HOUR * i,
      x: ONE_HOUR * (i + 1),
      y: Math.floor(Math.random() * max),
    }))
    .map(el => ({
      x0: el.x0 + timestamp,
      x: el.x + timestamp,
      y: el.y,
    }));
}
function buildData(series) {
  const max = Math.ceil(Math.random() * 1000000);
  return new Array(series).fill(0).map(() => randomizeData(20, max));
}
export default class Example extends Component {
  state = {
    series: 6,
    data: buildData(6),
  };
  render() {
    const { data } = this.state;
    return (
      <Fragment>
        <EuiSeriesChart
          width={600}
          height={200}
          xType={SCALE.TIME}
          stackBy="y"
          margins={margins}>
          {data.map((d, i) => (
            <EuiHistogramSeries
              key={i}
              name={`Chart ${i}`}
              data={d}
              color={qualColors[i]}
            />
          ))}
        </EuiSeriesChart>
        <EuiSpacer size="xl" />
        <EuiSeriesChart
          width={600}
          height={200}
          xType={SCALE.TIME}
          stackBy="y"
          margins={margins}>
          {data.map((d, i) => (
            <EuiHistogramSeries
              key={i}
              name={`Chart ${i}`}
              data={d}
              color={quantColors[i]}
            />
          ))}
        </EuiSeriesChart>
      </Fragment>
    );
  }
}

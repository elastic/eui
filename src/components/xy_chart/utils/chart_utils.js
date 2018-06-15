import { scaleLinear } from 'd3-scale';
import _ from 'lodash';
import * as d3 from 'd3-array';

const unit = 16;
const XY_HEIGHT = unit * 16;
const XY_MARGIN = {
  top: unit,
  left: unit * 5,
  right: unit,
  bottom: unit * 2
};

const getXScale = _.memoize(
  (xMin, xMax, width) => {
    return scaleLinear()
      .domain([xMin, xMax])
      .range([XY_MARGIN.left, width - XY_MARGIN.right]);
  },
  (...args) => args.join('_')
);

const getYScale = _.memoize(
  (yMin, yMax) => {
    return scaleLinear()
      .domain([yMin, yMax])
      .range([XY_HEIGHT, 0])
      .nice();
  },
  (...args) => args.join('_')
);

const getYTickValues = _.memoize(yMaxNice => [0, yMaxNice / 2, yMaxNice]);

export function getPlotValues(series, width) {
  if (series.length === 0) return;

  const allCoordinates = _.flatten(series);

  const xExtent = d3.extent(allCoordinates, d => d.x);
  const yMin = 0;
  const yMax = d3.max(allCoordinates, d => d.y);

  const x = getXScale(xExtent[0], xExtent[1], width);
  const y = getYScale(yMin, yMax);
  const yTickValues = getYTickValues(y.domain()[1]);
  const xTickValues = getYTickValues(x.domain()[1]);

  return { x, y, yTickValues, xTickValues };
}

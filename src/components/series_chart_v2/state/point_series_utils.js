import { getScaleFromType } from './utils';


export function computePointSeriesDataPoint(spec, domain, chartDimensions) {
  const {
    xScaleType,
    yScaleType,
    xAccessor,
    yAccessor,
    data,
  } = spec;
  const xScale = getScaleFromType(xScaleType)
    .domain(domain.x.domain)
    .range([0, chartDimensions.width]);
  const yScale = getScaleFromType(yScaleType)
    .domain(domain.y.domain)
    .range([chartDimensions.height, 0]);

  const points = data.map(point => {
    return {
      x: xScale(xAccessor(point)),
      y: yScale(yAccessor(point)),
      r: 3,
    };
  });
  return {
    points
  };
}

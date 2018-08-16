import { getScaleFromType } from './utils';


export function computeBarSeriesDataPoint(spec, domain, chartDimensions) {
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
    .range([0, chartDimensions.height]);
  // TODO compute bar width
  const barWidth = xScale.bandwidth ? xScale.bandwidth() : 10;
  const bars = data.map(point => {
    return {
      x: xScale(xAccessor(point)) - barWidth / 2,
      y: chartDimensions.height - yScale(yAccessor(point)),
      height: yScale(yAccessor(point)),
      width: barWidth,
    };
  });
  return {
    bars
  };
}

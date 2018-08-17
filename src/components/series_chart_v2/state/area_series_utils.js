import { area,
  curveLinear,
  curveCardinal,
  curveNatural,
  curveMonotoneX,
  curveMonotoneY,
  curveBasis,
  curveBundle,
  curveCatmullRom,
  curveStep,
  curveStepAfter,
  curveStepBefore,
} from 'd3-shape';
import { getScaleFromType } from './utils';
import { CURVE_TYPE } from '../utils/chart_utils';


export function computeAreaSeriesDataPoint(spec, domain, chartDimensions) {
  const {
    xScaleType,
    yScaleType,
    xAccessor,
    yAccessor,
    curveType,
    data,
  } = spec;
  const xScale = getScaleFromType(xScaleType)
    .domain(domain.x.domain)
    .range([0, chartDimensions.width]);
  const yScale = getScaleFromType(yScaleType)
    .domain(domain.y.domain)
    .range([0, chartDimensions.height]);
  // TODO defined
  // TODO add rotation
  const areaGenerator = area()
    .x0(d => xScale(xAccessor(d)))
    .x1(d => xScale(xAccessor(d)))
    .y1(chartDimensions.height)
    .y0(d => chartDimensions.height - yScale(yAccessor(d)))
    .curve(getAreaCurve(curveType));
  const dataPoint = {
    d: areaGenerator(data)
  };
  return dataPoint;
}

export function getAreaCurve(curveType) {
  switch(curveType) {
    case CURVE_TYPE.CURVE_CARDINAL:
      return curveCardinal;
    case CURVE_TYPE.CURVE_NATURAL:
      return curveNatural;
    case CURVE_TYPE.CURVE_MONOTONE_X:
      return curveMonotoneX;
    case CURVE_TYPE.CURVE_MONOTONE_Y:
      return curveMonotoneY;
    case CURVE_TYPE.CURVE_BASIS:
      return curveBasis;
    case CURVE_TYPE.CURVE_BUNDLE:
      return curveBundle;
    case CURVE_TYPE.CURVE_CATMULL_ROM:
      return curveCatmullRom;
    case CURVE_TYPE.CURVE_STEP:
      return curveStep;
    case CURVE_TYPE.CURVE_STEP_AFTER:
      return curveStepAfter;
    case CURVE_TYPE.CURVE_STEP_BEFORE:
      return curveStepBefore;
    case CURVE_TYPE.LINEAR:
    default:
      return curveLinear;
  }
}

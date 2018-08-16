import { line,
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


export function computeLineSeriesDataPoint(spec, domain, chartDimensions) {
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
    .range([chartDimensions.height, 0]);

  const lineGenerator = line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)))
    .curve(getLineCurve(curveType));
  const dataPoint = {
    d: lineGenerator(data)
  };
  return dataPoint;
}

export function getLineCurve(curveType) {
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

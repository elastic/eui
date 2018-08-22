import { max } from 'd3-array';
import { ScaleContinuousNumeric } from 'd3-scale';
import {
  createContinuousScale,
  createOrdinalScale,
  ScaleOrdinal,
  ScaleType,
} from '../commons/scales';
import { AxisSpec, SeriesScales } from '../commons/specs';
import { SvgTextBBoxCalculator } from './svg_text_bbox_calculator';

export interface AxisDimensions {
  scale: ScaleOrdinal | ScaleContinuousNumeric<number, number>;
  tickValues: string[] | number[];
  ticksDimensions: Array<{ width: number; height: number }>;
  tickLabels: string[];
  maxTickWidth: number | undefined;
  maxTickHeight: number | undefined;
}

export function computeAxisDimensions(
  axisSpec: AxisSpec,
  seriesScales: SeriesScales,
  bboxCalculator: SvgTextBBoxCalculator,
): AxisDimensions {
  const { domains, scaleTypes } = seriesScales;
  const scaleType =
    axisSpec.orientation === 'horizontal' ? scaleTypes.xScaleType : scaleTypes.yScaleType;
  const domain = axisSpec.orientation === 'horizontal' ? domains.xDomain : domains.yDomain;
  let scale;
  let tickValues: string[] | number[];
  let tickLabels: string[];

  if (scaleType === ScaleType.Ordinal) {
    scale = createOrdinalScale(domain as string[], 1, 0);
    tickValues = scale.ticks();
    tickLabels = tickValues.map(axisSpec.tickFormat);
  } else {
    scale = createContinuousScale(scaleType, domain as number[], 1, 0);
    tickValues = scale.ticks();
    tickLabels = tickValues.map(axisSpec.tickFormat);
  }

  // compute the boundingbox for each formatted label
  const ticksDimensions = tickLabels.map((tickLabel: string) => {
    const bbox = bboxCalculator.compute(tickLabel);
    return {
      width: bbox.width,
      height: bbox.height,
    };
  });
  const maxTickWidth = max(ticksDimensions, (bbox) => bbox.width);
  const maxTickHeight = max(ticksDimensions, (bbox) => bbox.height);
  return {
    scale,
    ticksDimensions,
    tickValues,
    tickLabels,
    maxTickWidth,
    maxTickHeight,
  };
}

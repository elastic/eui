import { max } from 'd3-array';
import { Dimensions } from '../commons/dimensions';
import { AxisId } from '../commons/ids';
import {
  createContinuousScale,
  createOrdinalScale,
  ScaleType,
} from '../commons/scales';
import { AxisOrientation, AxisPosition, AxisSpec, Domain, SeriesScales } from '../commons/specs';
import { SvgTextBBoxCalculator } from './svg_text_bbox_calculator';

export interface AxisTick {
  value: number | string;
  label: string;
  position: number;
}

export interface AxisDimensions {
  axisScaleType: ScaleType;
  axisScaleDomain: Domain;
  tickValues: string[] | number[];
  ticksDimensions: Array<{ width: number; height: number }>;
  tickLabels: string[];
  maxTickWidth: number;
  maxTickHeight: number;
}

export function computeAxisDimensions(
  axisSpec: AxisSpec,
  axisSeriesScale: SeriesScales,
  bboxCalculator: SvgTextBBoxCalculator,
): AxisDimensions {
  const { domains, scaleTypes } = axisSeriesScale;
  const axisScaleType =
    axisSpec.orientation === 'horizontal' ? scaleTypes.xScaleType : scaleTypes.yScaleType;
  const axisScaleDomain = axisSpec.orientation === 'horizontal' ? domains.xDomain : domains.yDomain;

  let tickValues: string[] | number[];
  let tickLabels: string[];

  if (axisScaleType === ScaleType.Ordinal) {
    const scale = createOrdinalScale(axisScaleDomain as string[], 1, 0);
    tickValues = scale.ticks();
    tickLabels = tickValues.map(axisSpec.tickFormat);
  } else {
    const scale = createContinuousScale(axisScaleType, axisScaleDomain as number[], 1, 0);
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
  const maxTickWidth = max(ticksDimensions, (bbox) => bbox.width) || 0;
  const maxTickHeight = max(ticksDimensions, (bbox) => bbox.height) || 0;
  return {
    axisScaleType,
    axisScaleDomain,
    ticksDimensions,
    tickValues,
    tickLabels,
    maxTickWidth,
    maxTickHeight,
  };
}

export function getAvailableTicks(
  chartDimensions: Dimensions,
  axisSpec: AxisSpec,
  axisDimension: AxisDimensions,
) {
  const { width, height } = chartDimensions;
  const { axisScaleType, axisScaleDomain } = axisDimension;
  let allTicks: AxisTick[] = [];
  const minRange = axisSpec.orientation === AxisOrientation.Vertical ? height : 0;
  const maxRange = axisSpec.orientation === AxisOrientation.Vertical ? 0 : width;
  if (axisScaleType === ScaleType.Ordinal) {
    const scale = createOrdinalScale(axisScaleDomain as string[], minRange, maxRange);
    const ticks = scale.ticks();
    allTicks = ticks.map((tick) => {
      return {
        value: tick,
        label: axisSpec.tickFormat(tick),
        position: scale(tick),
      };
    });
  } else {
    const scale = createContinuousScale(
      axisScaleType,
      axisScaleDomain as number[],
      minRange,
      maxRange,
    );
    const ticks = scale.ticks();
    allTicks = ticks.map((tick) => {
      return {
        value: tick,
        label: axisSpec.tickFormat(tick),
        position: scale(tick),
      };
    });
  }
  return allTicks;
}
export function getVisibleTicks(
  allTicks: AxisTick[],
  axisSpec: AxisSpec,
  axisDim: AxisDimensions,
  chartDimensions: Dimensions,
): AxisTick[]  {
  const { orientation, showOverlappingTicks, showOverlappingLabels } = axisSpec;
  const { maxTickHeight, maxTickWidth } = axisDim;
  const { height } = chartDimensions;
  let firstTickPosition;
  if (axisSpec.orientation === AxisOrientation.Vertical) {
    firstTickPosition = allTicks[allTicks.length - 1].position;
  } else {
    firstTickPosition = allTicks[0].position;
  }

  let previousOccupiedSpace = firstTickPosition;
  const visibleTicks = [];
  for (let i = 0; i < allTicks.length; i++) {
    const { position } = allTicks[i];
    const requiredSpace =
      orientation === AxisOrientation.Vertical ? maxTickHeight / 2 : maxTickWidth / 2;
    const relativeTickPosition =
      orientation === AxisOrientation.Vertical ? height - position : position;
    if (i === 0) {
      visibleTicks.push(allTicks[i]);
      previousOccupiedSpace = firstTickPosition + requiredSpace;
    } else if (relativeTickPosition - requiredSpace >= previousOccupiedSpace) {
      visibleTicks.push(allTicks[i]);
      previousOccupiedSpace = relativeTickPosition + requiredSpace;
    } else {
      // still add the tick but without a label
      if (showOverlappingTicks || showOverlappingLabels) {
        visibleTicks.push(allTicks[i]);
      }
    }
  }
  return visibleTicks;
}

export function getAxisPosition(
  chartDimensions: Dimensions,
  axisSpec: AxisSpec,
  axisDim: AxisDimensions,
  cumHorizontalSum: number,
  cumVerticalSum: number,
) {
  const { top, left, height, width } = chartDimensions;
  const dimensions = {
    top,
    left,
    width,
    height,
  };
  let horizontal = 0;
  let vertical = 0;
  if (axisSpec.orientation === AxisOrientation.Vertical) {
    const specLeft =
    axisSpec.position === AxisPosition.Left
        ? axisDim.maxTickWidth + cumHorizontalSum
        : left + width + cumHorizontalSum;
    horizontal = axisDim.maxTickWidth + axisSpec.tickSize + axisSpec.tickPadding;
    dimensions.left = specLeft;
    dimensions.width = axisDim.maxTickWidth;
  } else {
    const specTop = axisSpec.position === AxisPosition.Top ? cumVerticalSum : top + height + cumVerticalSum;
    vertical = axisDim.maxTickHeight + axisSpec.tickSize + axisSpec.tickPadding;
    dimensions.top = specTop;
    dimensions.height = axisDim.maxTickHeight;
  }
  return { dimensions, vertical, horizontal };
}

export function getAxisTicksPositions(
  chartDimensions: Dimensions,
  axisSpecs: Map<AxisId, AxisSpec>,
  axisDimensions: Map<AxisId, AxisDimensions>,
) {
  const axisPositions: Map<AxisId, Dimensions> = new Map();
  const axisVisibleTicks: Map<AxisId, AxisTick[]> = new Map();
  const axisTicks: Map<AxisId, AxisTick[]> = new Map();
  let cumVerticalSum = 0;
  let cumHorizontalSum = 0;
  axisDimensions.forEach((axisDim, id) => {
    const axisSpec = axisSpecs.get(id);
    if (!axisSpec) {
      return;
    }
    const allTicks = getAvailableTicks(chartDimensions, axisSpec, axisDim);
    const visibleTicks = getVisibleTicks(allTicks, axisSpec, axisDim, chartDimensions);
    const axisPosition = getAxisPosition(
      chartDimensions,
      axisSpec,
      axisDim,
      cumHorizontalSum,
      cumVerticalSum,
    );
    cumVerticalSum += axisPosition.vertical;
    cumHorizontalSum += axisPosition.horizontal;
    axisPositions.set(id, axisPosition.dimensions);
    axisVisibleTicks.set(id, visibleTicks);
    axisTicks.set(id, allTicks);
  });
  return {
    axisPositions,
    axisTicks,
    axisVisibleTicks,
  };
}

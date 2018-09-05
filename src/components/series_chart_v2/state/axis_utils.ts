import { max } from 'd3-array';
import { Dimensions } from '../commons/dimensions';
import { Domain, SeriesScales } from '../commons/domain';
import { AxisId } from '../commons/ids';
import {
  createContinuousScale,
  createOrdinalScale,
  ScaleType,
} from '../commons/scales';
import { AxisOrientation, AxisPosition, AxisSpec } from '../commons/specs';
import { SvgTextBBoxCalculator } from './svg_text_bbox_calculator';

export interface AxisTick {
  value: number | string;
  label: string;
  position: number;
}

export interface AxisTicksDimensions {
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
  axisSeriesScales: SeriesScales[],
  bboxCalculator: SvgTextBBoxCalculator,
): AxisTicksDimensions {

  let tickValues: string[] | number[];
  let tickLabels: string[];
  let axisScaleType: ScaleType;
  let axisScaleDomain: Domain;

  if (axisSpec.orientation === AxisOrientation.Vertical) {
    const seriesScales = axisSeriesScales[axisSeriesScales.length - 1];
    const verticalTicks = computeVerticalTicks(seriesScales, axisSpec);
    tickValues = verticalTicks.tickValues;
    tickLabels = verticalTicks.tickLabels;
    axisScaleType = verticalTicks.axisScaleType!;
    axisScaleDomain = verticalTicks.axisScaleDomain!;
  } else {
    const layer = axisSpec.groupingLayer ? axisSpec.groupingLayer : 0;
    const seriesScales = axisSeriesScales[layer];
    const horizontalTicks = computeHorizontalTicks(seriesScales, axisSpec);
    tickValues = horizontalTicks.tickValues;
    tickLabels = horizontalTicks.tickLabels;
    axisScaleType = horizontalTicks.axisScaleType;
    axisScaleDomain = horizontalTicks.axisScaleDomain;
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

function computeHorizontalTicks(axisSeriesScale: SeriesScales, axisSpec: AxisSpec) {
  const { xDomain, xScaleType} = axisSeriesScale;

  let tickValues: string[] | number[];
  let tickLabels: string[];

  if (xScaleType === ScaleType.Ordinal) {
    const scale = createOrdinalScale(xDomain as string[], 1, 0);
    tickValues = scale.ticks();
    tickLabels = tickValues.map(axisSpec.tickFormat);
  } else {
    // if we are computing vertical ticks we are sure that yScaleType is configured
    const scale = createContinuousScale(xScaleType!, xDomain as number[], 1, 0);
    tickValues = scale.ticks();
    tickLabels = tickValues.map(axisSpec.tickFormat);
  }
  return {
    axisScaleType: xScaleType,
    axisScaleDomain: xDomain,
    tickValues,
    tickLabels,
  };
}

function computeVerticalTicks(axisSeriesScale: SeriesScales, axisSpec: AxisSpec) {
  const { yDomain, yScaleType} = axisSeriesScale;

  let tickValues: string[] | number[];
  let tickLabels: string[];

  if (yScaleType === ScaleType.Ordinal) {
    const scale = createOrdinalScale(yDomain as string[], 1, 0);
    tickValues = scale.ticks();
    tickLabels = tickValues.map(axisSpec.tickFormat);
  } else {
    // if we are computing vertical ticks we are sure that yScaleType is configured
    const scale = createContinuousScale(yScaleType!, yDomain as number[], 1, 0);
    tickValues = scale.ticks();
    tickLabels = tickValues.map(axisSpec.tickFormat);
  }
  return {
    axisScaleType: yScaleType,
    axisScaleDomain: yDomain,
    tickValues,
    tickLabels,
  };
}

export function getAvailableTicks(
  chartDimensions: Dimensions,
  axisSpec: AxisSpec,
  axisDimension: AxisTicksDimensions,
) {
  const { width, height } = chartDimensions;
  const { axisScaleType, axisScaleDomain } = axisDimension;
  let allTicks: AxisTick[] = [];
  const minRange = axisSpec.orientation === AxisOrientation.Vertical ? height : 0;
  const maxRange = axisSpec.orientation === AxisOrientation.Vertical ? 0 : width;
  if (axisScaleType === ScaleType.Ordinal) {
    const scale = createOrdinalScale(axisScaleDomain as string[], minRange, maxRange);
    const ticks = scale.ticks();
    const bandwidth = scale.bandwidth();
    allTicks = ticks.map((tick) => {
      return {
        value: tick,
        label: axisSpec.tickFormat(tick),
        position: scale(tick) + bandwidth / 2,
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
  axisDim: AxisTicksDimensions,
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
        const overlappingTick = {
          ...allTicks[i],
          label: showOverlappingLabels ? allTicks[i].label : '',
        };
        visibleTicks.push(overlappingTick);
      }
    }
  }
  return visibleTicks;
}

export function getAxisPosition(
  chartDimensions: Dimensions,
  axisSpec: AxisSpec,
  axisDim: AxisTicksDimensions,
  cumTopSum: number,
  cumBottomSum: number,
  cumLeftSum: number,
  cumRightSum: number,
) {
  const { top, left, height, width } = chartDimensions;
  const dimensions = {
    top,
    left,
    width,
    height,
  };
  let topIncrement = 0;
  let bottomIncrement = 0;
  let leftIncrement = 0;
  let rightIncrement = 0;

  if (axisSpec.orientation === AxisOrientation.Vertical) {
    const specLeft =
    axisSpec.position === AxisPosition.Left
        ? axisDim.maxTickWidth + cumLeftSum
        : left + width + cumRightSum;
    if (axisSpec.position === AxisPosition.Left) {
      leftIncrement = axisDim.maxTickWidth + axisSpec.tickSize + axisSpec.tickPadding;
    } else {
      rightIncrement = (axisDim.maxTickWidth + axisSpec.tickSize + axisSpec.tickPadding);
    }
    dimensions.left = specLeft;
    dimensions.width = axisDim.maxTickWidth;
  } else {
    const specTop = axisSpec.position === AxisPosition.Top ? cumTopSum : top + height + cumBottomSum;
    if (axisSpec.position === AxisPosition.Top) {
      topIncrement = axisDim.maxTickHeight + axisSpec.tickSize + axisSpec.tickPadding;
    } else {
      bottomIncrement = axisDim.maxTickHeight + axisSpec.tickSize + axisSpec.tickPadding;
    }
    dimensions.top = specTop;
    dimensions.height = axisDim.maxTickHeight;
  }
  return { dimensions, topIncrement, bottomIncrement, leftIncrement, rightIncrement };
}

export function getAxisTicksPositions(
  chartDimensions: Dimensions,
  axisSpecs: Map<AxisId, AxisSpec>,
  axisDimensions: Map<AxisId, AxisTicksDimensions>,
) {
  const axisPositions: Map<AxisId, Dimensions> = new Map();
  const axisVisibleTicks: Map<AxisId, AxisTick[]> = new Map();
  const axisTicks: Map<AxisId, AxisTick[]> = new Map();
  let cumTopSum = 0;
  let cumBottomSum = 0;
  let cumLeftSum = 0;
  let cumRightSum = 0;
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
      cumTopSum,
      cumBottomSum,
      cumLeftSum,
      cumRightSum,
    );
    cumTopSum += axisPosition.topIncrement;
    cumBottomSum += axisPosition.bottomIncrement;
    cumLeftSum += axisPosition.leftIncrement;
    cumRightSum += axisPosition.rightIncrement;
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

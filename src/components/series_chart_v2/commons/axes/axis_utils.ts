import { max } from 'd3-array';
import { Domain, SpecDomain, SpecDomains } from '../data_ops/domain';
import { createContinuousScale, createOrdinalScale, ScaleType } from '../data_ops/scales';
import { Dimensions, Margins } from '../dimensions';
import { AxisId } from '../ids';
import { AxisOrientation, AxisPosition, AxisSpec, Rotation } from '../series/specs';
import { ChartConfig, ScalesConfig } from '../themes/theme';
import { BBoxCalculator } from './bbox_calculator';

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

/**
 * Compute the ticks values and identify max width and height of the labels
 * so we can compute the max space occupied by the axis component.
 * @param axisSpec tbe spec of the axis
 * @param specDomains the domain associated
 * @param bboxCalculator an instance of the boundingbox calculator
 */
export function computeAxisTicksDimensions(
  axisSpec: AxisSpec,
  specDomains: SpecDomains,
  bboxCalculator: BBoxCalculator,
  scalesConfig: ScalesConfig,
  chartRotation: Rotation,
): AxisTicksDimensions {
  let tickValues: string[] | number[];
  let tickLabels: string[];
  let axisScaleType: ScaleType;
  let axisScaleDomain: Domain;
  const level = axisSpec.groupingLevel ? axisSpec.groupingLevel : 0;
  const verticalDomain = chartRotation === 0 ? specDomains.yDomain : specDomains.xDomains[level];
  const horizontalDomain = chartRotation === 0 ? specDomains.xDomains[level] : specDomains.yDomain;
  const axisDomain = axisSpec.orientation === AxisOrientation.Vertical ? verticalDomain : horizontalDomain;
  const verticalTicks = computeTicks(axisDomain, axisSpec, scalesConfig);
  tickValues = verticalTicks.tickValues;
  tickLabels = verticalTicks.tickLabels;
  axisScaleType = verticalTicks.axisScaleType!;
  axisScaleDomain = verticalTicks.axisScaleDomain!;
  // compute the boundingbox for each formatted label
  const ticksDimensions = tickLabels
    .map((tickLabel: string) => {
      const bbox = bboxCalculator.compute(tickLabel).getOrElse({
        width: 0,
        height: 0,
      });
      return {
        width: Math.ceil(bbox.width),
        height: Math.ceil(bbox.height),
      };
    })
    .filter((d) => d);
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

function computeTicks(
  specDomain: SpecDomain,
  axisSpec: AxisSpec,
  scalesConfig: ScalesConfig,
): {
  axisScaleType: ScaleType,
  axisScaleDomain: Domain,
  tickValues: any[],
  tickLabels: string[],
} {
  const { domain, scaleType } = specDomain;

  let tickValues: string[] | number[];
  let tickLabels: string[];

  if (scaleType === ScaleType.Ordinal) {
    const scale = createOrdinalScale(domain as string[], 1, 0, scalesConfig.ordinal.padding);
    tickValues = scale.ticks();
    tickLabels = tickValues.map(axisSpec.tickFormat);
  } else {
    const scale = createContinuousScale(scaleType, domain as number[], 1, 0);
    tickValues = scale.ticks();
    tickLabels = tickValues.map(axisSpec.tickFormat);
  }
  return {
    axisScaleType: scaleType,
    axisScaleDomain: domain,
    tickValues,
    tickLabels,
  };
}

export function getAvailableTicks(
  chartDimensions: Dimensions,
  axisSpec: AxisSpec,
  axisDimension: AxisTicksDimensions,
  scalesConfig: ScalesConfig,
) {
  const { width, height } = chartDimensions;
  const { axisScaleType, axisScaleDomain } = axisDimension;
  let allTicks: AxisTick[] = [];
  const minRange = axisSpec.orientation === AxisOrientation.Vertical ? height : 0;
  const maxRange = axisSpec.orientation === AxisOrientation.Vertical ? 0 : width;
  if (axisScaleType === ScaleType.Ordinal) {
    const scale = createOrdinalScale(
      axisScaleDomain as string[],
      minRange,
      maxRange,
      scalesConfig.ordinal.padding,
    );
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
): AxisTick[] {
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
  chartMargins: Margins,
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
        ? axisDim.maxTickWidth + cumLeftSum + chartMargins.left
        : left + width + cumRightSum;
    if (axisSpec.position === AxisPosition.Left) {
      leftIncrement =
        axisDim.maxTickWidth + axisSpec.tickSize + axisSpec.tickPadding + chartMargins.left;
    } else {
      rightIncrement =
        axisDim.maxTickWidth + axisSpec.tickSize + axisSpec.tickPadding + chartMargins.right;
    }
    dimensions.left = specLeft;
    dimensions.width = axisDim.maxTickWidth;
  } else {
    const specTop =
      axisSpec.position === AxisPosition.Top
        ? cumTopSum + chartMargins.top
        : top + height + cumBottomSum;
    if (axisSpec.position === AxisPosition.Top) {
      topIncrement =
        axisDim.maxTickHeight + axisSpec.tickSize + axisSpec.tickPadding + chartMargins.top;
    } else {
      bottomIncrement =
        axisDim.maxTickHeight + axisSpec.tickSize + axisSpec.tickPadding + chartMargins.bottom;
    }
    dimensions.top = specTop;
    dimensions.height = axisDim.maxTickHeight;
  }
  return { dimensions, topIncrement, bottomIncrement, leftIncrement, rightIncrement };
}

export function getAxisTicksPositions(
  chartDimensions: Dimensions,
  chartConfig: ChartConfig,
  scalesConfig: ScalesConfig,
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
    const allTicks = getAvailableTicks(chartDimensions, axisSpec, axisDim, scalesConfig);
    const visibleTicks = getVisibleTicks(allTicks, axisSpec, axisDim, chartDimensions);
    const axisPosition = getAxisPosition(
      chartDimensions,
      chartConfig.margins,
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

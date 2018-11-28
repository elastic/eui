import { max } from 'd3-array';
import { none, Option, some } from 'fp-ts/lib/Option';
import { AxisOrientation, AxisPosition, AxisSpec, Rotation } from '../series/specs';
import { ChartConfig, ScalesConfig } from '../themes/theme';
import { Dimensions, Margins } from '../utils/dimensions';
import { Domain, SpecDomain, SpecDomains } from '../utils/domain';
import { AxisId } from '../utils/ids';
import { createContinuousScale, createOrdinalScale, ScaleType } from '../utils/scales/scales';
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
): Option<AxisTicksDimensions> {
  let tickValues: string[] | number[];
  let tickLabels: string[];
  let axisScaleType: ScaleType;
  let axisScaleDomain: Domain;
  const level = axisSpec.groupingLevel ? axisSpec.groupingLevel : 0;
  return getAxisDomain(axisSpec.orientation, specDomains, chartRotation, level)
    .chain((axisDomain) => {
      return computeTicks(axisDomain, axisSpec, scalesConfig);
    })
    .map((verticalTicks) => {
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
    });
}

function computeTicks(
  specDomain: SpecDomain,
  axisSpec: AxisSpec,
  scalesConfig: ScalesConfig,
): Option<{
  axisScaleType: ScaleType,
  axisScaleDomain: Domain,
  tickValues: any[],
  tickLabels: string[],
}> {
  const { domain, scaleType } = specDomain;
  if (scaleType === ScaleType.Ordinal) {
    const scale = createOrdinalScale(domain as string[], 1, 0, scalesConfig.ordinal.padding);
    const tickValues = scale.ticks();
    return some({
      axisScaleType: scaleType,
      axisScaleDomain: domain,
      tickValues,
      tickLabels: tickValues.map(axisSpec.tickFormat),
    });
  } else {
    const scale = createContinuousScale(scaleType, domain as number[], 1, 0);
    const tickValues = scale.ticks();
    return some({
      axisScaleType: scaleType,
      axisScaleDomain: domain,
      tickValues,
      tickLabels: tickValues.map(axisSpec.tickFormat),
    });
  }
}

export function getAvailableTicks(
  chartDimensions: Dimensions,
  axisSpec: AxisSpec,
  axisDimension: AxisTicksDimensions,
  scalesConfig: ScalesConfig,
  chartRotation: Rotation,
) {
  const { width, height } = chartDimensions;
  const { axisScaleType, axisScaleDomain } = axisDimension;
  let allTicks: AxisTick[] = [];
  let minRange: number = 0;
  let maxRange: number = 0;
  if (axisSpec.orientation === AxisOrientation.Vertical) {
    switch (chartRotation) {
      case 0:
      case -90:
        minRange = height;
        maxRange = 0;
        break;
      case 90:
      case 180:
        minRange = 0;
        maxRange = height;
        break;
    }
  } else {
    switch (chartRotation) {
      case 0:
      case 90:
        minRange = 0;
        maxRange = width;
        break;
      case 180:
      case -90:
        minRange = width;
        maxRange = 0;
        break;
    }
  }
  if (axisScaleType === ScaleType.Ordinal) {
    const scale = createOrdinalScale(
      axisScaleDomain as string[],
      minRange,
      maxRange,
      scalesConfig.ordinal.padding,
    );
    const ticks = scale.ticks();
    const bandwidth = scale.bandwidth * ([0, 90].includes(chartRotation) ? 1 : -1);
    allTicks = ticks.map((tick) => {
      return {
        value: tick,
        label: axisSpec.tickFormat(tick),
        position: scale.scale(tick) + bandwidth / 2,
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
        position: scale.scale(tick),
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
  chartRotation: Rotation,
): AxisTick[] {
  const { orientation, showOverlappingTicks, showOverlappingLabels } = axisSpec;
  const { maxTickHeight, maxTickWidth } = axisDim;
  const { width, height } = chartDimensions;
  const requiredSpace =
    orientation === AxisOrientation.Vertical ? maxTickHeight / 2 : maxTickWidth / 2;
  let firstTickPosition;

  firstTickPosition = 0;

  let previousOccupiedSpace = firstTickPosition;
  const visibleTicks = [];
  for (let i = 0; i < allTicks.length; i++) {
    const { position } = allTicks[i];

    let relativeTickPosition = 0;
    if (orientation === AxisOrientation.Vertical) {
      if (chartRotation === 90 || chartRotation === 180) {
        relativeTickPosition = position;
      } else {
        relativeTickPosition = height - position;
      }
    } else {
      // horizontal axis
      if (chartRotation === 180 || chartRotation === -90) {
        relativeTickPosition = width - position;
      } else {
        relativeTickPosition = position;
      }
    }
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
  chartRotation: Rotation,
  scalesConfig: ScalesConfig,
  axisSpecs: Map<AxisId, AxisSpec>,
  axisDimensions: Map<AxisId, AxisTicksDimensions>,
) {
  const axisPositions: Map<AxisId, Dimensions> = new Map();
  const axisVisibleTicks: Map<AxisId, AxisTick[]> = new Map();
  const axisTicks: Map<AxisId, AxisTick[]> = new Map();
  let cumTopSum = 0;
  let cumBottomSum = chartConfig.paddings.bottom;
  let cumLeftSum = 0;
  let cumRightSum = chartConfig.paddings.right;
  axisDimensions.forEach((axisDim, id) => {
    const axisSpec = axisSpecs.get(id);
    if (!axisSpec) {
      return;
    }
    const allTicks = getAvailableTicks(chartDimensions, axisSpec, axisDim, scalesConfig, chartRotation);
    const visibleTicks = getVisibleTicks(allTicks, axisSpec, axisDim, chartDimensions, chartRotation);
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

function getDomainByLevel(domain: SpecDomain[], level: number): Option<SpecDomain> {
  const domainInLevel = domain.find((d) => d.level === level);
  return domainInLevel ? some(domainInLevel) : none;
}

function getVerticalDomain(specDomains: SpecDomains, chartRotation: number, level: number): Option<SpecDomain> {
  if (chartRotation === 0 || chartRotation === 180) {
    return some(specDomains.yDomain);
  } else {
    return getDomainByLevel(specDomains.xDomains, level);
  }
}
function getHorizontalDomain(specDomains: SpecDomains, chartRotation: number, level: number): Option<SpecDomain> {
  if (chartRotation === 0 || chartRotation === 180) {
    return getDomainByLevel(specDomains.xDomains, level);
  } else {
    return some(specDomains.yDomain);
  }
}

function getAxisDomain(
  orientation: AxisOrientation,
  specDomains: SpecDomains,
  chartRotation: number,
  level: number,
): Option<SpecDomain> {
  if (orientation === AxisOrientation.Vertical) {
    return getVerticalDomain(specDomains, chartRotation, level);
  } else {
    return getHorizontalDomain(specDomains, chartRotation, level);
  }

}

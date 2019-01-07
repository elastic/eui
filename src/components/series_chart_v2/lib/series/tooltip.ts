import { TooltipData, TooltipPosition } from '../../state/chart_state';
import { Accessor } from '../utils/accessor';
import { Dimensions } from '../utils/dimensions';
import { AxisSpec, BasicSeriesSpec, Datum, TickFormatter } from './specs';

export function computeTooltipPosition(
  chartDims: Dimensions,
  parentDims: Dimensions,
  x: number,
  y: number,
  width = 0,
): TooltipPosition {
  let tooltipX = chartDims.left + x + width;
  let tooltipXPosition = 'left';
  if (x + width > chartDims.width / 2) {
    const chartLeftPadding = parentDims.width - chartDims.width - chartDims.left;
    tooltipX = chartLeftPadding + (chartDims.width - x);
    tooltipXPosition = 'right';
  }
  return {
    [tooltipXPosition]: tooltipX,
    top: chartDims.top + y,
  };
}

export function formatTooltip(
  tooltip: TooltipData,
  spec: BasicSeriesSpec,
  xAxis?: AxisSpec,
  yAxis?: AxisSpec,
): Array<[any, any]> {
  const { seriesKey, datum } = tooltip.value;
  let yAccessors = spec.yAccessors;
  if (yAccessors.length > 1) {
    yAccessors = seriesKey.slice(-1);
  }
  // format y value
  const yValues = formatAccessor(datum, yAccessors, yAxis ? yAxis.tickFormat :  emptyFormatter);
  let yTitle = 'Value';
  if (spec.yAccessors.length > 1) {
    yTitle = `${yAccessors[0]}`;
  } else if (yAxis && yAxis.title) {
    yTitle = yAxis.title;
  }

  const xValues = formatAccessor(datum, [spec.xAccessor], xAxis ? xAxis.tickFormat : emptyFormatter);
  let xTitle = 'X Value';
  if (xAxis && xAxis.title) {
    xTitle = xAxis.title;
  }
  return [
    [yTitle, yValues[0][1]],
    ...formatAccessor(datum, spec.splitSeriesAccessors, emptyFormatter),
    [xTitle, xValues[0][1]],
  ];
}
function formatAccessor(
  datum: Datum,
  accessors: Accessor[] = [],
  formatter: TickFormatter,
  ): Array<[any, any]> {
  return accessors.map((accessor): [any, any] => {
    return [accessor, formatter(datum[accessor])];
  });
}

function emptyFormatter(value: any): any {
  return value;
}

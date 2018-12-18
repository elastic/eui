import { TooltipPosition } from '../../state/chart_state';
import { Dimensions } from '../utils/dimensions';

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

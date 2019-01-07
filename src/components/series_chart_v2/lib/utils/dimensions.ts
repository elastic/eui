import { AxisTicksDimensions } from '../axes/axis_utils';
import { AxisSpec, Position } from '../series/specs';
import { LegendStyle } from '../themes/theme';
import { AxisId } from './ids';

export interface Dimensions {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface Margins {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
/**
 * Compute the chart dimension padding the parent dimension by the specified set of axis
 * @param parentDimensions the parent dimension
 * @param axisDimensions the axis dimensions
 * @param axisSpecs the axis specs
 */
export function computeChartDimensions(
  parentDimensions: Dimensions,
  chartMargins: Margins,
  chartPaddings: Margins,
  legendStyle: LegendStyle,
  axisDimensions: Map<AxisId, AxisTicksDimensions>,
  axisSpecs: Map<AxisId, AxisSpec>,
  showLegend: boolean,
  legendPosition?: Position,
): Dimensions {
  let vLeftAxisSpecWidth = 0;
  let vRightAxisSpecWidth = 0;
  let hTopAxisSpecHeight = 0;
  let hBottomAxisSpecHeight = 0;

  axisDimensions.forEach(({ maxTickWidth = 0, maxTickHeight = 0 }, id) => {
    const axisSpec = axisSpecs.get(id);
    if (!axisSpec) {
      return;
    }
    const { position, tickSize, tickPadding } = axisSpec;
    switch (position) {
      case  Position.Top:
        hTopAxisSpecHeight += maxTickHeight + tickSize + tickPadding + chartMargins.top;
        break;
      case Position.Bottom:
        hBottomAxisSpecHeight += maxTickHeight + tickSize + tickPadding  + chartMargins.bottom;
        break;
      case Position.Left:
        vLeftAxisSpecWidth += maxTickWidth + tickSize + tickPadding + chartMargins.left;
        break;
      case Position.Right:
        vRightAxisSpecWidth += maxTickWidth + tickSize + tickPadding + chartMargins.right;
        break;
    }
  });
  // const hMargins = chartMargins.left + chartMargins.right;
  const chartWidth = parentDimensions.width - vLeftAxisSpecWidth - vRightAxisSpecWidth;
  const chartHeight = parentDimensions.height - hTopAxisSpecHeight - hBottomAxisSpecHeight;
  let vMargin = 0;
  if (hTopAxisSpecHeight === 0) {
    vMargin += chartMargins.top;
  }
  if (hBottomAxisSpecHeight === 0) {
    vMargin += chartMargins.bottom;
  }
  let hMargin = 0;
  if (vLeftAxisSpecWidth === 0) {
    hMargin += chartMargins.left;
  }
  if (vRightAxisSpecWidth === 0) {
    hMargin += chartMargins.right;
  }
  let legendTopMargin = 0;
  let legendLeftMargin = 0;
  if (showLegend) {
    switch (legendPosition) {
      case 'right':
        hMargin += legendStyle.verticalWidth;
        break;
      case 'left':
        hMargin += legendStyle.verticalWidth;
        legendLeftMargin = legendStyle.verticalWidth;
        break;
      case 'top':
        vMargin += legendStyle.horizontalHeight;
        legendTopMargin = legendStyle.horizontalHeight;
        break;
      case 'bottom':
        vMargin += legendStyle.horizontalHeight;
        break;
    }
  }
  let top = 0;
  let left = 0;
  if (hTopAxisSpecHeight === 0) {
    top = chartMargins.top + chartPaddings.top + legendTopMargin;
  } else {
    top = hTopAxisSpecHeight + chartPaddings.top + legendTopMargin;
  }
  if (vLeftAxisSpecWidth === 0) {
    left = chartMargins.left + chartPaddings.left + legendLeftMargin;
  } else {
    left = vLeftAxisSpecWidth + chartPaddings.left + legendLeftMargin;
  }
  return {
    top,
    left,
    width: chartWidth - hMargin - chartPaddings.left - chartPaddings.right,
    height: chartHeight - vMargin - chartPaddings.bottom - chartPaddings.bottom,
  };
}

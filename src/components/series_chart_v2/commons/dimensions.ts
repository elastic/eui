import { AxisTicksDimensions } from './axes/axis_utils';
import { AxisId } from './ids';
import { AxisOrientation, AxisPosition, AxisSpec } from './series/specs';
import { ChartConfig } from './themes/theme';

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
  chartConfig: ChartConfig,
  axisDimensions: Map<AxisId, AxisTicksDimensions>,
  axisSpecs: Map<AxisId, AxisSpec>,
): Dimensions {
  let vLeftAxisSpecWidth = 0;
  let vRightAxisSpecWidth = 0;
  let hTopAxisSpecHeight = 0;
  let hBottomAxisSpecHeight = 0;
  const { margins } = chartConfig;

  axisDimensions.forEach(({ maxTickWidth = 0, maxTickHeight = 0 }, id) => {
    const axisSpec = axisSpecs.get(id);
    if (!axisSpec) {
      return;
    }
    const { orientation, position, tickSize, tickPadding } = axisSpec;
    if (orientation === AxisOrientation.Horizontal) {
      if (position === AxisPosition.Top) {
        hTopAxisSpecHeight += maxTickHeight + tickSize + tickPadding + margins.top;
      } else if (position === AxisPosition.Bottom) {
        hBottomAxisSpecHeight += maxTickHeight + tickSize + tickPadding  + margins.bottom;
      }
    } else {
      if (position === AxisPosition.Left) {
        vLeftAxisSpecWidth += maxTickWidth + tickSize + tickPadding + margins.left;
      } else if (position === AxisPosition.Right) {
        vRightAxisSpecWidth += maxTickWidth + tickSize + tickPadding + margins.right;
      }
    }
  });
  // const hMargins = margins.left + margins.right;
  const chartWidth = parentDimensions.width - vLeftAxisSpecWidth - vRightAxisSpecWidth;
  const chartHeight = parentDimensions.height - hTopAxisSpecHeight - hBottomAxisSpecHeight;
  let vMargin = 0;
  if (hTopAxisSpecHeight === 0) {
    vMargin += margins.top;
  }
  if (hBottomAxisSpecHeight === 0) {
    vMargin += margins.bottom;
  }
  let hMargin = 0;
  if (vLeftAxisSpecWidth === 0) {
    hMargin += margins.left;
  }
  if (vRightAxisSpecWidth === 0) {
    hMargin += margins.right;
  }
  return {
    top: hTopAxisSpecHeight === 0 ? margins.top : hTopAxisSpecHeight,
    left: vLeftAxisSpecWidth === 0 ? margins.left : vLeftAxisSpecWidth,
    width: chartWidth - hMargin,
    height: chartHeight - vMargin,
  };
}

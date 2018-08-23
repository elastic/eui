import { AxisDimensions } from '../state/axis_utils';
import { AxisId } from './ids';
import { AxisOrientation, AxisPosition, AxisSpec } from './specs';

export interface Dimensions {
  top: number;
  left: number;
  width: number;
  height: number;
}
/**
 * Compute the chart dimension padding the parent dimension by the specified set of axis
 * @param parentDimensions the parent dimension
 * @param axisDimensions the axis dimensions
 * @param axisSpecs the axis specs
 */
export function computeChartDimensions(
  parentDimensions: Dimensions,
  axisDimensions: Map<AxisId, AxisDimensions>,
  axisSpecs: Map<AxisId, AxisSpec>,
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
    const { orientation, position, tickSize, tickPadding } = axisSpec;
    if (orientation === AxisOrientation.Horizontal) {
      if (position === AxisPosition.Top) {
        hTopAxisSpecHeight += maxTickHeight + tickSize + tickPadding;
      } else if (position === AxisPosition.Bottom) {
        hBottomAxisSpecHeight += maxTickHeight + tickSize + tickPadding;
      }
    } else {
      if (position === AxisPosition.Left) {
        vLeftAxisSpecWidth += maxTickWidth + tickSize + tickPadding;
      } else if (position === AxisPosition.Right) {
        vRightAxisSpecWidth += maxTickWidth + tickSize + tickPadding;
      }
    }
  });

  const chartWidth = parentDimensions.width - vLeftAxisSpecWidth - vRightAxisSpecWidth;
  const chartHeight = parentDimensions.height - hTopAxisSpecHeight - hBottomAxisSpecHeight;

  return {
    top: hTopAxisSpecHeight,
    left: vLeftAxisSpecWidth,
    width: chartWidth,
    height: chartHeight,
  };
}

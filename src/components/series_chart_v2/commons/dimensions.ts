import { AxisDimensions } from '../state/axis_utils';
import { AxisId, AxisOrientation, AxisPosition, AxisSpec } from './specs';

export interface Dimensions {
  width: number;
  height: number;
}

export function computeChartDimensions(
  parentDimensions: Dimensions,
  axisDimensions: Map<AxisId, AxisDimensions>,
  axisSpecs: Map<AxisId, AxisSpec>,
) {
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
        hTopAxisSpecHeight += maxTickWidth + tickSize + tickPadding;
      } else if (position === AxisPosition.Bottom) {
        hBottomAxisSpecHeight += maxTickWidth + tickSize + tickPadding;
      }
    } else {
      if (position === AxisPosition.Left) {
        vLeftAxisSpecWidth += maxTickHeight + tickSize + tickPadding;
      } else if (position === AxisPosition.Top) {
        vRightAxisSpecWidth += maxTickHeight + tickSize + tickPadding;
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

// function maxTickDimension(axisSpec, dimensionName) {
//   let max = 0;
//   let total = 0;
//   axisSpec.forEach(spec => {
//     const maxTickDimension = spec.dimensions[`maxTick${capitalize(dimensionName)}`];
//     max = Math.max(max, maxTickDimension);
//     total += maxTickDimension + spec.tickSize + spec.tickPadding;
//   });
//   return {
//     max,
//     total
//   };
// }

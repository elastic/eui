import { AxisTicksDimensions } from './axes/axis_utils';
import { ScaleType } from './data_ops/scales';
import { computeChartDimensions } from './dimensions';
import { AxisId, getAxisId, getGroupId } from './ids';
import { AxisOrientation, AxisPosition, AxisSpec } from './series/specs';

describe('Computed chart dimensions', () => {
  const parentDim = {
    width: 100,
    height: 100,
    top: 0,
    left: 0,
  };
  const axis1Dims = {
    axisScaleType: ScaleType.Linear,
    axisScaleDomain: [0, 1],
    tickValues: [0, 1],
    ticksDimensions: [{ width: 50, height: 20 }, { width: 50, height: 20 }],
    tickLabels: ['first', 'second'],
    maxTickWidth: 50,
    maxTickHeight: 20,
  };
  const axis1Spec = {
    id: getAxisId('axis_1'),
    groupId: getGroupId('group_1'),
    hide: false,
    showOverlappingTicks: false,
    showOverlappingLabels: false,
    position: AxisPosition.Left,
    orientation: AxisOrientation.Vertical,
    tickSize: 10,
    tickPadding: 10,
    tickFormat: (value: any) => {
      return `${value}`;
    },
  };
  test('should be equal to parent dimension with no axis', () => {
    const axisDims = new Map<AxisId, AxisTicksDimensions>();
    const axisSpecs = new Map<AxisId, AxisSpec>();
    const chartDimensions = computeChartDimensions(parentDim, axisDims, axisSpecs);
    const expectedChartDimensions = { top: 0, left: 0, ...parentDim };
    expect(chartDimensions).toEqual(expectedChartDimensions);
  });
  test('should be padded by a right axis', () => {
    const axisDims = new Map<AxisId, AxisTicksDimensions>();
    const axisSpecs = new Map<AxisId, AxisSpec>();
    axisDims.set(getAxisId('axis_1'), axis1Dims);
    axisSpecs.set(getAxisId('axis_1'), axis1Spec);
    const chartDimensions = computeChartDimensions(parentDim, axisDims, axisSpecs);
    const expectedChartDimensions = { top: 0, left: 70, width: 30, height: 100 };
    expect(chartDimensions).toEqual(expectedChartDimensions);
  });
  test('should be padded by a right axis', () => {
    const axisDims = new Map<AxisId, AxisTicksDimensions>();
    const axisSpecs = new Map<AxisId, AxisSpec>();
    axisDims.set(getAxisId('axis_1'), axis1Dims);
    axisSpecs.set(getAxisId('axis_1'), { ...axis1Spec, position: AxisPosition.Right });
    const chartDimensions = computeChartDimensions(parentDim, axisDims, axisSpecs);
    const expectedChartDimensions = { top: 0, left: 0, width: 30, height: 100 };
    expect(chartDimensions).toEqual(expectedChartDimensions);
  });
  test('should be padded by a top axis', () => {
    const axisDims = new Map<AxisId, AxisTicksDimensions>();
    const axisSpecs = new Map<AxisId, AxisSpec>();
    axisDims.set(getAxisId('axis_1'), axis1Dims);
    axisSpecs.set(getAxisId('axis_1'), {
      ...axis1Spec,
      position: AxisPosition.Top,
      orientation: AxisOrientation.Horizontal,
    });
    const chartDimensions = computeChartDimensions(parentDim, axisDims, axisSpecs);
    const expectedChartDimensions = { top: 40, left: 0, width: 100, height: 60 };
    expect(chartDimensions).toEqual(expectedChartDimensions);
  });
  test('should be padded by a bottom axis', () => {
    const axisDims = new Map<AxisId, AxisTicksDimensions>();
    const axisSpecs = new Map<AxisId, AxisSpec>();
    axisDims.set(getAxisId('axis_1'), axis1Dims);
    axisSpecs.set(getAxisId('axis_1'), {
      ...axis1Spec,
      position: AxisPosition.Bottom,
      orientation: AxisOrientation.Horizontal,
    });
    const chartDimensions = computeChartDimensions(parentDim, axisDims, axisSpecs);
    const expectedChartDimensions = { top: 0, left: 0, width: 100, height: 60 };
    expect(chartDimensions).toEqual(expectedChartDimensions);
  });
});

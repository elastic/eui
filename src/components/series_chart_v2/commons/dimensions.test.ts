import { createContinuousScale, ScaleType } from '../commons/scales';
import { AxisDimensions } from '../state/axis_utils';
import { computeChartDimensions } from './dimensions';
import { AxisOrientation, AxisPosition, AxisSpec } from './specs';

describe('Computed chart dimensions', () => {
  const parentDim = { width: 100, height: 100 };
  const axis1Dims = {
    scale: createContinuousScale(ScaleType.Linear, [0, 1], 0, 100),
    tickValues: [0, 1],
    ticksDimensions: [{ width: 50, height: 20 }, { width: 50, height: 20 }],
    tickLabels: ['first', 'second'],
    maxTickWidth: 50,
    maxTickHeight: 20,
  };
  const axis1Spec = {
    id: 'axis_1',
    groupId: 'group_1',
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
    const axisDims = new Map<string, AxisDimensions>();
    const axisSpecs = new Map<string, AxisSpec>();
    const chartDimensions = computeChartDimensions(parentDim, axisDims, axisSpecs);
    const expectedChartDimensions = { top: 0, left: 0, ...parentDim };
    expect(chartDimensions).toEqual(expectedChartDimensions);
  });
  test('should be padded by a right axis', () => {
    const axisDims = new Map<string, AxisDimensions>();
    const axisSpecs = new Map<string, AxisSpec>();
    axisDims.set('axis_1', axis1Dims);
    axisSpecs.set('axis_1', axis1Spec);
    const chartDimensions = computeChartDimensions(parentDim, axisDims, axisSpecs);
    const expectedChartDimensions = { top: 0, left: 70, width: 30, height: 100 };
    expect(chartDimensions).toEqual(expectedChartDimensions);
  });
  test('should be padded by a right axis', () => {
    const axisDims = new Map<string, AxisDimensions>();
    const axisSpecs = new Map<string, AxisSpec>();
    axisDims.set('axis_1', axis1Dims);
    axisSpecs.set('axis_1', { ...axis1Spec, position: AxisPosition.Right });
    const chartDimensions = computeChartDimensions(parentDim, axisDims, axisSpecs);
    const expectedChartDimensions = { top: 0, left: 0, width: 30, height: 100 };
    expect(chartDimensions).toEqual(expectedChartDimensions);
  });
  test('should be padded by a top axis', () => {
    const axisDims = new Map<string, AxisDimensions>();
    const axisSpecs = new Map<string, AxisSpec>();
    axisDims.set('axis_1', axis1Dims);
    axisSpecs.set('axis_1', {
      ...axis1Spec,
      position: AxisPosition.Top,
      orientation: AxisOrientation.Horizontal,
    });
    const chartDimensions = computeChartDimensions(parentDim, axisDims, axisSpecs);
    const expectedChartDimensions = { top: 40, left: 0, width: 100, height: 60 };
    expect(chartDimensions).toEqual(expectedChartDimensions);
  });
  test('should be padded by a bottom axis', () => {
    const axisDims = new Map<string, AxisDimensions>();
    const axisSpecs = new Map<string, AxisSpec>();
    axisDims.set('axis_1', axis1Dims);
    axisSpecs.set('axis_1', {
      ...axis1Spec,
      position: AxisPosition.Bottom,
      orientation: AxisOrientation.Horizontal,
    });
    const chartDimensions = computeChartDimensions(parentDim, axisDims, axisSpecs);
    const expectedChartDimensions = { top: 0, left: 0, width: 100, height: 60 };
    expect(chartDimensions).toEqual(expectedChartDimensions);
  });
});

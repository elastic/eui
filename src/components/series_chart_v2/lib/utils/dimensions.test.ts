import { AxisTicksDimensions } from '../axes/axis_utils';
import { AxisSpec, Position } from '../series/specs';
import { computeChartDimensions, Margins } from './dimensions';
import { AxisId, getAxisId, getGroupId } from './ids';
import { ScaleType } from './scales/scales';

describe('Computed chart dimensions', () => {
  const parentDim = {
    width: 100,
    height: 100,
    top: 0,
    left: 0,
  };
  const chartMargins: Margins = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  };
  const chartPaddings: Margins = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  };

  const axis1Dims = {
    axisScaleType: ScaleType.Linear,
    axisScaleDomain: [0, 1],
    tickValues: [0, 1],
    ticksDimensions: [{ width: 10, height: 10 }, { width: 10, height: 10 }],
    tickLabels: ['first', 'second'],
    maxTickWidth: 10,
    maxTickHeight: 10,
  };
  const axis1Spec = {
    id: getAxisId('axis_1'),
    groupId: getGroupId('group_1'),
    hide: false,
    showOverlappingTicks: false,
    showOverlappingLabels: false,
    position: Position.Left,
    tickSize: 10,
    tickPadding: 10,
    tickFormat: (value: any) => {
      return `${value}`;
    },
  };
  test('should be equal to parent dimension with no axis minus margins', () => {
    const axisDims = new Map<AxisId, AxisTicksDimensions>();
    const axisSpecs = new Map<AxisId, AxisSpec>();
    const chartDimensions = computeChartDimensions(parentDim, chartMargins, chartPaddings, axisDims, axisSpecs);
    expect(chartDimensions).toMatchSnapshot();
  });
  test('should be padded by a left axis', () => {
    const axisDims = new Map<AxisId, AxisTicksDimensions>();
    const axisSpecs = new Map<AxisId, AxisSpec>();
    axisDims.set(getAxisId('axis_1'), axis1Dims);
    axisSpecs.set(getAxisId('axis_1'), axis1Spec);
    const chartDimensions = computeChartDimensions(parentDim, chartMargins, chartPaddings, axisDims, axisSpecs);
    expect(chartDimensions).toMatchSnapshot();
  });
  test('should be padded by a right axis', () => {
    const axisDims = new Map<AxisId, AxisTicksDimensions>();
    const axisSpecs = new Map<AxisId, AxisSpec>();
    axisDims.set(getAxisId('axis_1'), axis1Dims);
    axisSpecs.set(getAxisId('axis_1'), { ...axis1Spec, position: Position.Right });
    const chartDimensions = computeChartDimensions(parentDim, chartMargins, chartPaddings, axisDims, axisSpecs);
    expect(chartDimensions).toMatchSnapshot();
  });
  test('should be padded by a top axis', () => {
    const axisDims = new Map<AxisId, AxisTicksDimensions>();
    const axisSpecs = new Map<AxisId, AxisSpec>();
    axisDims.set(getAxisId('axis_1'), axis1Dims);
    axisSpecs.set(getAxisId('axis_1'), {
      ...axis1Spec,
      position: Position.Top,
    });
    const chartDimensions = computeChartDimensions(parentDim, chartMargins, chartPaddings, axisDims, axisSpecs);
    expect(chartDimensions).toMatchSnapshot();
  });
  test('should be padded by a bottom axis', () => {
    const axisDims = new Map<AxisId, AxisTicksDimensions>();
    const axisSpecs = new Map<AxisId, AxisSpec>();
    axisDims.set(getAxisId('axis_1'), axis1Dims);
    axisSpecs.set(getAxisId('axis_1'), {
      ...axis1Spec,
      position: Position.Bottom,
    });
    const chartDimensions = computeChartDimensions(parentDim, chartMargins, chartPaddings, axisDims, axisSpecs);
    expect(chartDimensions).toMatchSnapshot();
  });
});

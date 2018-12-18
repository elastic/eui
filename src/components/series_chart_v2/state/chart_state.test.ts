import { AxisPosition, AxisSpec, BarSeriesSpec } from '../lib/series/specs';
import { getAxisId, getGroupId, getSpecId } from '../lib/utils/ids';
import { ScaleType } from '../lib/utils/scales/scales';
import { ChartStore } from './chart_state';

describe('Chart Store', () => {
  const mockedRect = {
    x: 0,
    y: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 10,
    height: 12,
    toJSON: () => '',
  };
  const originalGetBBox = SVGElement.prototype.getBBox;
  beforeEach(() => SVGElement.prototype.getBBox = () => {
    return mockedRect;
  });
  afterEach(() => (SVGElement.prototype.getBBox = originalGetBBox));

  const store = new ChartStore();
  store.updateParentDimensions(600, 600, 0, 0);
  const SPEC_ID = getSpecId('spec_1');
  const AXIS_ID = getAxisId('axis_1');
  const GROUP_ID = getGroupId('group_1');

  const spec: BarSeriesSpec = {
    id: SPEC_ID,
    groupId: GROUP_ID,
    seriesType: 'bar',
    yScaleToDataExtent: false,
    data: [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ],
    xAccessor: 'x',
    yAccessors: ['y'],
    xScaleType: ScaleType.Linear,
    yScaleType: ScaleType.Linear,
  };

  test('can add a single spec', () => {
    store.addSeriesSpec(spec);
    const { seriesSpecDomains } = store;
    const computedSpecDomain = seriesSpecDomains.get(SPEC_ID);
    expect(computedSpecDomain).not.toBeUndefined();
  });

  test('can add an axis', () => {
    const axisSpec: AxisSpec = {
      id: AXIS_ID,
      groupId: GROUP_ID,
      hide: false,
      showOverlappingTicks: false,
      showOverlappingLabels: false,
      position: AxisPosition.Left,
      tickSize: 30,
      tickPadding: 10,
      tickFormat: (value: any) => `value ${value}`,
    };
    store.addAxisSpec(axisSpec);
    store.computeChart();
    const { axesSpecs, axesTicksDimensions, axesPositions, axesVisibleTicks, axesTicks } = store;
    expect(axesSpecs.get(AXIS_ID)).not.toBeUndefined();
    expect(axesTicksDimensions.get(AXIS_ID)).not.toBeUndefined();
    expect(axesPositions.get(AXIS_ID)).not.toBeUndefined();
    expect(axesVisibleTicks.get(AXIS_ID)).not.toBeUndefined();
    expect(axesTicks.get(AXIS_ID)).not.toBeUndefined();
  });
});

import { getAxisId, getGroupId, getSpecId } from '../commons/ids';
import { ScaleType } from '../commons/scales';
import { AxisOrientation, AxisPosition, AxisSpec, DataSeriesSpec, DataSeriesType } from '../commons/specs';
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
  const spec: DataSeriesSpec = {
    id: getSpecId('spec_1'),
    groupId: getGroupId('group_1'),
    type: DataSeriesType.Bar,
    scaleToExtent: false,
    data: [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ],
    xAccessor: (value: any) => value.x,
    yAccessor: (value: any) => value.y,
    xScaleType: ScaleType.Linear,
    yScaleType: ScaleType.Linear,
    groupAccessors: [],
  };
  test('can add a single spec', () => {
    store.addSeriesSpecs(spec);
    const { seriesScales, seriesSpecs } = store;
    const computedSpecScale = seriesScales.get(getSpecId('spec_1'));
    expect(computedSpecScale).not.toBeUndefined();
    expect(computedSpecScale!.domains.xDomain).toEqual([ 1, 3 ]);
    const addesSeriesSpec = seriesSpecs.get(getSpecId('spec_1'));
    expect(addesSeriesSpec).toEqual(spec);
  });
  test('can add an axis', () => {
    const axisSpec: AxisSpec = {
      id: getAxisId('axis_1'),
      groupId: getGroupId('group_1'),
      hide: false,
      showOverlappingTicks: false,
      showOverlappingLabels: false,
      position: AxisPosition.Left,
      orientation: AxisOrientation.Vertical,
      tickSize: 30,
      tickPadding: 10,
      tickFormat: (value: any) => `value ${value}`,
    };
    store.addAxis(axisSpec);
    store.computeChart();
    // console.log(JSON.stringify([...store.axisVisibleTicks], null, 2));
    // console.log(JSON.stringify([...store.axisTicks], null, 2));
    // console.log(JSON.stringify([...store.axisPositions], null, 2));
  });
});

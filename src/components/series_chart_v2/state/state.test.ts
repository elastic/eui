import { ScaleType } from '../commons/scales';
import { AxisOrientation, AxisPosition, AxisSpec, DataSeriesSpec } from '../commons/specs';
import { ChartStore } from './state';
declare global {
  interface SVGElement {
    getBBox(): SVGRect;
  }
}
describe('Chart Store', () => {
  const mockedRect = {
    x: 0,
    y: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 100,
    height: 12,
    toJSON: () => '',
  };
  const originalGetBBox = SVGElement.prototype.getBBox;
  beforeEach(() => SVGElement.prototype.getBBox = function() {
    const text = this.textContent || '';
    return { ...mockedRect, width: text.length * 10 };
  });
  afterEach(() => (SVGElement.prototype.getBBox = originalGetBBox));

  const store = new ChartStore();
  const spec: DataSeriesSpec = {
    id: 'spec_1',
    groupId: 'group_1',
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
    const computedSpecScale = seriesScales.get('spec_1');
    expect(computedSpecScale).not.toBeUndefined();
    expect(computedSpecScale!.domains.xDomain).toEqual([ 1, 3 ]);
    const addesSeriesSpec = seriesSpecs.get('spec_1');
    expect(addesSeriesSpec).toEqual(spec);
  });
  test('can add an axis', () => {
    const axisSpec: AxisSpec = {
      id: 'axis_1',
      groupId: 'group_1',
      hide: false,
      showOverlappingTicks: false,
      showOverlappingLabels: false,
      position: AxisPosition.Left,
      orientation: AxisOrientation.Vertical,
      tickSize: 10,
      tickPadding: 10,
      tickFormat: (value: any) => `value ${value}`,
    };
    store.addAxis(axisSpec);
    store.computeChart();
  });
});

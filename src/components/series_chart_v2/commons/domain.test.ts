import { computeContinuousDataDomain, computeOrdinalDataDomain, computeSeriesDomains } from './domain';
import { getGroupId, getSpecId } from './ids';
import { ScaleType } from './scales';
import { DataSeriesType } from './specs';

const TEST_DATASET_1 = [
  { group: 'a', stack: 'a', x: 1, y: 10 },
  { group: 'a', stack: 'b', x: 2, y: 20 },
  { group: 'a', stack: 'a', x: 3, y: 30 },
  { group: 'a', stack: 'b', x: 4, y: 5 },
  { group: 'a', stack: 'b', x: 4, y: 10 },
  { group: 'b', stack: 'c', x: 4, y: 10 },
];

const TEST_DATASET_2 = [
  { level0: 'x', level1: 'a', level2: 1, y: 10 },
  { level0: 'x', level1: 'a', level2: 2, y: 20 },
  { level0: 'x', level1: 'a', level2: 3, y: 30 },
  { level0: 'x', level1: 'b', level2: 1, y: 30 },
  { level0: 'x', level1: 'b', level2: 2, y: 20 },
  { level0: 'x', level1: 'b', level2: 3, y: 10 },
  { level0: 'y', level1: 'c', level2: 1, y: 30 },
  { level0: 'y', level1: 'c', level2: 2, y: 10 },
  { level0: 'y', level1: 'c', level2: 4, y: 20 },
];

const TEST_DATASET_3 = [
  { group: 'a', cluster: 'a', x: 0, y: 4 },
  { group: 'b', cluster: 'a', x: 1, y: 10 },
  { group: 'b', cluster: 'a', x: 2, y: 3 },

  { group: 'a', cluster: 'b', x: 0, y: 4 },
  { group: 'b', cluster: 'b', x: 1, y: 10 },
  { group: 'b', cluster: 'b', x: 2, y: 5 },

  { group: 'a', cluster: 'c', x: 0, y: 4 },
  { group: 'b', cluster: 'c', x: 1, y: 10 },
  { group: 'b', cluster: 'c', x: 2, y: 12 },

  { group: 'a', cluster: 'd', x: 0, y: 4 },
  { group: 'b', cluster: 'd', x: 1, y: 10 },
  { group: 'b', cluster: 'd', x: 2, y: 2 },
];

describe.only('Domain Utils', () => {
  test('Compute linear domain', () => {
    const accessor = (d: any) => d.x;
    const domain = computeContinuousDataDomain(TEST_DATASET_1, accessor);
    const expectedDomain = [0, 4];
    expect(domain).toEqual(expectedDomain);
  });
  test('Compute linear domain scaled to extent', () => {
    const accessor = (d: any) => d.x;
    const domain = computeContinuousDataDomain(TEST_DATASET_1, accessor, true);
    const expectedDomain = [1, 4];
    expect(domain).toEqual(expectedDomain);
  });
  test('Compute ordinal domain', () => {
    const accessor = (d: any) => d.stack;
    const domain = computeOrdinalDataDomain(TEST_DATASET_1, accessor);
    const expectedDomain = ['a', 'b', 'c'];
    expect(domain).toEqual(expectedDomain);
  });
  test('Compute linear domain with ordinal elements', () => {
    // skipping because we need to find a way to avoid linear scales with wrong accessor
    const accessor = (d: any) => d.stack;
    const domain = computeContinuousDataDomain(TEST_DATASET_1, accessor);
    const expectedDomain = [0, 'c'];
    expect(domain).toEqual(expectedDomain);
  });

  test('Compute grouped data domains', () => {
    const xAccessor = (d: any) => (d.level2);
    const yAccessor = (d: any) => (d.y);
    const level0Accessor = (d: any) => (d.level0);
    const level1Accessor = (d: any) => (d.level1);
    const spec = {
      id: getSpecId('test'),
      groupId: getGroupId('test'),
      type: DataSeriesType.Bar,
      data: TEST_DATASET_2,
      scaleToExtent: false,
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      xAccessor,
      yAccessor,
      groupAccessors: [
        level0Accessor,
        level1Accessor,
      ],
    };
    const domains = computeSeriesDomains(spec);
    const expectedDomains = [
      {
        groupLevel: 0,
        xDomain: [ 'x', 'y' ],
        xScaleType: 'ordinal',
        xAccessor: level0Accessor,
      },
      {
        groupLevel: 1,
        xDomain: [ 'a', 'b', 'c' ],
        xScaleType: 'ordinal',
        xAccessor: level1Accessor,
      },
      {
        groupLevel: 2,
        xDomain: [ 1, 2, 3, 4 ],
        yDomain: [ 0, 30 ],
        xScaleType: 'ordinal',
        yScaleType: 'linear',
        xAccessor,
        yAccessor,
      },
    ];
    expect(domains).toEqual(expectedDomains);
  });
  test('Compute simple non grouped domain', () => {
    const xAccessor = (d: any) => (d.level2);
    const yAccessor = (d: any) => (d.y);
    const spec = {
      id: getSpecId('test'),
      groupId: getGroupId('test'),
      type: DataSeriesType.Bar,
      data: TEST_DATASET_2,
      scaleToExtent: false,
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      xAccessor,
      yAccessor,
      groupAccessors: [],
    };
    const domains = computeSeriesDomains(spec);
    const expectedDomains = [
      {
        groupLevel: 0,
        xDomain: [ 0, 4 ],
        yDomain: [ 0, 30 ],
        xScaleType: 'linear',
        yScaleType: 'linear',
        xAccessor,
        yAccessor,
      },
    ];
    expect(domains).toEqual(expectedDomains);
  });
  test('should compute stacked domains', () => {
    const xAccessor = (d: any) => (d.x);
    const yAccessor = (d: any) => (d.y);
    const stackAccessor = (d: any) => (d.group);
    const spec = {
      id: getSpecId('test'),
      groupId: getGroupId('test'),
      type: DataSeriesType.Bar,
      data: TEST_DATASET_3,
      scaleToExtent: false,
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      xAccessor,
      yAccessor,
      stackAccessor,
      groupAccessors: [],
    };
    const domains = computeSeriesDomains(spec);
    const expectedDomains = [
      {
        groupLevel: 0,
        xDomain: [ 0, 2 ],
        yDomain: [ 0, 40 ],
        xScaleType: 'linear',
        yScaleType: 'linear',
        xAccessor,
        yAccessor,
      },
    ];
    expect(domains).toEqual(expectedDomains);
  });
  test('should compute grouped and stacked domains', () => {
    const xAccessor = (d: any) => (d.x);
    const yAccessor = (d: any) => (d.y);
    const stackAccessor = (d: any) => (d.cluster);
    const spec = {
      id: getSpecId('test'),
      groupId: getGroupId('test'),
      type: DataSeriesType.Bar,
      data: TEST_DATASET_3,
      scaleToExtent: false,
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      xAccessor,
      yAccessor,
      stackAccessor,
      groupAccessors: [],
    };
    const domains = computeSeriesDomains(spec);
    const expectedDomains = [
      {
        groupLevel: 0,
        xDomain: [ 0, 2 ],
        yDomain: [ 0, 40 ],
        xScaleType: 'linear',
        yScaleType: 'linear',
        xAccessor,
        yAccessor,
      },
    ];
    expect(domains).toEqual(expectedDomains);
  });
});

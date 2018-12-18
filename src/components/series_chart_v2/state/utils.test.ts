import { BasicSeriesSpec } from '../lib/series/specs';
import { BARCHART_1Y0G, BARCHART_1Y1G } from '../lib/series/utils/test_dataset';
import { getGroupId, getSpecId, SpecId } from '../lib/utils/ids';
import { ScaleType } from '../lib/utils/scales/scales';
import { computeSeriesDomains } from './utils';

describe('Chart State utils', () => {
  it('should compute and format specifications for non stacked chart', () => {
    const spec1: BasicSeriesSpec = {
      id: getSpecId('spec1'),
      groupId: getGroupId('group1'),
      seriesType: 'line',
      yScaleType: ScaleType.Log,
      xScaleType: ScaleType.Linear,
      xAccessor: 'x',
      yAccessors: ['y'],
      yScaleToDataExtent: false,
      data: BARCHART_1Y0G,
    };
    const spec2: BasicSeriesSpec = {
      id: getSpecId('spec2'),
      groupId: getGroupId('group2'),
      seriesType: 'line',
      yScaleType: ScaleType.Log,
      xScaleType: ScaleType.Linear,
      xAccessor: 'x',
      yAccessors: ['y'],
      yScaleToDataExtent: false,
      data: BARCHART_1Y0G,
    };
    const specs = new Map<SpecId, BasicSeriesSpec>();
    specs.set(spec1.id, spec1);
    specs.set(spec2.id, spec2);
    const domains = computeSeriesDomains(specs);
    expect(domains.xDomain).toEqual({
      domain: [0, 3],
      isBandScale: false,
      scaleType: ScaleType.Linear,
      minInterval: 1,
    });
    expect(domains.yDomain).toEqual([
      {
        domain: [0, 10],
        scaleType: ScaleType.Log,
        groupId: 'group1',
      },
      {
        domain: [0, 10],
        scaleType: ScaleType.Log,
        groupId: 'group2',
      },
    ]);
    expect(domains.formattedDataSeries.stacked).toEqual([]);
    expect(domains.formattedDataSeries.nonStacked).toMatchSnapshot();
  });
  it('should compute and format specifications for stacked chart', () => {
    const spec1: BasicSeriesSpec = {
      id: getSpecId('spec1'),
      groupId: getGroupId('group1'),
      seriesType: 'line',
      yScaleType: ScaleType.Log,
      xScaleType: ScaleType.Linear,
      xAccessor: 'x',
      yAccessors: ['y'],
      splitSeriesAccessors: ['g'],
      yScaleToDataExtent: false,
      data: BARCHART_1Y1G,
    };
    const spec2: BasicSeriesSpec = {
      id: getSpecId('spec2'),
      groupId: getGroupId('group2'),
      seriesType: 'line',
      yScaleType: ScaleType.Log,
      xScaleType: ScaleType.Linear,
      xAccessor: 'x',
      yAccessors: ['y'],
      splitSeriesAccessors: ['g'],
      stackAccessors: ['x'],
      yScaleToDataExtent: false,
      data: BARCHART_1Y1G,
    };
    const specs = new Map<SpecId, BasicSeriesSpec>();
    specs.set(spec1.id, spec1);
    specs.set(spec2.id, spec2);
    const domains = computeSeriesDomains(specs);
    expect(domains.xDomain).toEqual({
      domain: [0, 3],
      isBandScale: false,
      scaleType: ScaleType.Linear,
      minInterval: 1,
    });
    expect(domains.yDomain).toEqual([
      {
        domain: [0, 5],
        scaleType: ScaleType.Log,
        groupId: 'group1',
      },
      {
        domain: [0, 9],
        scaleType: ScaleType.Log,
        groupId: 'group2',
      },
    ]);
    expect(domains.formattedDataSeries.stacked).toMatchSnapshot();
    expect(domains.formattedDataSeries.nonStacked).toMatchSnapshot();
  });
});

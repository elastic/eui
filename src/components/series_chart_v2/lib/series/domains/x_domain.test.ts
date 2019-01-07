import { getGroupId, getSpecId, SpecId } from '../../utils/ids';
import { ScaleType } from '../../utils/scales/scales';
import { getSplittedSeries } from '../series';
import { BasicSeriesSpec } from '../specs';
import { convertXScaleTypes, mergeXDomain} from './x_domain';

describe('X Domain', () => {

  test('Should return null when missing specs or specs types', () => {
    const seriesSpecs: BasicSeriesSpec[] = [];
    const mainXScale = convertXScaleTypes(seriesSpecs);
    expect(mainXScale).toBe(null);
  });

  test('Should return correct scale type with single bar', () => {
    const seriesSpecs: Array<Pick<BasicSeriesSpec, 'seriesType' | 'xScaleType'>> = [
      {
        seriesType: 'bar',
        xScaleType: ScaleType.Linear,
      },
    ];
    const mainXScale = convertXScaleTypes(seriesSpecs);
    expect(mainXScale).toEqual({
      scaleType: ScaleType.Linear,
      isBandScale: true,
    });
  });

  test('Should return correct scale type with single bar with Ordinal', () => {
    const seriesSpecs: Array<Pick<BasicSeriesSpec, 'seriesType' | 'xScaleType'>> = [
      {
        seriesType: 'bar',
        xScaleType: ScaleType.Ordinal,
      },
    ];
    const mainXScale = convertXScaleTypes(seriesSpecs);
    expect(mainXScale).toEqual({
      scaleType: ScaleType.Ordinal,
      isBandScale: true,
    });
  });

  test('Should return correct scale type with single area', () => {
    const seriesSpecs: Array<Pick<BasicSeriesSpec, 'seriesType' | 'xScaleType'>> = [
      {
        seriesType: 'area',
        xScaleType: ScaleType.Linear,
      },
    ];
    const mainXScale = convertXScaleTypes(seriesSpecs);
    expect(mainXScale).toEqual({
      scaleType: ScaleType.Linear,
      isBandScale: false,
    });
  });
  test('Should return correct scale type with single line (time)', () => {
    const seriesSpecs: Array<Pick<BasicSeriesSpec, 'seriesType' | 'xScaleType'>> = [
      {
        seriesType: 'line',
        xScaleType: ScaleType.Time,
      },
    ];
    const mainXScale = convertXScaleTypes(seriesSpecs);
    expect(mainXScale).toEqual({
      scaleType: ScaleType.Time,
      isBandScale: false,
    });
  });
  test('Should return correct scale type with multi line, area (log)', () => {
    const seriesSpecs: Array<Pick<BasicSeriesSpec, 'seriesType' | 'xScaleType'>> = [
      {
        seriesType: 'line',
        xScaleType: ScaleType.Log,
      },
      {
        seriesType: 'area',
        xScaleType: ScaleType.Log,
      },
    ];
    const mainXScale = convertXScaleTypes(seriesSpecs);
    expect(mainXScale).toEqual({
      scaleType: ScaleType.Log,
      isBandScale: false,
    });
  });
  test('Should return correct scale type with multi line, area with different scale types (time, log)', () => {
    const seriesSpecs: Array<Pick<BasicSeriesSpec, 'seriesType' | 'xScaleType'>> = [
      {
        seriesType: 'line',
        xScaleType: ScaleType.Time,
      },
      {
        seriesType: 'area',
        xScaleType: ScaleType.Log,
      },
    ];
    const mainXScale = convertXScaleTypes(seriesSpecs);
    expect(mainXScale).toEqual({
      scaleType: ScaleType.Linear,
      isBandScale: false,
    });
  });
  test('Should return correct scale type with multi line, area with different scale types (ordinal, log)', () => {
    const seriesSpecs: Array<Pick<BasicSeriesSpec, 'seriesType' | 'xScaleType'>> = [
      {
        seriesType: 'line',
        xScaleType: ScaleType.Ordinal,
      },
      {
        seriesType: 'area',
        xScaleType: ScaleType.Log,
      },
    ];
    const mainXScale = convertXScaleTypes(seriesSpecs);
    expect(mainXScale).toEqual({
      scaleType: ScaleType.Ordinal,
      isBandScale: false,
    });
  });
  test('Should return correct scale type with multi line with different scale types (linear, ordinal)', () => {
    const seriesSpecs: Array<Pick<BasicSeriesSpec, 'seriesType' | 'xScaleType'>> = [
      {
        seriesType: 'line',
        xScaleType: ScaleType.Linear,
      },
      {
        seriesType: 'line',
        xScaleType: ScaleType.Ordinal,
      },
    ];
    const mainXScale = convertXScaleTypes(seriesSpecs);
    expect(mainXScale).toEqual({
      scaleType: ScaleType.Ordinal,
      isBandScale: false,
    });
  });
  test('Should return correct scale type with multi bar, area with different scale types (ordinal, log)', () => {
    const seriesSpecs: Array<Pick<BasicSeriesSpec, 'seriesType' | 'xScaleType'>> = [
      {
        seriesType: 'bar',
        xScaleType: ScaleType.Ordinal,
      },
      {
        seriesType: 'area',
        xScaleType: ScaleType.Log,
      },
    ];
    const mainXScale = convertXScaleTypes(seriesSpecs);
    expect(mainXScale).toEqual({
      scaleType: ScaleType.Ordinal,
      isBandScale: true,
    });
  });
  test('Should return correct scale type with multi bar, area with different scale types (time, log)', () => {
    const seriesSpecs: Array<Pick<BasicSeriesSpec, 'seriesType' | 'xScaleType'>> = [
      {
        seriesType: 'bar',
        xScaleType: ScaleType.Time,
      },
      {
        seriesType: 'area',
        xScaleType: ScaleType.Log,
      },
    ];
    const mainXScale = convertXScaleTypes(seriesSpecs);
    expect(mainXScale).toEqual({
      scaleType: ScaleType.Linear,
      isBandScale: true,
    });
  });
  test('Should return correct scale type with multi bar, area with different scale types (linear, ordinal)', () => {
    const seriesSpecs: Array<Pick<BasicSeriesSpec, 'seriesType' | 'xScaleType'>> = [
      {
        seriesType: 'bar',
        xScaleType: ScaleType.Linear,
      },
      {
        seriesType: 'area',
        xScaleType: ScaleType.Ordinal,
      },
    ];
    const mainXScale = convertXScaleTypes(seriesSpecs);
    expect(mainXScale).toEqual({
      scaleType: ScaleType.Ordinal,
      isBandScale: true,
    });
  });

  test('Should merge line series correctly', () => {
    const ds1: BasicSeriesSpec = {
      id: getSpecId('ds1'),
      groupId: getGroupId('g1'),
      seriesType: 'line',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 5, y: 0 }],
    };
    const ds2: BasicSeriesSpec = {
      id: getSpecId('ds2'),
      groupId: getGroupId('g1'),
      seriesType: 'line',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 7, y: 0 }],
    };
    const specDataSeries = new Map<SpecId, BasicSeriesSpec>();
    specDataSeries.set(ds1.id, ds1);
    specDataSeries.set(ds2.id, ds2);
    const { xValues } = getSplittedSeries(specDataSeries);
    const mergedDomain = mergeXDomain([
      {
        seriesType: 'line',
        xScaleType: ScaleType.Linear,
      },
    ], xValues);
    expect(mergedDomain.domain).toEqual([0, 7]);
  });
  test('Should merge bar series correctly', () => {
    const ds1: BasicSeriesSpec = {
      id: getSpecId('ds1'),
      groupId: getGroupId('g1'),
      seriesType: 'bar',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 5, y: 0 }],
    };
    const ds2: BasicSeriesSpec = {
      id: getSpecId('ds2'),
      groupId: getGroupId('g1'),
      seriesType: 'bar',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 7, y: 0 }],
    };
    const specDataSeries = new Map<SpecId, BasicSeriesSpec>();
    specDataSeries.set(ds1.id, ds1);
    specDataSeries.set(ds2.id, ds2);
    const { xValues } = getSplittedSeries(specDataSeries);
    const mergedDomain = mergeXDomain([
      {
        seriesType: 'bar',
        xScaleType: ScaleType.Linear,
      },
    ], xValues);
    expect(mergedDomain.domain).toEqual([0, 7]);
  });
  test('Should merge multi bar series correctly', () => {
    const ds1: BasicSeriesSpec = {
      id: getSpecId('ds1'),
      groupId: getGroupId('g1'),
      seriesType: 'bar',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 5, y: 0 }],
    };
    const ds2: BasicSeriesSpec = {
      id: getSpecId('ds2'),
      groupId: getGroupId('g2'),
      seriesType: 'bar',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 7, y: 0 }],
    };
    const specDataSeries = new Map<SpecId, BasicSeriesSpec>();
    specDataSeries.set(ds1.id, ds1);
    specDataSeries.set(ds2.id, ds2);
    const { xValues } = getSplittedSeries(specDataSeries);
    const mergedDomain = mergeXDomain([
      {
        seriesType: 'bar',
        xScaleType: ScaleType.Linear,
      },
      {
        seriesType: 'bar',
        xScaleType: ScaleType.Linear,
      },
    ], xValues);
    expect(mergedDomain.domain).toEqual([0, 7]);
  });
  test('Should merge multi bar series correctly', () => {
    const ds1: BasicSeriesSpec = {
      id: getSpecId('ds1'),
      groupId: getGroupId('g1'),
      seriesType: 'bar',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 5, y: 0 }],
    };
    const ds2: BasicSeriesSpec = {
      id: getSpecId('ds2'),
      groupId: getGroupId('g2'),
      seriesType: 'bar',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 7, y: 0 }],
    };
    const specDataSeries = new Map<SpecId, BasicSeriesSpec>();
    specDataSeries.set(ds1.id, ds1);
    specDataSeries.set(ds2.id, ds2);
    const { xValues } = getSplittedSeries(specDataSeries);
    const mergedDomain = mergeXDomain([
      {
        seriesType: 'bar',
        xScaleType: ScaleType.Time,
      },
      {
        seriesType: 'bar',
        xScaleType: ScaleType.Time,
      },
    ], xValues);
    expect(mergedDomain.domain).toEqual([0, 7]);
  });
  test('Should merge multi bar linear/bar ordinal series correctly', () => {
    const ds1: BasicSeriesSpec = {
      id: getSpecId('ds1'),
      groupId: getGroupId('g1'),
      seriesType: 'bar',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 5, y: 0 }],
    };
    const ds2: BasicSeriesSpec = {
      id: getSpecId('ds2'),
      groupId: getGroupId('g2'),
      seriesType: 'bar',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Ordinal,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 7, y: 0 }],
    };
    const specDataSeries = new Map<SpecId, BasicSeriesSpec>();
    specDataSeries.set(ds1.id, ds1);
    specDataSeries.set(ds2.id, ds2);
    const { xValues } = getSplittedSeries(specDataSeries);
    const mergedDomain = mergeXDomain([
      {
        seriesType: 'bar',
        xScaleType: ScaleType.Linear,
      },
      {
        seriesType: 'bar',
        xScaleType: ScaleType.Ordinal,
      },
    ], xValues);
    expect(mergedDomain.domain).toEqual([0, 1, 2, 5, 7]);
  });
  test('Should merge multi bar/line ordinal series correctly', () => {
    const ds1: BasicSeriesSpec = {
      id: getSpecId('ds1'),
      groupId: getGroupId('g1'),
      seriesType: 'bar',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 5, y: 0 }],
    };
    const ds2: BasicSeriesSpec = {
      id: getSpecId('ds2'),
      groupId: getGroupId('g2'),
      seriesType: 'line',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Ordinal,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 7, y: 0 }],
    };
    const specDataSeries = new Map<SpecId, BasicSeriesSpec>();
    specDataSeries.set(ds1.id, ds1);
    specDataSeries.set(ds2.id, ds2);
    const { xValues } = getSplittedSeries(specDataSeries);
    const mergedDomain = mergeXDomain([
      {
        seriesType: 'bar',
        xScaleType: ScaleType.Linear,
      },
      {
        seriesType: 'line',
        xScaleType: ScaleType.Ordinal,
      },
    ], xValues);
    expect(mergedDomain.domain).toEqual([0, 1, 2, 5, 7]);
  });
  test('Should merge multi bar/line time series correctly', () => {
    const ds1: BasicSeriesSpec = {
      id: getSpecId('ds1'),
      groupId: getGroupId('g1'),
      seriesType: 'bar',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 5, y: 0 }],
    };
    const ds2: BasicSeriesSpec = {
      id: getSpecId('ds2'),
      groupId: getGroupId('g2'),
      seriesType: 'line',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Time,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 7, y: 0 }],
    };
    const specDataSeries = new Map<SpecId, BasicSeriesSpec>();
    specDataSeries.set(ds1.id, ds1);
    specDataSeries.set(ds2.id, ds2);
    const { xValues } = getSplittedSeries(specDataSeries);
    const mergedDomain = mergeXDomain([
      {
        seriesType: 'bar',
        xScaleType: ScaleType.Ordinal,
      },
      {
        seriesType: 'line',
        xScaleType: ScaleType.Time,
      },
    ], xValues);
    expect(mergedDomain.domain).toEqual([0, 1, 2, 5, 7]);
  });
  test('Should merge multi lines series correctly', () => {
    const ds1: BasicSeriesSpec = {
      id: getSpecId('ds1'),
      groupId: getGroupId('g1'),
      seriesType: 'line',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Ordinal,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 5, y: 0 }],
    };
    const ds2: BasicSeriesSpec = {
      id: getSpecId('ds2'),
      groupId: getGroupId('g2'),
      seriesType: 'line',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 7, y: 0 }],
    };
    const specDataSeries = new Map<SpecId, BasicSeriesSpec>();
    specDataSeries.set(ds1.id, ds1);
    specDataSeries.set(ds2.id, ds2);
    const { xValues } = getSplittedSeries(specDataSeries);
    const mergedDomain = mergeXDomain( [
      {
        seriesType: 'line',
        xScaleType: ScaleType.Ordinal,
      },
      {
        seriesType: 'line',
        xScaleType: ScaleType.Linear,
      },
    ], xValues);
    expect(mergedDomain.domain).toEqual([0, 1, 2, 5, 7]);
  });
  test('Should merge multi lines log/linear series correctly', () => {
    const ds1: BasicSeriesSpec = {
      id: getSpecId('ds1'),
      groupId: getGroupId('g1'),
      seriesType: 'line',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Log,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 5, y: 0 }],
    };
    const ds2: BasicSeriesSpec = {
      id: getSpecId('ds2'),
      groupId: getGroupId('g2'),
      seriesType: 'line',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: [{ x: 0, y: 0 }, { x: 7, y: 0 }],
    };
    const specDataSeries = new Map<SpecId, BasicSeriesSpec>();
    specDataSeries.set(ds1.id, ds1);
    specDataSeries.set(ds2.id, ds2);
    const { xValues } = getSplittedSeries(specDataSeries);
    const mergedDomain = mergeXDomain( [
      {
        seriesType: 'line',
        xScaleType: ScaleType.Log,
      },
      {
        seriesType: 'line',
        xScaleType: ScaleType.Linear,
      },
    ], xValues);
    expect(mergedDomain.domain).toEqual([0, 7]);
  });

  test('Should merge X multi high volume of data', () => {
    const maxValues = 10000;
    const ds1: BasicSeriesSpec = {
      id: getSpecId('ds1'),
      groupId: getGroupId('g1'),
      seriesType: 'line',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Log,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: new Array(maxValues).fill(0).map((d, i) => ({ x: i, y: i })),
    };
    const ds2: BasicSeriesSpec = {
      id: getSpecId('ds2'),
      groupId: getGroupId('g2'),
      seriesType: 'line',
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      data: new Array(maxValues).fill(0).map((d, i) => ({ x: i, y: i })),
    };
    const specDataSeries = new Map<SpecId, BasicSeriesSpec>();
    specDataSeries.set(ds1.id, ds1);
    specDataSeries.set(ds2.id, ds2);
    const { xValues } = getSplittedSeries(specDataSeries);
    const mergedDomain = mergeXDomain([
      {
        seriesType: 'area',
        xScaleType: ScaleType.Linear,
        xDomain: [0, 10],
      },
      {
        seriesType: 'line',
        xScaleType: ScaleType.Ordinal,
      },
    ], xValues);
    expect(mergedDomain.domain.length).toEqual(maxValues);
  });

});

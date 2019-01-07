import { ColorConfig } from '../themes/theme';
import { Accessor } from '../utils/accessor';
import { GroupId, SpecId } from '../utils/ids';
import { splitSpecsByGroupId, YBasicSeriesSpec } from './domains/y_domain';
import { BasicSeriesSpec, Datum, SeriesAccessors } from './specs';

export interface RawDataSeriesDatum {
  x: number | string;
  y: number;
  datum?: any;
}

export interface DataSeriesDatum {
  x: number | string;
  y0: number;
  y1: number;
  datum?: any;
}

export interface DataSeries {
  specId: SpecId;
  key: any[];
  seriesColorKey: string;
  data: DataSeriesDatum[];
}
export interface RawDataSeries {
  specId: SpecId;
  key: any[];
  seriesColorKey: string;
  data: RawDataSeriesDatum[];
}

export interface FormattedDataSeries {
  groupId: GroupId;
  dataSeries: DataSeries[];
  counts: DataSeriesCounts;
}

export interface DataSeriesCounts {
  barSeries: number;
  lineSeries: number;
  areaSeries: number;
  basicSeries: number;
}

export interface DataSeriesColorsValues {
  specId: SpecId;
  colorValues: any[];
}

/**
 * Split a dataset into multiple series, each having a key with the relative
 * series configuration
 */
export function splitSeries(
  data: Datum[],
  accessors: SeriesAccessors,
  specId: SpecId,
): {
  rawDataSeries: RawDataSeries[];
  colorsValues: Map<string, any[]>;
  xValues: Set<any>;
} {
  const { xAccessor, yAccessors, splitSeriesAccessors = [] } = accessors;
  const colorAccessors = accessors.colorAccessors ? accessors.colorAccessors : splitSeriesAccessors;
  const isMultipleY = yAccessors && yAccessors.length > 1;
  const series = new Map<string, RawDataSeries>();
  const colorsValues = new Map<string, any[]>();
  const xValues = new Set<any>();
  data.forEach((datum) => {
    const seriesKey = getAccessorsValues(datum, splitSeriesAccessors);
    if (isMultipleY) {
      yAccessors.forEach((accessor) => {
        const colorValues = getColorValues(datum, colorAccessors, accessor);
        const colorValuesKey = getColorValuesAsString(colorValues, specId);
        colorsValues.set(colorValuesKey, colorValues);
        const cleanedDatum = cleanDatum(datum, xAccessor, accessor);
        xValues.add(cleanedDatum.x);
        updateSeriesMap(series, [...seriesKey, accessor], cleanedDatum, specId, colorValuesKey);
      }, {});
    } else {
      const colorValues = getColorValues(datum, colorAccessors);
      const colorValuesKey = getColorValuesAsString(colorValues, specId);
      colorsValues.set(colorValuesKey, colorValues);
      const cleanedDatum = cleanDatum(datum, xAccessor, yAccessors[0]);
      xValues.add(cleanedDatum.x);
      updateSeriesMap(series, [...seriesKey], cleanedDatum, specId, colorValuesKey);
    }
  }, {});
  return {
    rawDataSeries: [...series.values()],
    colorsValues,
    xValues,
  };
}

/**
 * Mutate the passed map adding or updating the DataSeries stored
 * along with the series key
 */
function updateSeriesMap(
  seriesMap: Map<string, RawDataSeries>,
  seriesKey: any[],
  datum: RawDataSeriesDatum,
  specId: SpecId,
  seriesColorKey: string,
): Map<string, RawDataSeries> {
  const seriesKeyString = seriesKey.join('___');
  const series = seriesMap.get(seriesKeyString);
  if (series) {
    series.data.push(datum);
  } else {
    seriesMap.set(seriesKeyString, {
      specId,
      seriesColorKey,
      key: seriesKey,
      data: [datum],
    });
  }
  return seriesMap;
}

/**
 * Get the array of values that forms a series key
 */
function getAccessorsValues(datum: Datum, accessors: Accessor[] = []): any[] {
  return accessors.map((accessor) => {
    return datum[accessor];
  });
}

/**
 * Get the array of values that forms a series key
 */
function getColorValues(
  datum: Datum,
  colorAccessors: Accessor[] = [],
  yAccessorValue?: any,
): any[] {
  const colorValues = getAccessorsValues(datum, colorAccessors);
  if (yAccessorValue) {
    return [...colorValues, yAccessorValue];
  }
  return colorValues;
}
/**
 * Get the array of values that forms a series key
 */
function getColorValuesAsString(
  colorValues: any[],
  specId: SpecId,
): string {
  return `specId:{${specId}},colors:{${colorValues}}`;
}

/**
 * Reformat the datum having only the required x and y property.
 */
function cleanDatum(datum: Datum, xAccessor: Accessor, yAccessor: Accessor): RawDataSeriesDatum {
  const x = datum[xAccessor];
  const y = datum[yAccessor];
  return { x, y, datum };
}

// TODO MISSING SCALE TO EXTENT
export function getFormattedDataseries(
  specs: YBasicSeriesSpec[],
  dataSeries: Map<SpecId, RawDataSeries[]>,
): {
  stacked: FormattedDataSeries[];
  nonStacked: FormattedDataSeries[];
} {
  const specsByGroupIds = splitSpecsByGroupId(specs);
  const specsByGroupIdsEntries = [...specsByGroupIds.entries()];

  const stackedFormattedDataSeries: Array<{
    groupId: GroupId;
    dataSeries: DataSeries[];
    counts: DataSeriesCounts;
  }> = [];
  const nonStackedFormattedDataSeries: Array<{
    groupId: GroupId;
    dataSeries: DataSeries[];
    counts: DataSeriesCounts;
  }> = [];

  specsByGroupIdsEntries.forEach(([groupId, groupSpecs]) => {
    // format stacked data series
    const stackedDataSeries = getRawDataSeries(groupSpecs.stacked, dataSeries);
    stackedFormattedDataSeries.push({
      groupId,
      counts: stackedDataSeries.counts,
      dataSeries: formatStackedDataSeriesValues(stackedDataSeries.rawDataSeries, false),
    });

    // format non stacked data series
    const nonStackedDataSeries = getRawDataSeries(groupSpecs.nonStacked, dataSeries);
    nonStackedFormattedDataSeries.push({
      groupId,
      counts: nonStackedDataSeries.counts,
      dataSeries: formatNonStackedDataSeriesValues(nonStackedDataSeries.rawDataSeries, false),
    });
  });
  return {
    stacked: stackedFormattedDataSeries.filter((ds) => ds.dataSeries.length > 0),
    nonStacked: nonStackedFormattedDataSeries.filter((ds) => ds.dataSeries.length > 0),
  };
}

export function getRawDataSeries(
  seriesSpecs: YBasicSeriesSpec[],
  dataSeries: Map<SpecId, RawDataSeries[]>,
): {
  rawDataSeries: RawDataSeries[];
  counts: DataSeriesCounts;
} {
  const rawDataSeries: RawDataSeries[] = [];
  const counts = {
    barSeries: 0,
    lineSeries: 0,
    areaSeries: 0,
    basicSeries: 0,
  };
  const seriesSpecsCount = seriesSpecs.length;
  let i;
  for (i = 0; i < seriesSpecsCount; i++) {
    const spec = seriesSpecs[i];
    const { id, seriesType } = spec;
    const ds = dataSeries.get(id);
    switch (seriesType) {
      case 'bar':
        counts.barSeries += ds ? ds.length : 0;
        break;
      case 'line':
        counts.lineSeries += ds ? ds.length : 0;
        break;
      case 'area':
        counts.areaSeries += ds ? ds.length : 0;
        break;
      case 'basic':
        counts.basicSeries += ds ? ds.length : 0;
        break;
    }

    if (ds) {
      rawDataSeries.push(...ds);
    }
  }
  return {
    rawDataSeries,
    counts,
  };
}

export function formatNonStackedDataSeriesValues(
  dataseries: RawDataSeries[],
  scaleToExtent: boolean,
): DataSeries[] {
  const len = dataseries.length;
  let i;
  const formattedValues: DataSeries[] = [];
  for (i = 0; i < len; i++) {
    const formattedValue = formatNonStackedDataValues(dataseries[i], scaleToExtent);
    formattedValues.push(formattedValue);
  }
  return formattedValues;
}

export function formatNonStackedDataValues(
  dataSeries: RawDataSeries,
  scaleToExtent: boolean,
): DataSeries {
  const len = dataSeries.data.length;
  let i;
  const formattedValues: DataSeries = {
    key: dataSeries.key,
    specId: dataSeries.specId,
    seriesColorKey: dataSeries.seriesColorKey,
    data: [],
  };
  for (i = 0; i < len; i++) {
    const value = dataSeries.data[i];
    const formattedValue = {
      x: value.x,
      y0: scaleToExtent ? value.y : 0,
      y1: value.y,
      datum: value.datum,
    };
    formattedValues.data.push(formattedValue);
  }
  return formattedValues;
}

export function formatStackedDataSeriesValues(
  dataseries: RawDataSeries[],
  scaleToExtent: boolean,
): DataSeries[] {
  const stackMap = new Map<any, number[]>();
  dataseries.forEach((ds, index) => {
    ds.data.forEach((datum) => {
      const stack = stackMap.get(datum.x) || new Array(dataseries.length).fill(0);
      stack[index] = datum.y;
      stackMap.set(datum.x, stack);
    });
  });
  const stackedValues = new Map<any, number[]>();
  stackMap.forEach((value, key) => {
    const stackArray = value.reduce(
      (stackedValue, currentValue, index) => {
        if (stackedValue.length === 0) {
          if (scaleToExtent) {
            return [currentValue, currentValue];
          }
          return [0, currentValue];
        }
        return [...stackedValue, stackedValue[index] + currentValue];
      },
      [] as number[],
    );
    stackedValues.set(key, stackArray);
  });

  const stackedDataSeries: DataSeries[] = dataseries.map((ds, index) => {
    const newData = ds.data.filter((datum) => stackedValues.get(datum.x) !== undefined).map((datum) => {
      const stack = stackedValues.get(datum.x)!;
      if (index === 0) {
        return { x: datum.x, y0: scaleToExtent ? datum.y : 0, y1: datum.y, datum: datum.datum };
      } else {
        return { x: datum.x, y0: stack[index], y1: stack[index] + datum.y, datum: datum.datum };
      }
    });
    return {
      specId: ds.specId,
      key: ds.key,
      seriesColorKey: ds.seriesColorKey,
      data: newData,
    };
  });

  return stackedDataSeries;
}

export function getSplittedSeries(
  seriesSpecs: Map<SpecId, BasicSeriesSpec>,
): {
  splittedSeries: Map<SpecId, RawDataSeries[]>;
  seriesColors: Map<string, DataSeriesColorsValues>;
  xValues: Set<any>;
} {
  const splittedSeries = new Map<SpecId, RawDataSeries[]>();
  const seriesColors = new Map<string, DataSeriesColorsValues>();
  const xValues: Set<any> = new Set();
  for (const [specId, spec] of seriesSpecs) {
    const dataSeries = splitSeries(spec.data, spec, specId);
    splittedSeries.set(specId, dataSeries.rawDataSeries);
    dataSeries.colorsValues.forEach((colorValues, key) => {
      seriesColors.set(key, {
        specId,
        colorValues,
      });
    });
    for (const xValue of dataSeries.xValues) {
      xValues.add(xValue);
    }
  }
  return {
    splittedSeries,
    seriesColors,
    xValues,
  };
}

export function getSeriesColorMap(
  seriesColors: Map<string, DataSeriesColorsValues>,
  chartColors: ColorConfig,
): Map<string, string> {
  const seriesColorMap = new Map<string, string>();
  let counter = 0;
  seriesColors.forEach((value, seriesColorKey) => {
    seriesColorMap.set(seriesColorKey, chartColors.vizColors[counter % chartColors.vizColors.length]);
    counter++;
  });
  return seriesColorMap;
}

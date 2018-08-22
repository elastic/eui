import { computeDataDomain } from '../commons/domain';
import { DataSeriesSpec, SeriesDomains, SeriesScales } from '../commons/specs';

export function computeSeriesDomains(seriesSpec: DataSeriesSpec): SeriesDomains {
  const { xScaleType, yScaleType, xAccessor, yAccessor, data } = seriesSpec;
  const xDomain = computeDataDomain(data, xAccessor, xScaleType);
  const yDomain = computeDataDomain(data, yAccessor, yScaleType);
  return {
    xDomain,
    yDomain,
  };
}

/**
 * Merge passed domain into a multidomain. If save scaletype is available,
 * then the merge is on the same scale type, if not ordinal scale type is used
 * @return [description]
 */
export function mergeGlobalDomains(currentSeriesScales: SeriesScales, seriesScales: SeriesScales) {
  // TODO
}

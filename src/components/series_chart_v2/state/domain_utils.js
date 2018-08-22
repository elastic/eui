import { sortedUniq, uniq } from 'lodash';
import { extent } from 'd3-array';

export function computeScaleConfigs(data, spec) {
  const { xAccessor, yAccessor, xScaleType, yScaleType } = spec;

  if (typeof xAccessor === Array) {
    xAccessor.map(accessor => {
      return {
        ...computeScaleConfig(data, accessor, 'ordinal'),
        clusterType: 'group',
        accessor: xAccessor,
      };
    });
  } else {
    const scaleConfig = {
      x: {
        ...computeScaleConfig(data, xAccessor, xScaleType),
        clusterType: 'none',
        accessor: xAccessor,
      },
      y: {
        ...computeScaleConfig(data, yAccessor, yScaleType),
        clusterType: 'none',
        accessor: yAccessor,
      },
    };
    return scaleConfig;
  }
  return {};
}
export function computeScaleConfig(data, accessor, scaleType, sorted) {
  if (scaleType === 'ordinal') {
    const domain = data.map(accessor);
    return {
      domain: sorted ? sortedUniq(domain) : uniq(domain),
      scaleType,
    };
  }
  return {
    domain: extent(data, accessor),
    scaleType,
  };
}

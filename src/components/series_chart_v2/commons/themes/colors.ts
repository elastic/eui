import { Accessor } from '../utils/accessor';
import { ColorDomain } from '../utils/domain';
import { ColorConfig } from './theme';

export interface ColorScales {
  [key: string]: string;
}
export function computeColorScales(colorDomain: ColorDomain, chartColors: ColorConfig): ColorScales {
  return colorDomain.domain.reduce(
    (acc, domainKey, index) => {
      acc[domainKey] = chartColors.vizColors[index % chartColors.vizColors.length];
      return acc;
    },
    {} as ColorScales,
  );
}

export type GetColorFn = (datum: any, yAccessor?: Accessor) => string;

export function getColor(
  chartColors: ColorConfig,
  colorScales: ColorScales,
  colorAccessors: Accessor[],
): GetColorFn {
  return (datum: any, yAccessor?: Accessor) => {
    const key = getColorKey(datum, colorAccessors, yAccessor);
    return colorScales[key] || chartColors.defaultVizColor;
  };
}

export function getColorKey(datum: any, colorAccessors: Accessor[], yAccessor?: Accessor) {
  return [...colorAccessors.map((accessor) => String(datum[accessor])), yAccessor]
    .filter((value) => value)
    .join('--');
}

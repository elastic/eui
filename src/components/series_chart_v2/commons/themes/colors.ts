import { Accessor } from '../data_ops/accessor';
import { ColorDomain } from '../data_ops/domain';
import { Theme } from './theme';

export interface ColorScales {
  [key: string]: string;
}
export function computeColorScales(colorDomain: ColorDomain, theme: Theme): ColorScales {
  return colorDomain.domain.reduce(
    (acc, domainKey, index) => {
      acc[domainKey] = theme.vizColors[index % theme.vizColors.length];
      return acc;
    },
    {} as ColorScales,
  );
}

export type GetColorFn = (datum: any, yAccessor?: Accessor) => string;

export function getColor(
  theme: Theme,
  colorScales: ColorScales,
  colorAccessors: Accessor[],
): GetColorFn {
  return (datum: any, yAccessor?: Accessor) => {
    const key = getColorKey(datum, colorAccessors, yAccessor);
    return colorScales[key] || theme.defaultVizColor;
  };
}

export function getColorKey(datum: any, colorAccessors: Accessor[], yAccessor?: Accessor) {
  return [...colorAccessors.map((accessor) => String(datum[accessor])), yAccessor]
    .filter((value) => value)
    .join('--');
}

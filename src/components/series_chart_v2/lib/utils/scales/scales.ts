import { ScaleBand } from './scale_band';
import { ScaleContinuous } from './scale_continuous';

export interface Scale {
  domain: any[];
  range: number[];
  ticks: () => any[];
  scale: (value: any) => number;
  bandwidth: number;
}
export type ScaleFunction = (value: any) => number;

export const enum ScaleType {
  Linear = 'linear',
  Ordinal = 'ordinal',
  Log = 'log',
  Sqrt = 'sqrt',
}

export interface ScaleConfig {
  accessor: (value: any) => any;
  domain: any[];
  type: ScaleType;
  clamp?: boolean;
}

export type ScaleContinuousTypes = ScaleType.Linear | ScaleType.Sqrt | ScaleType.Log;
export type ScaleOrdinalTypes = ScaleType.Ordinal;
export type ScaleTypes = ScaleContinuousTypes | ScaleOrdinalTypes;

/**
 * Return a continuous scale
 * @param type The type of scale (linear, log, sqrt)
 * @param domain The domain of the ordinal scale
 * @param minRange The max range of the scale
 * @param maxRange The min range of the scale
 * @param clamp if true, create a clamped scale
 */
export function createContinuousScale(
  type: ScaleContinuousTypes,
  domain: number[],
  minRange: number,
  maxRange: number,
  clamp = false,
): Scale {
  return new ScaleContinuous(domain, [minRange, maxRange], type, clamp, false);
}

/**
 * Return a ScaleOrdinal
 * @param domain The domain of the ordinal scale
 * @param minRange The max range of the scale
 * @param maxRange The min range of the scale
 */
export function createOrdinalScale(
  domain: string[],
  minRange: number,
  maxRange: number,
  padding?: number,
): Scale {
  const paddingOption = padding ? [padding, padding] as [number, number] : undefined;
  return new ScaleBand(domain, [minRange, maxRange], paddingOption);
}

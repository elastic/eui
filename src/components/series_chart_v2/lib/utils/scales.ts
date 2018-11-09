import { scaleBand, ScaleContinuousNumeric, scaleLinear, scaleLog, scaleSqrt } from 'd3-scale';
import { Datum } from '../series/specs';
import { AccessorFn } from './accessor';

export type ScaleFn = (datum: Datum) => number;

export const enum ScaleType {
  Linear = 'linear',
  Ordinal = 'ordinal',
  Log = 'log',
  Sqrt = 'sqrt',
}

const SCALES = {
  [ScaleType.Linear]: scaleLinear,
  [ScaleType.Log]: scaleLog,
  [ScaleType.Sqrt]: scaleSqrt,
};

export interface ScaleConfig {
  accessor: (value: any) => any;
  domain: string[] | number[] | [number, number] | [undefined, undefined];
  type: ScaleType;
  clamp?: boolean;
}

export interface ScaleOrdinal {
  (value: string): number;
  domain: (domain?: string[]) => string[] | this;
  range: (range?: [number, number]) => [number, number] | this;
  ticks(): string[];
  bandwidth(): number;
}

export type ScaleContinuousTypes = ScaleType.Linear | ScaleType.Sqrt | ScaleType.Log;
export type ScaleOrdinalTypes = ScaleType.Ordinal;
export type ScaleTypes = ScaleContinuousTypes | ScaleOrdinalTypes;

export type ScaleFunction = (value: Datum) => any;

function buildOrdinalScale(padding = 0): ScaleOrdinal {
  const d3ScaleBand = scaleBand()
    .paddingInner(padding)
    .paddingOuter(0)
    .round(false);
  const scale = (value: string) => {
    return Number(d3ScaleBand(value));
  };
  const ordinalScale = scale as ScaleOrdinal;
  ordinalScale.domain = (domain?: string[]): string[] | ScaleOrdinal => {
    if (domain) {
      d3ScaleBand.domain(domain);
      return ordinalScale;
    }
    return d3ScaleBand.domain();
  };
  ordinalScale.range = (range?: [number, number]) => {
    if (range) {
      d3ScaleBand.range(range);
      return ordinalScale;
    }
    return d3ScaleBand.range();
  };
  ordinalScale.ticks = (): string[] => {
    return d3ScaleBand.domain();
  };
  ordinalScale.bandwidth = (): number => {
    return d3ScaleBand.bandwidth();
  };
  return ordinalScale;
}

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
): ScaleContinuousNumeric<number, number> {
  const scale = SCALES[type]();
  scale.domain(domain);
  scale.range([minRange, maxRange]);
  scale.clamp(clamp);
  return scale;
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
): ScaleOrdinal {
  const scale = buildOrdinalScale(padding);
  scale.domain(domain);
  scale.range([minRange, maxRange]);
  return scale;
}

/**
 * Instanciate an ordinal scale function
 * @param scale The ordinal Scale
 * @param accessor The datum accessor function
 * @returns {ScaleFunction} The ScaleFunction
 */
export function getOrdinalScaleFn(
  scale: ScaleOrdinal,
  accessor: AccessorFn,
  centering = false,
): ScaleFunction {
  return (point: any) => {
    return scale(accessor(point)) + (centering ? scale.bandwidth() / 2 : 0);
  };
}

/**
 * Instanciate an continuous scale function
 * @param type {ScaleContinuousTypes} The type of continuous scale
 * @param domain The domain of the scale
 * @param accessor The accessor of the datum
 * @param minRange The min range of the scale
 * @param maxRange The max range of the scale
 * @param clamp if true, create a clamped scale
 */
export function getContinuousScaleFn(
  type: ScaleContinuousTypes,
  domain: number[],
  accessor: (point: any) => any,
  minRange: number,
  maxRange: number,
  clamp: boolean = false,
): ScaleFunction {
  const scale = createContinuousScale(type, domain, minRange, maxRange, clamp);
  return (point: any) => {
    return scale(accessor(point));
  };
}

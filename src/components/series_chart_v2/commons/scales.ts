import { scaleBand, ScaleContinuousNumeric, scaleLinear, scaleLog, scaleSqrt } from 'd3-scale';

export type ScaleFunction = (point: any) => number;

export const enum ScaleType {
  Linear = 'linear',
  Ordinal = 'ordinal',
  Log = 'log',
  Sqrt = 'sqrt',
}

export const SCALES = {
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
  domain(domain?: string[]): string[] | this;
  range(range?: [number, number]): [number, number] | this;
  ticks(): string[];
  bandwidth(): number;
}

export function createScaleOrdinal(): ScaleOrdinal {
  const d3ScaleBand = scaleBand();
  const scale = (value: string) => {
    return Number(d3ScaleBand(value)) + (d3ScaleBand.bandwidth() / 2);
  };
  const ordinalScale = scale as ScaleOrdinal;
  ordinalScale.domain = (domain?: string[]): string[] | ScaleOrdinal => {
    if (domain) {
      d3ScaleBand.domain(domain);
      return ordinalScale;
    }
    return d3ScaleBand.domain();
  };
  ordinalScale.range = (range: [number, number]) => {
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

type Scales = ScaleContinuousNumeric<number, number> | ScaleOrdinal;
export type ScaleContinuousTypes = ScaleType.Linear | ScaleType.Sqrt | ScaleType.Log;
export type ScaleOrdinalTypes =  ScaleType.Ordinal;
export type ScaleTypes = ScaleContinuousTypes | ScaleOrdinalTypes;

export function getScaleFromType(type: ScaleContinuousTypes): ScaleContinuousNumeric<number, number>;
export function getScaleFromType(type: ScaleOrdinalTypes): ScaleOrdinal;
export function getScaleFromType(type: ScaleTypes): Scales {
  // TODO add clamping
  if (type === ScaleType.Ordinal) {
    return createScaleOrdinal();
  }
  return SCALES[type]();
}

/**
 *
 * @param type {ScaleContinuousTypes} The type of continuous scale
 * @param domain The domain of the scale
 * @param accessor The accessor of the datum
 * @param minRange The min range of the scale
 * @param maxRange The max range of the scale
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

export function createContinuousScale(
  type: ScaleContinuousTypes,
  domain: number[],
  minRange: number,
  maxRange: number,
  clamp: boolean = false,
): ScaleContinuousNumeric<number, number> {
  const scale = getScaleFromType(type);
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
): ScaleOrdinal {
  const scale = getScaleFromType(ScaleType.Ordinal);
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
  accessor: (point: any) => any,
): ScaleFunction {
  return (point: any) => {
    return scale(accessor(point));
  };
}

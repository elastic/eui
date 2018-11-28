import { scaleLinear, scaleLog, scaleSqrt } from 'd3-scale';
import { ScaleContinuousTypes, ScaleType } from './scales';
import { Scale } from './scales';

const SCALES = {
  [ScaleType.Linear]: scaleLinear,
  [ScaleType.Log]: scaleLog,
  [ScaleType.Sqrt]: scaleSqrt,
};

export class ScaleContinuous implements Scale {
  public readonly bandwidth: number;
  public readonly step: number;
  public readonly type: ScaleType;
  public readonly domain: any[];
  public readonly range: number[];
  private readonly d3Scale: any;

  constructor(
    domain: any[],
    range: [number, number],
    type: ScaleContinuousTypes,
    clamp?: boolean,
    round?: boolean,
  ) {
    this.d3Scale = SCALES[type]();
    this.d3Scale.domain(domain);
    this.d3Scale.range(range);
    this.d3Scale.clamp(clamp);
    this.d3Scale.nice(round);
    this.bandwidth = 0;
    this.step = 0;
    this.domain = domain;
    this.type = type;
    this.range = range;
  }

  public scale(value: any) {
    return this.d3Scale(value);
  }

  public ticks() {
    return this.d3Scale.ticks();
  }
}

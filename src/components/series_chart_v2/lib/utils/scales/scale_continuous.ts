import { scaleLinear, scaleLog, scaleSqrt, scaleTime } from 'd3-scale';
import { ScaleContinuousType, ScaleType } from './scales';
import { Scale } from './scales';

const SCALES = {
  [ScaleType.Linear]: scaleLinear,
  [ScaleType.Log]: scaleLog,
  [ScaleType.Sqrt]: scaleSqrt,
  [ScaleType.Time]: scaleTime,
};

export class ScaleContinuous implements Scale {
  public readonly bandwidth: number;
  public readonly minInterval: number;
  public readonly step: number;
  public readonly type: ScaleType;
  public readonly domain: any[];
  public readonly range: number[];
  private readonly d3Scale: any;

  constructor(
    domain: any[],
    range: [number, number],
    type: ScaleContinuousType,
    clamp?: boolean,
    bandwidth?: number,
    minInterval?: number,
  ) {
    this.d3Scale = SCALES[type]();
    this.d3Scale.domain(domain);
    this.d3Scale.range(range);
    this.d3Scale.clamp(clamp);
    // this.d3Scale.nice();
    this.bandwidth = bandwidth || 0;
    this.step = 0;
    this.domain = domain;
    this.type = type;
    this.range = range;
    this.minInterval = minInterval || 0;
  }

  public scale(value: any) {
    return this.d3Scale(value);
  }

  public ticks() {
    if (this.minInterval > 0) {
      const intervalCount = (this.domain[1] - this.domain[0]) / this.minInterval;
      return new Array(intervalCount + 1).fill(0).map((d, i) => {
        return this.domain[0] + i * this.minInterval;
      });
    }
    return this.d3Scale.ticks();
  }
}

import { ScaleType } from './scales';
import { Scale } from './scales';

export class ScaleBand implements Scale {
  public readonly bandwidth: number;
  public readonly step: number;
  public readonly type: ScaleType;
  public readonly domain: any[];
  public readonly range: number[];
  private readonly modelDomain: Map<any, any>;
  private readonly modelRange: number[];
  private readonly paddingInner: number;
  private readonly paddingOuter: number;
  private readonly round: boolean;
  private readonly align = 0.5;

  constructor(
    domain: any[],
    range: [number, number],
    padding?: [number, number],
    round?: boolean,
    overrideBandwidth?: number,
  ) {
    this.type = ScaleType.Ordinal;
    this.modelDomain = new Map();
    let domainIndex = 0;
    domain.forEach((value) => {
      if (!this.modelDomain.has(value)) {
        this.modelDomain.set(value, domainIndex);
        domainIndex++;
      }
    });
    if (padding) {
      this.paddingInner = padding[0];
      this.paddingOuter = padding[1];
    } else {
      this.paddingInner = 0;
      this.paddingOuter = 0;
    }
    this.round = round || false;
    const n = this.modelDomain.size;
    let start = range[0];
    const stop = range[1];
    this.step = (stop - start) / Math.max(1, n - this.paddingInner + this.paddingOuter * 2);
    if (this.round) {
      this.step = Math.floor(this.step);
    }
    start += (stop - start - this.step * (n - this.paddingInner)) * this.align;
    this.bandwidth = Math.abs(this.step * (1 - this.paddingInner));
    if (round) {
      start = Math.round(start);
      this.bandwidth = Math.abs(Math.round(this.bandwidth));
      // console.log({round});
    }
    if (overrideBandwidth) {
      this.bandwidth = overrideBandwidth;
      // console.log({overrideBandwidth});
    }
    this.range = range;
    this.modelRange = new Array(n).fill(0).map((val, i) => {
      return start + this.step * i;
    });
    this.domain = [...this.modelDomain.keys()];
  }

  public scale(value: any) {
    const index = this.modelDomain.get(value);
    return this.modelRange[(index) % this.modelRange.length];
  }

  public ticks() {
    return this.domain;
  }
}

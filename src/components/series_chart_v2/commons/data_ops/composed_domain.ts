import { Accessor, getAccessorFn } from './accessor';
import { computeContinuousDataDomain, computeOrdinalDataDomain, Domain } from './domain';
import { createContinuousScale, createOrdinalScale, ScaleType } from './scales';

export class ComposedDomain {
  private dataDomains: Domain[] = [];
  private dataTicks: any[] = [];
  constructor(data: any[], scaleTypes: ScaleType[], accessors: Accessor[], scaleToExtent = false) {
    this.setup(data, scaleTypes, accessors, scaleToExtent);
  }
  public ticks(level: number) {
    if (level >= this.dataTicks.length) {
      throw new Error('Cannot request a tick on a level higher than the number of domains');
    }
    return this.dataTicks[level];
  }
  private setup(data: any[], scaleTypes: ScaleType[], accessors: Accessor[], scaleToExtent = false) {
    this.dataDomains = [];
    this.dataTicks = [];
    accessors.forEach((accessor, index) => {
      const scaleType = scaleTypes[index];
      let domain;
      let ticks;
      if (scaleType === ScaleType.Ordinal) {
        domain = computeOrdinalDataDomain(data, getAccessorFn(accessor), true);
        const scale = createOrdinalScale(domain as string[], 1, 0);
        ticks = scale.ticks();
      } else {
        domain = computeContinuousDataDomain(data, getAccessorFn(accessor), scaleToExtent);
        const scale = createContinuousScale(scaleType, domain as number[], 1, 0);
        ticks = scale.ticks();
      }
      this.dataDomains.push(domain);
      if (index === 0) {
        this.dataTicks.push(ticks);
      } else {
        const prevTicks = this.dataTicks[index - 1];
        const domainTicks = new Array(prevTicks.length).fill(ticks);
        const concatTicks = Array.prototype.concat(...domainTicks);
        this.dataTicks.push(concatTicks);
      }
    });
  }
}

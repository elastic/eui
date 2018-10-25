import { none, Option, some } from 'fp-ts/lib/Option';
import { uniq } from 'lodash';
import { ColorDomain, SpecDomain, SpecDomains } from '../../utils/domain';
import { ScaleType } from '../../utils/scales';

export function mergeDomains(globalDomains: SpecDomains, specDomains: SpecDomains): SpecDomains {
  const otherLevelGlobalXDomain = globalDomains.xDomains.filter((levelDomain) => levelDomain.level !== 0);
  const level0GlobalXDomain = globalDomains.xDomains.find((levelDomain) => levelDomain.level === 0);
  const level0SpecXDomain = specDomains.xDomains.find((levelDomain) => levelDomain.level === 0);

  const xDomains: SpecDomain[] = extendDomainSpecs(level0GlobalXDomain, level0SpecXDomain)
    .fold(
      otherLevelGlobalXDomain,
      (expendedDomain) => {
        return [expendedDomain, ...otherLevelGlobalXDomain];
      },
    );
  const yDomain = extendDomainSpecs(globalDomains.yDomain, specDomains.yDomain)
    .fold(
      globalDomains.yDomain,
      (extendedDomain) => {
        return extendedDomain;
      },
    );
  const colorDomain = extendDomainColors(globalDomains.colorDomain, specDomains.colorDomain)
    .fold(
      globalDomains.colorDomain,
      (extendedDomain) => {
        return extendedDomain;
      },
    );

  return {
    xDomains,
    yDomain,
    colorDomain,
  };
}

function extendDomainSpecs(
  existingDomain: SpecDomain | undefined,
  currentDomain: SpecDomain | undefined,
  ): Option<SpecDomain> {
  if (existingDomain !== undefined && currentDomain !== undefined) {
    return extendSpecDomain(existingDomain, currentDomain);
  }
  if (existingDomain !== undefined) {
    return some(existingDomain);
  }
  if (currentDomain !== undefined) {
    return some(currentDomain);
  }
  return none;
}
function extendDomainColors(
  existingDomain: ColorDomain | undefined,
  currentDomain: ColorDomain | undefined,
  ): Option<ColorDomain> {
  if (existingDomain !== undefined && currentDomain !== undefined) {
    return extendColorDomain(existingDomain, currentDomain);
  }
  if (existingDomain !== undefined) {
    return some(existingDomain);
  }
  if (currentDomain !== undefined) {
    return some(currentDomain);
  }
  return none;
}

function extendSpecDomain(
  existingDomain: SpecDomain,
  currentDomain: SpecDomain,
  ): Option<SpecDomain> {
  if (existingDomain.level !== currentDomain.level) {
    return none;
  }
  if (existingDomain.scaleType !== currentDomain.scaleType) {
    return none;
  }
  if (existingDomain.scaleType === ScaleType.Linear) {
    const mainDomain = existingDomain.domain as [number, number];
    const iterationDomain = currentDomain.domain as [number, number];
    return some<SpecDomain>({
      ...currentDomain,
      domain: extendLinearDomain(mainDomain, iterationDomain),
    });
  } else {
    const mainDomain = existingDomain.domain as string[];
    const iterationDomain = currentDomain.domain as string[];
    return some<SpecDomain>({
      ...currentDomain,
      domain: extendOrdinalDomain(mainDomain, iterationDomain),
    });
  }
}

function extendColorDomain(
  existingDomain: ColorDomain,
  currentDomain: ColorDomain,
  ): Option<ColorDomain> {
    return some<ColorDomain>({
      ...existingDomain,
      domain: extendOrdinalDomain(existingDomain.domain, currentDomain.domain),
    });
}

function extendLinearDomain(domainA: [number, number], domainB: [number, number]): [number, number] {
  const min = Math.min(domainA[0], domainB[0]);
  const max = Math.max(domainA[1], domainB[1]);
  return [min, max];
}

function extendOrdinalDomain<T>(domainA: T[], domainB: T[]): T[] {
  return uniq(domainA.concat(domainB)).sort();
}

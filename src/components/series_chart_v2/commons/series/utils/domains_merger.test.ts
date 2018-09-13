import { ScaleType } from '../../scales';
import { SpecDomains } from '../bars/domains';
import { mergeDomains } from './domains_merger';

describe('Domains merger', () => {
  test('Should merge two 1Y domains', () => {
    const domain1: SpecDomains = {
      x: [
        {
          level: 0,
          domain: [0, 3],
          scaleType: ScaleType.Linear,
        },
      ],
      y: [
        {
          level: 0,
          domain: [0, 15],
          scaleType: ScaleType.Linear,
        },
      ],
    };
    const domain2: SpecDomains = {
      x: [
        {
          level: 0,
          domain: [1, 6],
          scaleType: ScaleType.Linear,
        },
      ],
      y: [
        {
          level: 0,
          domain: [0, 50],
          scaleType: ScaleType.Linear,
        },
      ],
    };
    const mergedDomain = mergeDomains([ domain1, domain2 ]);
    const expectedDomain: SpecDomains = {
      x: [
        {
          level: 0,
          domain: [0, 6],
          scaleType: ScaleType.Linear,
        },
      ],
      y: [
        {
          level: 0,
          domain: [0, 50],
          scaleType: ScaleType.Linear,
        },
      ],
    };
    expect(mergedDomain).toEqual(expectedDomain);
  });
});

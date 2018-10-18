import { SpecDomains } from '../../data_ops/domain';
import { ScaleType } from '../../data_ops/scales';
import { mergeDomains } from './domains_merger';

describe('Domains merger', () => {
  test('Should merge linear domains', () => {
    const domain1: SpecDomains = {
      xDomains: [
        {
          accessor: 'x',
          level: 0,
          domain: [0, 3],
          scaleType: ScaleType.Linear,
        },
      ],
      yDomain: {
        accessor: 'y',
        level: 0,
        domain: [0, 15],
        scaleType: ScaleType.Linear,
      },
      colorDomain: {
        accessors: [],
        domain: [''],
        scaleType: ScaleType.Ordinal,
      },
    };
    const domain2: SpecDomains = {
      xDomains: [
        {
          accessor: 'x',
          level: 0,
          domain: [1, 26],
          scaleType: ScaleType.Linear,
        },
      ],
      yDomain: {
        accessor: 'y',
        level: 0,
        domain: [0, 50],
        scaleType: ScaleType.Linear,
      },
      colorDomain: {
        accessors: [],
        domain: [''],
        scaleType: ScaleType.Ordinal,
      },
    };
    const mergedDomain = mergeDomains(domain1, domain2);
    const expectedDomain: SpecDomains = {
      xDomains: [
        {
          accessor: 'x',
          level: 0,
          domain: [0, 26],
          scaleType: ScaleType.Linear,
        },
      ],
      yDomain: {
        accessor: 'y',
        level: 0,
        domain: [0, 50],
        scaleType: ScaleType.Linear,
      },
      colorDomain: {
        accessors: [],
        domain: [''],
        scaleType: ScaleType.Ordinal,
      },
    };
    expect(mergedDomain).toEqual(expectedDomain);
  });

  test('Should merge ordinal domains', () => {
    const domain1: SpecDomains = {
      xDomains: [
        {
          accessor: 'x',
          level: 0,
          domain: [0, 1, 2, 3],
          scaleType: ScaleType.Ordinal,
        },
      ],
      yDomain: {
        accessor: 'y',
        level: 0,
        domain: [0, 15],
        scaleType: ScaleType.Linear,
      },
      colorDomain: {
        accessors: [],
        domain: [''],
        scaleType: ScaleType.Ordinal,
      },
    };
    const domain2: SpecDomains = {
      xDomains: [
        {
          accessor: 'x',
          level: 0,
          domain: [4, 5],
          scaleType: ScaleType.Ordinal,
        },
      ],
      yDomain: {
        accessor: 'y',
        level: 0,
        domain: [0, 50],
        scaleType: ScaleType.Linear,
      },
      colorDomain: {
        accessors: [],
        domain: [''],
        scaleType: ScaleType.Ordinal,
      },
    };
    const mergedDomain = mergeDomains(domain1, domain2);
    const expectedDomain: SpecDomains = {
      xDomains: [
        {
          accessor: 'x',
          level: 0,
          domain: [0, 1, 2, 3, 4, 5],
          scaleType: ScaleType.Ordinal,
        },
      ],
      yDomain: {
        accessor: 'y',
        level: 0,
        domain: [0, 50],
        scaleType: ScaleType.Linear,
      },
      colorDomain: {
        accessors: [],
        domain: [''],
        scaleType: ScaleType.Ordinal,
      },
    };
    expect(mergedDomain).toEqual(expectedDomain);
  });
});

import { computeScaleConfig, computeScaleConfigs } from './domain_utils';

const TEST_DATASET_1 = [
  { group: 'a', stack: 'a', x: 1, y: 10 },
  { group: 'a', stack: 'b', x: 2, y: 20 },
  { group: 'a', stack: 'a', x: 3, y: 30 },
  { group: 'a', stack: 'b', x: 4, y: 5 },
  { group: 'a', stack: 'b', x: 4, y: 10 },
];

const TEST_DATASET_2 = [
  { group: 'a', stack: 'a', x: 1, y: 30 },
  { group: 'a', stack: 'b', x: 2, y: 22.3 },
  { group: 'a', stack: 'a', x: 3, y: 10 },
  { group: 'a', stack: 'b', x: 4, y: 8 },
  { group: 'b', stack: 'a', x: 1, y: 30 },
  { group: 'b', stack: 'b', x: 2, y: 22.3 },
  { group: 'b', stack: 'a', x: 3, y: 10 },
  { group: 'b', stack: 'b', x: 4, y: 8 },
  { group: 'c', stack: 'a', x: 1, y: 30 },
  { group: 'c', stack: 'b', x: 2, y: 22.3 },
  { group: 'c', stack: 'a', x: 3, y: 10 },
  { group: 'c', stack: 'b', x: 4, y: 8 },
];

describe.skip('Domain Utils', () => {
  test('compute single linear domain', () => {
    const expectedDomain = {
      domain: [1, 4],
      scaleType: 'linear',
    };
    const accessor = (d) => d.x;
    const scaleType = 'linear';
    const domains = computeScaleConfig(TEST_DATASET_1, accessor, scaleType);
    expect(domains).toMatchObject(expectedDomain);
  });
  test('compute single ordinal domain', () => {
    const expectedDomain = {
      domain: [1, 2, 3, 4],
      scaleType: 'ordinal',
    };
    const accessor = (d) => d.x;
    const scaleType = 'ordinal';
    const domains = computeScaleConfig(TEST_DATASET_1, accessor, scaleType);
    expect(domains).toMatchObject(expectedDomain);
  });
  test('Compute scale configs from simple spec', () => {
    const xAccessor = d => d.x;
    const yAccessor = d => d.y;
    const spec = {
      xAccessor,
      yAccessor,
      xScaleType: 'linear',
      yScaleType: 'linear',
    };
    const data = TEST_DATASET_1;

    const expectedScaleConfigs = {
      x: {
        domain: [1, 4],
        scaleType: 'linear',
        clusterType: 'none',
        accessor: xAccessor,
      },
      y: {
        domain: [5, 30],
        scaleType: 'linear',
        clusterType: 'none',
        accessor: yAccessor,
      }
    };

    const scaleConfigs = computeScaleConfigs(data, spec);
    expect(scaleConfigs).toMatchObject(expectedScaleConfigs);
  });
  test('Compute scale configs from simple spec with stacked y', () => {
    const xAccessor = d => d.x;
    const yAccessor = d => d.y;
    const spec = {
      xAccessor,
      yAccessor,
      xScaleType: 'linear',
      yScaleType: 'linear',
      yClusterType: 'stack',
    };
    const data = TEST_DATASET_1;

    const expectedScaleConfigs = {
      x: {
        domain: [1, 4],
        scaleType: 'linear',
        clusterType: 'group',
        accessor: xAccessor,
      },
      y: {
        domain: [5, 30],
        scaleType: 'linear',
        clusterType: 'stack',
        accessor: yAccessor,
      }
    };

    const scaleConfigs = computeScaleConfigs(data, spec);
    expect(scaleConfigs).toMatchObject(expectedScaleConfigs);
  });
  test.skip('Split correctly on standard group stacked', () => {
    const expectedDomains = {
      x: {
        domain: [1, 4],
        scaleType: 'linear',
        clusterType: 'group',
      },
      y: {
        domain: [8, 30],
        scaleType: 'linear',
        clusterType: 'stack',
      }
    };
    const spec = {
      xAccessor: (d) => d.x,
      yAccessor: (d) => d.y,
      xScaleType: 'linear',
      yScaleType: 'linear',
    };
    const domains = computeScaleConfigs(TEST_DATASET_1, spec);
    expect(domains).toMatchObject(expectedDomains);
  });
  test.skip('Split correctly multi groups', () => {
    const expectedDomains = {
      x: {
        domain: ['a', 'b', 'c'],
        scale: 'ordinal',
        child: {
          domain: ['a', 'b'],
          scale: 'ordinal',
          child: {
            domain: [1, 2, 3, 4],
            scale: 'ordinal'
          }
        }
      },
      y: {
        domain: [8, 30],
        scale: 'linear',
        type: 'stack',
      }
    };
    const domains = computeScaleConfigs(TEST_DATASET_2, {});
    expect(domains).toBe(expectedDomains);
  });
});

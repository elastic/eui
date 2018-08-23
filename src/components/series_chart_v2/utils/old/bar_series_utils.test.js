import { DEFAULT_BAR_WIDTH, nestData, computeDataPoints } from './bar_series_utils';
import { computeScaleConfigs } from './domain_utils';

const TEST_DATASET_1 = [
  { group: 'ga', level1: 'lvla', x: 1, y: 2 },
  { group: 'ga', level1: 'lvla', x: 2, y: 2 },
  { group: 'ga', level1: 'lvlb', x: 1, y: 6 },
  { group: 'gb', level1: 'lvla', x: 3, y: 4 },
];

describe.skip('Bar Series Utils', () => {
  test('Compute nested data', () => {
    const scaleConfigs = {
      stacked: true,
      groupings: [
        {
          accessor: ({ group }) => group,
        },
        // {
        //   accessor: ({ level1 }) => level1,
        // },
        // {
        //   accessor: ({ x }) => x,
        // }
      ]
    };
    const nestedData = nestData(TEST_DATASET_1, scaleConfigs);
    console.log(JSON.stringify(nestedData, null, 4));
  });
  test('compute simple linear bar series data points', () => {
    const chartDimensions = {
      width: 100,
      height: 100,
    };
    const bandWidth = DEFAULT_BAR_WIDTH;
    const expectedDataPoints = [
      {
        x: -bandWidth / 2,
        y: 100,
        height: 0,
        width: bandWidth,
      },
      {
        x: chartDimensions.width / 2 - bandWidth / 2,
        y: 0,
        height: 100,
        width: bandWidth,
      },
      {
        x: chartDimensions.width - bandWidth / 2,
        y: 50,
        height: 50,
        width: bandWidth,
      }
    ];

    const xAccessor = d => d.x;
    const yAccessor = d => d.y;
    const spec = {
      xAccessor,
      yAccessor,
      xScaleType: 'linear',
      yScaleType: 'linear',
    };
    const scaleConfigs = computeScaleConfigs(TEST_DATASET_1, spec);
    const dataPoints = computeDataPoints(TEST_DATASET_1, scaleConfigs, chartDimensions);
    expect(dataPoints).toMatchObject(expectedDataPoints);
  });
});

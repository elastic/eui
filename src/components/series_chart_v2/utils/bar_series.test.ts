import { computeDataDomain } from '../commons/domain';
import { ScaleType } from '../commons/scales';
import { computeDataPoints, DEFAULT_BAR_WIDTH } from './bar_series';

describe('Bar Series', () => {
  test('Compute a simple ordinal bar series', () => {
    const data = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 3 },
    ];
    const xScaleType = ScaleType.Ordinal;
    const yScaleType = ScaleType.Linear;
    const xAccessor = (datum: any) => datum.x;
    const yAccessor = (datum: any) => datum.y;
    const xDomain = computeDataDomain(data, xAccessor, xScaleType);
    const yDomain = computeDataDomain(data, yAccessor, yScaleType);
    const xScaleConfig = {
      accessor: xAccessor,
      type: xScaleType,
      domain: xDomain,
    };
    const yScaleConfig = {
      accessor: yAccessor,
      type: yScaleType,
      domain: yDomain,
    };
    const seriesDimensions = {
      width: 100,
      height: 100,
    };
    const dataPoints = computeDataPoints(data, xScaleConfig, yScaleConfig, seriesDimensions);
    const expectedBandwidth = 25 / 2;
    const expectedDataPoints = [
      { x: expectedBandwidth, y: 100, height: 0, width: 25 },
      { x: expectedBandwidth + 25, y: 50, height: 50, width: 25 },
      { x: expectedBandwidth + 50, y: 0, height: 100, width: 25 },
      { x: expectedBandwidth + 75, y: 0, height: 100, width: 25 },
    ];
    expect(dataPoints).toEqual(expectedDataPoints);
  });
  test('Compute a simple linear bar series', () => {
    const data = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 3 },
      { x: 5, y: 3 },
    ];
    const xScaleType = ScaleType.Linear;
    const yScaleType = ScaleType.Linear;
    const xAccessor = (datum: any) => datum.x;
    const yAccessor = (datum: any) => datum.y;
    const xDomain = computeDataDomain(data, xAccessor, xScaleType);
    const yDomain = computeDataDomain(data, yAccessor, yScaleType);
    const xScaleConfig = {
      accessor: xAccessor,
      type: xScaleType,
      domain: xDomain,
    };
    const yScaleConfig = {
      accessor: yAccessor,
      type: yScaleType,
      domain: yDomain,
    };
    const seriesDimensions = {
      width: 100,
      height: 100,
    };
    const dataPoints = computeDataPoints(data, xScaleConfig, yScaleConfig, seriesDimensions);
    const expectedDataPoints = [
      { x: 0, y: 100, height: 0, width: DEFAULT_BAR_WIDTH },
      { x: 25, y: 50, height: 50, width: DEFAULT_BAR_WIDTH },
      { x: 50, y: 0, height: 100, width: DEFAULT_BAR_WIDTH },
      { x: 75, y: 0, height: 100, width: DEFAULT_BAR_WIDTH },
      { x: 100, y: 0, height: 100, width: DEFAULT_BAR_WIDTH },
    ];
    expect(dataPoints).toEqual(expectedDataPoints);
  });
  test('Compute a simple linear bar series with clamped domains', () => {
    const data = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 3 },
      { x: 5, y: 3 },
    ];
    const xScaleType = ScaleType.Linear;
    const yScaleType = ScaleType.Linear;
    const xAccessor = (datum: any) => datum.x;
    const yAccessor = (datum: any) => datum.y;
    const xDomain = [1, 3];
    const yDomain = [1, 2];
    const xScaleConfig = {
      accessor: xAccessor,
      type: xScaleType,
      domain: xDomain,
      clamp: true,
    };
    const yScaleConfig = {
      accessor: yAccessor,
      type: yScaleType,
      domain: yDomain,
      clamp: true,
    };
    const seriesDimensions = {
      width: 100,
      height: 100,
    };
    const dataPoints = computeDataPoints(data, xScaleConfig, yScaleConfig, seriesDimensions);
    const expectedDataPoints = [
      { x: 0, y: 100, height: 0, width: DEFAULT_BAR_WIDTH },
      { x: 50, y: 0, height: 100, width: DEFAULT_BAR_WIDTH },
      { x: 100, y: 0, height: 100, width: DEFAULT_BAR_WIDTH },
      { x: 100, y: 0, height: 100, width: DEFAULT_BAR_WIDTH },
      { x: 100, y: 0, height: 100, width: DEFAULT_BAR_WIDTH },
    ];
    expect(dataPoints).toEqual(expectedDataPoints);
  });
});

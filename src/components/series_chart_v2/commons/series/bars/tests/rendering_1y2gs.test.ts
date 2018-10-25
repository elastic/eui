import { Dimensions } from '../../../dimensions';
import { getGroupId, getSpecId } from '../../../ids';
import { ColorConfig, ScalesConfig } from '../../../themes/theme';
import { SpecDomains } from '../../../utils/domain';
import { ScaleType } from '../../../utils/scales';
import { BarSeriesSpec } from '../../specs';
import { computeDataDomain } from '../domains';
import { renderBarSeriesSpec } from '../rendering';

const CHART_DIMS: Dimensions = {
  top: 0,
  left: 0,
  width: 160,
  height: 200,
};

const chartScalesConfig: ScalesConfig = {
  ordinal: {
    padding: 0,
  },
};

const chartColorsConfig: ColorConfig = {
  vizColors: ['red'],
  defaultVizColor: 'red',
};

const colorScales = {};

const SPEC: BarSeriesSpec = {
  id: getSpecId('spec1'),
  groupId: getGroupId('group1'),
  data: [
    { x: 0, g1: 'a', g2: 's', y: 1 },
    { x: 0, g1: 'a', g2: 'p', y: 1 },
    { x: 0, g1: 'b', g2: 's', y: 1 },
    { x: 0, g1: 'b', g2: 'p', y: 1 },
    { x: 1, g1: 'a', g2: 's', y: 2 },
    { x: 1, g1: 'a', g2: 'p', y: 2 },
    { x: 1, g1: 'b', g2: 's', y: 2 },
    { x: 1, g1: 'b', g2: 'p', y: 2 },
    { x: 2, g1: 'a', g2: 's', y: 10 },
    { x: 2, g1: 'a', g2: 'p', y: 10 },
    { x: 2, g1: 'b', g2: 's', y: 10 },
    { x: 2, g1: 'b', g2: 'p', y: 10 },
    { x: 3, g1: 'a', g2: 's', y: 6 },
    { x: 3, g1: 'a', g2: 'p', y: 6 },
    { x: 3, g1: 'b', g2: 's', y: 6 },
    { x: 3, g1: 'b', g2: 'p', y: 6 },
  ],
  xAccessor: 'x',
  yAccessors: ['y'],
  xScaleType: ScaleType.Linear,
  yScaleType: ScaleType.Linear,
  yScaleToDataExtent: false,
  splitSeriesAccessors: ['g1', 'g2'],
  stackAccessors: ['x', 'g1'],
};
// correct expectations
describe('Bar rendering 1Y2GS', () => {
  let computedDomains: SpecDomains;

  test('should compute the series domain', () => {
    computedDomains = computeDataDomain(SPEC);
    expect(computedDomains).toMatchSnapshot();
  });

  test('should render the bar series', () => {
    const renderedData = renderBarSeriesSpec(
      SPEC,
      computedDomains,
      CHART_DIMS,
      0,
      colorScales,
      chartColorsConfig,
      chartScalesConfig,
    );
    expect(renderedData).toMatchSnapshot();
  });
});

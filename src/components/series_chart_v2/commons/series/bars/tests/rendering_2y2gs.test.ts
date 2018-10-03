import { SpecDomains } from '../../../data_ops/domain';
import { ScaleType } from '../../../data_ops/scales';
import { Dimensions } from '../../../dimensions';
import { getGroupId, getSpecId } from '../../../ids';
import { ColorConfig, ScalesConfig } from '../../../themes/theme';
import { BarSeriesSpec } from '../../specs';
import { computeDataDomain } from '../domains';
import { renderBarSeriesSpec } from '../rendering';

const CHART_DIMS: Dimensions = {
  top: 0,
  left: 0,
  width: 160,
  height: 150,
};

const chartScalesConfig: ScalesConfig = {
  ordinal: {
    padding: 0,
  },
};

const chartColorsConfig: ColorConfig = {
  vizColors: ['green', 'blue'],
  defaultVizColor: 'red',
};

const colorScales = {
  'a--s--y1': 'color1',
  'a--s--y2': 'color2',
  'a--p--y1': 'color3',
  'a--p--y2': 'color4',
  'b--s--y1': 'color5',
  'b--s--y2': 'color6',
  'b--p--y1': 'color7',
  'b--p--y2': 'color8',
};

const SPEC: BarSeriesSpec = {
  id: getSpecId('spec1'),
  groupId: getGroupId('group1'),
  data: [
    { x: 0, g1: 'a', g2: 's', y1: 1, y2: 4 },
    { x: 0, g1: 'a', g2: 'p', y1: 1, y2: 4 },
    { x: 0, g1: 'b', g2: 's', y1: 3, y2: 6 },
    { x: 0, g1: 'b', g2: 'p', y1: 3, y2: 6 },
    { x: 1, g1: 'a', g2: 's', y1: 2, y2: 1 },
    { x: 1, g1: 'a', g2: 'p', y1: 2, y2: 1 },
    { x: 1, g1: 'b', g2: 's', y1: 2, y2: 5 },
    { x: 1, g1: 'b', g2: 'p', y1: 2, y2: 5 },
    { x: 2, g1: 'a', g2: 's', y1: 10, y2: 5 },
    { x: 2, g1: 'a', g2: 'p', y1: 10, y2: 5 },
    { x: 2, g1: 'b', g2: 's', y1: 3, y2: 1 },
    { x: 2, g1: 'b', g2: 'p', y1: 3, y2: 1 },
    { x: 3, g1: 'a', g2: 's', y1: 7, y2: 3 },
    { x: 3, g1: 'a', g2: 'p', y1: 7, y2: 3 },
    { x: 3, g1: 'b', g2: 's', y1: 6, y2: 4 },
    { x: 3, g1: 'b', g2: 'p', y1: 6, y2: 4 },
  ],
  xAccessor: 'x',
  yAccessors: ['y1', 'y2'],
  xScaleType: ScaleType.Linear,
  yScaleType: ScaleType.Linear,
  yScaleToDataExtent: false,
  splitSeriesAccessors: ['g1', 'g2'],
  stackAccessors: ['x', 'g1', 'g2'],
};

describe('Bar rendering 2Y2GS', () => {
  let computedDomains: SpecDomains;

  test('should compute the domain', () => {
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

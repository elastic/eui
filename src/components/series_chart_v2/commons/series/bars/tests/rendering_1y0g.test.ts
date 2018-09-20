import { SpecDomains } from '../../../data_ops/domain';
import { ScaleType } from '../../../data_ops/scales';
import { Dimensions } from '../../../dimensions';
import { getGroupId, getSpecId } from '../../../ids';
import { Theme } from '../../../themes/theme';
import { BarSeriesSpec } from '../../specs';
import { computeDataDomain } from '../domains';
import { renderBarSeriesSpec } from '../rendering';

const CHART_DIMS: Dimensions = {
  top: 0,
  left: 0,
  width: 100,
  height: 100,
};

const SPEC: BarSeriesSpec = {
  id: getSpecId('spec1'),
  groupId: getGroupId('group1'),
  data: [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 10 }, { x: 3, y: 6 }],
  xAccessor: 'x',
  yAccessors: ['y'],
  xScaleType: ScaleType.Ordinal, // TODO CHECK WITH ORDINAL
  yScaleType: ScaleType.Linear,
  yScaleToDataExtent: false,
};

const THEME: Theme = {
  chartMargins: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scales: {
    ordinal: {
      padding: 0,
    },
  },
  axisTitle: {
    fontSize: 20,
  },
  vizColors: ['green'],
  defaultVizColor: 'red',
};

const colorScales = {
  '': 'green',
};

describe.only('Bar rendering 1Y0G', () => {
  let computedDomains: SpecDomains;
  test('should compute the domain', () => {
    computedDomains = computeDataDomain(SPEC);
    const expectedDomains: SpecDomains = {
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
        domain: [0, 10],
        scaleType: ScaleType.Linear,
        isStacked: false,
      },
      colorDomain: {
        accessors: [],
        domain: [''],
        scaleType: ScaleType.Ordinal,
      },
    };
    expect(computedDomains).toEqual(expectedDomains);
  });

  test('should render the bar series', () => {
    const renderedData = renderBarSeriesSpec(SPEC, computedDomains, CHART_DIMS, 0, colorScales, THEME);
    const expectedRendering = [
      { x: 0, y: 90, width: 25, height: 10, fill: 'green' },
      { x: 25, y: 80, width: 25, height: 20, fill: 'green' },
      { x: 50, y: 0, width: 25, height: 100, fill: 'green' },
      { x: 75, y: 40, width: 25, height: 60, fill: 'green' },
    ];
    expect(renderedData).toEqual(expectedRendering);
  });
  test('should correctly rotate a simple 1Y0G bar chart', () => {
    const rotatedSpec = {
      ...SPEC,
    };
    const rotatedChartDimensions = {
      ...CHART_DIMS,
      width: 200,
      height: 100,
    };
    const renderedData = renderBarSeriesSpec(
      rotatedSpec,
      computedDomains,
      rotatedChartDimensions,
      90,
      colorScales,
      THEME,
    );
    const expectedRendering = [
      { x: 0, y: 180, width: 25, height: 20, fill: 'green' },
      { x: 25, y: 160, width: 25, height: 40, fill: 'green' },
      { x: 50, y: 0, width: 25, height: 200, fill: 'green' },
      { x: 75, y: 80, width: 25, height: 120, fill: 'green' },
    ];
    expect(renderedData).toEqual(expectedRendering);
  });
});

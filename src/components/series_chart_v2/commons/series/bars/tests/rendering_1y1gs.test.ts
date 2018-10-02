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
  width: 160,
  height: 100,
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
  vizColors: ['color1', 'color2'],
  defaultVizColor: 'red',
  interactions: {
    hideOpacity: 0.1,
  },
};

const colorScales = {
  a: 'color1',
  b: 'color2',
};

const SPEC: BarSeriesSpec = {
  id: getSpecId('spec1'),
  groupId: getGroupId('group1'),
  data: [
    { x: 0, g: 'a', y: 1 },
    { x: 0, g: 'b', y: 1 },
    { x: 1, g: 'a', y: 2 },
    { x: 1, g: 'b', y: 2 },
    { x: 2, g: 'a', y: 10 },
    { x: 2, g: 'b', y: 10 },
    { x: 3, g: 'a', y: 6 },
    { x: 3, g: 'b', y: 6 },
  ],
  xAccessor: 'x',
  yAccessors: ['y'],
  xScaleType: ScaleType.Linear,
  yScaleType: ScaleType.Linear,
  yScaleToDataExtent: false,
  splitSeriesAccessors: ['g'],
  stackAccessors: ['x', 'g'],
};

describe.only('Bar rendering 1Y1G', () => {
  let computedDimensions: SpecDomains;

  test.only('should compute the domain', () => {
    computedDimensions = computeDataDomain(SPEC);
    const expectedDomains: SpecDomains = {
      xDomains: [
        {
          accessor: 'x',
          level: 0,
          domain: [0, 3],
          scaleType: ScaleType.Linear, // transformation from linear to ordinal
        },
      ],
      yDomain: {
        accessor: 'y',
        level: 0,
        domain: [0, 20],
        scaleType: ScaleType.Linear,
        isStacked: true,
      },
      colorDomain: {
        accessors: ['g'],
        domain: ['a', 'b'],
        scaleType: ScaleType.Ordinal,
      },
    };
    expect(computedDimensions).toEqual(expectedDomains);
  });

  test('should render the bar series', () => {
    const renderedData = renderBarSeriesSpec(
      SPEC,
      computedDimensions,
      CHART_DIMS,
      0,
      colorScales,
      THEME,
    );

    const expectedRendering = [
      {
        level: 0,
        accessor: 'x',
        levelValue: '0',
        x: 0,
        y: 0,
        width: 40,
        height: 100,
        elements: [
          {
            accessor: 'g',
            levelValue: 1,
            level: 1,
            data: { x: 0, g: 'a', y: 1 },
            x: 0,
            y: 90,
            width: 20,
            height: 10,
            fill: 'color1',
          },
          {
            accessor: 'g',
            levelValue: 1,
            level: 1,
            data: { x: 0, g: 'b', y: 1 },
            x: 20,
            y: 90,
            width: 20,
            height: 10,
            fill: 'color2',
          },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '1',
        x: 40,
        y: 0,
        width: 40,
        height: 100,
        elements: [
          {
            accessor: 'g',
            level: 1,
            levelValue: 2,
            data: { x: 1, g: 'a', y: 2 },
            x: 0,
            y: 80,
            width: 20,
            height: 20,
            fill: 'color1',
          },
          {
            accessor: 'g',
            level: 1,
            levelValue: 2,
            data: { x: 1, g: 'b', y: 2 },
            x: 20,
            y: 80,
            width: 20,
            height: 20,
            fill: 'color2',
          },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '2',
        x: 80,
        y: 0,
        width: 40,
        height: 100,
        elements: [
          {
            accessor: 'g',
            level: 1,
            levelValue: 10,
            data: { x: 2, y: 10, g: 'a' },
            x: 0,
            y: 0,
            width: 20,
            height: 100,
            fill: 'color1',
          },
          {
            accessor: 'g',
            level: 1,
            levelValue: 10,
            data: { x: 2, y: 10, g: 'b' },
            x: 20,
            y: 0,
            width: 20,
            height: 100,
            fill: 'color2',
          },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '3',
        x: 120,
        y: 0,
        width: 40,
        height: 100,
        elements: [
          {
            accessor: 'g',
            level: 1,
            levelValue: 6,
            data: { x: 3, y: 6, g: 'a' },
            x: 0,
            y: 40,
            width: 20,
            height: 60,
            fill: 'color1',
          },
          {
            accessor: 'g',
            level: 1,
            levelValue: 6,
            data: { x: 3, y: 6, g: 'b' },
            x: 20,
            y: 40,
            width: 20,
            height: 60,
            fill: 'color2',
          },
        ],
      },
    ];
    expect(renderedData).toEqual(expectedRendering);
  });
});

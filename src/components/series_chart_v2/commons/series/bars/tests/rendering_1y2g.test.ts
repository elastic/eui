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
    fontSize:  20,
  },
  vizColors: [
    'red',
  ],
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
};

describe.only('Bar rendering 1Y2G', () => {
  let computedDimensions: SpecDomains;

  test('should compute the domain', () => {
    computedDimensions = computeDataDomain(SPEC);
    const expectedDomains: SpecDomains = {
      xDomains: [
        {
          accessor: 'x',
          level: 0,
          domain: [0, 1, 2, 3],
          scaleType: ScaleType.Ordinal, // transformation from linear to ordinal
        },
        {
          accessor: 'g1',
          level: 1,
          domain: ['a', 'b'],
          scaleType: ScaleType.Ordinal,
        },
        {
          accessor: 'g2',
          level: 2,
          domain: ['s', 'p'],
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
        accessors: ['g1', 'g2'],
        domain: ['a--s', 'a--p', 'b--s', 'b--p'],
        scaleType: ScaleType.Ordinal,
      },
    };
    expect(computedDimensions).toEqual(expectedDomains);
  });

  test('should render the bar series', () => {
    const renderedData = renderBarSeriesSpec(SPEC, computedDimensions, CHART_DIMS, colorScales, THEME);
    const expectedRendering = [
      {
        level: 0,
        levelValue: '0',
        accessor: 'x',
        translateX: 0,
        translateY: 0,
        elements: [
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              { x: 0,  y: 90, width: 10, height: 10, fill: 'red' },
              { x: 10, y: 90, width: 10, height: 10, fill: 'red' },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0,  y: 90, width: 10, height: 10, fill: 'red' },
              { x: 10, y: 90, width: 10, height: 10, fill: 'red' },
            ],
          },
        ],
      },
      {
        level: 0,
        levelValue: '1',
        accessor: 'x',
        translateX: 40,
        translateY: 0,
        elements: [
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              { x: 0,  y: 80, width: 10, height: 20, fill: 'red' },
              { x: 10, y: 80, width: 10, height: 20, fill: 'red' },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0,  y: 80, width: 10, height: 20, fill: 'red' },
              { x: 10, y: 80, width: 10, height: 20, fill: 'red' },
            ],
          },
        ],
      },
      {
        level: 0,
        levelValue: '2',
        accessor: 'x',
        translateX: 80,
        translateY: 0,
        elements: [
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              { x: 0,  y: 0, width: 10, height: 100, fill: 'red' },
              { x: 10, y: 0, width: 10, height: 100, fill: 'red' },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0,  y: 0, width: 10, height: 100, fill: 'red' },
              { x: 10, y: 0, width: 10, height: 100, fill: 'red' },
            ],
          },
        ],
      },
      {
        level: 0,
        levelValue: '3',
        accessor: 'x',
        translateX: 120,
        translateY: 0,
        elements: [
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              { x: 0,  y: 40, width: 10, height: 60, fill: 'red' },
              { x: 10, y: 40, width: 10, height: 60, fill: 'red' },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0,  y: 40, width: 10, height: 60, fill: 'red' },
              { x: 10, y: 40, width: 10, height: 60, fill: 'red' },
            ],
          },
        ],
      },
    ];
    expect(renderedData).toEqual(expectedRendering);
  });
});

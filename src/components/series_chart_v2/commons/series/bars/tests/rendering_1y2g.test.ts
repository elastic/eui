import { Dimensions } from '../../../dimensions';
import { getGroupId, getSpecId } from '../../../ids';
import { ScaleType } from '../../../scales';
import { BarSeriesSpec } from '../../specs';
import { computeDomains, SpecDomains } from '../domains';
import { renderBarSeriesSpec } from '../rendering';

const CHART_DIMS: Dimensions = {
  top: 0,
  left: 0,
  width: 160,
  height: 100,
};

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
    computedDimensions = computeDomains(SPEC);
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
    };
    expect(computedDimensions).toEqual(expectedDomains);
  });

  test('should render the bar series', () => {
    const renderedData = renderBarSeriesSpec(SPEC, computedDimensions, CHART_DIMS);
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
              { x: 0,  y: 90, width: 10, height: 10 },
              { x: 10, y: 90, width: 10, height: 10 },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0,  y: 90, width: 10, height: 10 },
              { x: 10, y: 90, width: 10, height: 10 },
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
              { x: 0,  y: 80, width: 10, height: 20 },
              { x: 10, y: 80, width: 10, height: 20 },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0,  y: 80, width: 10, height: 20 },
              { x: 10, y: 80, width: 10, height: 20 },
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
              { x: 0,  y: 0, width: 10, height: 100 },
              { x: 10, y: 0, width: 10, height: 100 },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0,  y: 0, width: 10, height: 100 },
              { x: 10, y: 0, width: 10, height: 100 },
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
              { x: 0,  y: 40, width: 10, height: 60 },
              { x: 10, y: 40, width: 10, height: 60 },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0,  y: 40, width: 10, height: 60 },
              { x: 10, y: 40, width: 10, height: 60 },
            ],
          },
        ],
      },
    ];
    expect(renderedData).toEqual(expectedRendering);
  });
});

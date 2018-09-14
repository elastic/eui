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
  height: 200,
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
  stackAccessors: ['x', 'g1'],
};
// correct expectations
describe.only('Bar rendering 1Y2GS', () => {
  let computedDomains: SpecDomains;

  test('should compute the series domain', () => {
    computedDomains = computeDomains(SPEC);
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
      ],
      yDomain: {
        accessor: 'y',
        level: 0,
        domain: [0, 20],
        scaleType: ScaleType.Linear,
        isStacked: true,
      },
    };
    expect(computedDomains).toEqual(expectedDomains);
  });

  test('should render the bar series', () => {
    const renderedData = renderBarSeriesSpec(SPEC, computedDomains, CHART_DIMS);
    const expectedRendering = [
      {
        level: 0,
        accessor: 'x',
        levelValue: '0',
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
              { x: 0, y: 190, width: 20, height: 10 },
              { x: 0, y: 180, width: 20, height: 10 },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0, y: 190, width: 20, height: 10 },
              { x: 0, y: 180, width: 20, height: 10 },
            ],
          },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '1',
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
              { x: 0, y: 180, width: 20, height: 20 },
              { x: 0, y: 160, width: 20, height: 20 },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0, y: 180, width: 20, height: 20 },
              { x: 0, y: 160, width: 20, height: 20 },
            ],
          },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '2',
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
              { x: 0, y: 100, width: 20, height: 100 },
              { x: 0, y: 0, width: 20, height: 100 },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0, y: 100, width: 20, height: 100 },
              { x: 0, y: 0, width: 20, height: 100 },
            ],
          },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '3',
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
              { x: 0, y: 140, width: 20, height: 60 },
              { x: 0, y: 80, width: 20, height: 60 },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0, y: 140, width: 20, height: 60 },
              { x: 0, y: 80, width: 20, height: 60 },
            ],
          },
        ],
      },
    ];
    expect(renderedData).toEqual(expectedRendering);
  });
});

import { SpecDomains } from '../../../data_ops/domain';
import { ScaleType } from '../../../data_ops/scales';
import { Dimensions } from '../../../dimensions';
import { getGroupId, getSpecId } from '../../../ids';
import { BarSeriesSpec } from '../../specs';
import { computeDataDomain } from '../domains';
import { renderBarSeriesSpec } from '../rendering';

const CHART_DIMS: Dimensions = {
  top: 0,
  left: 0,
  width: 320, // to easy compute spaces
  height: 100,
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
};

describe.only('Bar rendering 2Y2G', () => {
  let computedDomains: SpecDomains;

  test('should compute the series domain', () => {
    computedDomains = computeDataDomain(SPEC);
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
        {
          accessor: 'y',
          level: 3,
          domain: ['y1', 'y2'],
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
              {
                level: 2,
                accessor: 'g2',
                levelValue: 's',
                translateX: 0,
                translateY: 0,
                elements: [
                  { x: 0, y: 90, width: 10, height: 10 },
                  { x: 10, y: 60, width: 10, height: 40 },
                ],
              },
              {
                level: 2,
                accessor: 'g2',
                levelValue: 'p',
                translateX: 20,
                translateY: 0,
                elements: [
                  { x: 0, y: 90, width: 10, height: 10 },
                  { x: 10, y: 60, width: 10, height: 40 },
                ],
              },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 40,
            translateY: 0,
            elements: [
              {
                level: 2,
                accessor: 'g2',
                levelValue: 's',
                translateX: 0,
                translateY: 0,
                elements: [
                  { x: 0, y: 70, width: 10, height: 30 },
                  { x: 10, y: 40, width: 10, height: 60 },
                ],
              },
              {
                level: 2,
                accessor: 'g2',
                levelValue: 'p',
                translateX: 20,
                translateY: 0,
                elements: [
                  { x: 0, y: 70, width: 10, height: 30 },
                  { x: 10, y: 40, width: 10, height: 60 },
                ],
              },
            ],
          },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '1',
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
              {
                level: 2,
                accessor: 'g2',
                levelValue: 's',
                translateX: 0,
                translateY: 0,
                elements: [
                  { x: 0, y: 80, width: 10, height: 20 },
                  { x: 10, y: 90, width: 10, height: 10 },
                ],
              },
              {
                level: 2,
                accessor: 'g2',
                levelValue: 'p',
                translateX: 20,
                translateY: 0,
                elements: [
                  { x: 0, y: 80, width: 10, height: 20 },
                  { x: 10, y: 90, width: 10, height: 10 },
                ],
              },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 40,
            translateY: 0,
            elements: [
              {
                level: 2,
                accessor: 'g2',
                levelValue: 's',
                translateX: 0,
                translateY: 0,
                elements: [
                  { x: 0, y: 80, width: 10, height: 20 },
                  { x: 10, y: 50, width: 10, height: 50 },
                ],
              },
              {
                level: 2,
                accessor: 'g2',
                levelValue: 'p',
                translateX: 20,
                translateY: 0,
                elements: [
                  { x: 0, y: 80, width: 10, height: 20 },
                  { x: 10, y: 50, width: 10, height: 50 },
                ],
              },
            ],
          },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '2',
        translateX: 160,
        translateY: 0,
        elements: [
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              {
                level: 2,
                accessor: 'g2',
                levelValue: 's',
                translateX: 0,
                translateY: 0,
                elements: [
                  { x: 0, y: 0, width: 10, height: 100 },
                  { x: 10, y: 50, width: 10, height: 50 },
                ],
              },
              {
                level: 2,
                accessor: 'g2',
                levelValue: 'p',
                translateX: 20,
                translateY: 0,
                elements: [
                  { x: 0, y: 0, width: 10, height: 100 },
                  { x: 10, y: 50, width: 10, height: 50 },
                ],
              },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 40,
            translateY: 0,
            elements: [
              {
                level: 2,
                accessor: 'g2',
                levelValue: 's',
                translateX: 0,
                translateY: 0,
                elements: [
                  { x: 0, y: 70, width: 10, height: 30 },
                  { x: 10, y: 90, width: 10, height: 10 },
                ],
              },
              {
                level: 2,
                accessor: 'g2',
                levelValue: 'p',
                translateX: 20,
                translateY: 0,
                elements: [
                  { x: 0, y: 70, width: 10, height: 30 },
                  { x: 10, y: 90, width: 10, height: 10 },
                ],
              },
            ],
          },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '3',
        translateX: 240,
        translateY: 0,
        elements: [
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              {
                level: 2,
                accessor: 'g2',
                levelValue: 's',
                translateX: 0,
                translateY: 0,
                elements: [
                  { x: 0, y: 30, width: 10, height: 70 },
                  { x: 10, y: 70, width: 10, height: 30 },
                ],
              },
              {
                level: 2,
                accessor: 'g2',
                levelValue: 'p',
                translateX: 20,
                translateY: 0,
                elements: [
                  { x: 0, y: 30, width: 10, height: 70 },
                  { x: 10, y: 70, width: 10, height: 30 },
                ],
              },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 40,
            translateY: 0,
            elements: [
              {
                level: 2,
                accessor: 'g2',
                levelValue: 's',
                translateX: 0,
                translateY: 0,
                elements: [
                  { x: 0, y: 40, width: 10, height: 60 },
                  { x: 10, y: 60, width: 10, height: 40 },
                ],
              },
              {
                level: 2,
                accessor: 'g2',
                levelValue: 'p',
                translateX: 20,
                translateY: 0,
                elements: [
                  { x: 0, y: 40, width: 10, height: 60 },
                  { x: 10, y: 60, width: 10, height: 40 },
                ],
              },
            ],
          },
        ],
      },
    ];
    expect(renderedData).toEqual(expectedRendering);
  });
});

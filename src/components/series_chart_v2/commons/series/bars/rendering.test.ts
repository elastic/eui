import { Dimensions } from '../../dimensions';
import { getGroupId, getSpecId } from '../../ids';
import { ScaleType } from '../../scales';
import { BarSeriesSpec } from '../specs';
import { computeDomains } from './domains';
import { renderBarSeriesSpec } from './rendering';

describe.only('Bar Spec Domain utils', () => {
  test('Should compute a 1Y bar series domain', () => {
    const spec: BarSeriesSpec = {
      id: getSpecId('spec1'),
      groupId: getGroupId('group1'),
      data: [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 10 }, { x: 3, y: 6 }],
      xAccessor: 'x',
      yAccessors: ['y'],
      xScaleType: ScaleType.Ordinal,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
    };
    const chartDims: Dimensions = {
      top: 0,
      left: 0,
      width: 100,
      height: 100,
    };
    const domains = computeDomains(spec);
    const renderedData = renderBarSeriesSpec(spec, domains, chartDims);

    const expectedRendering = [
      { x: 0,  y: 90, width: 25, height: 10 },
      { x: 25, y: 80, width: 25, height: 20 },
      { x: 50, y: 0, width: 25, height: 100 },
      { x: 75, y: 40, width: 25, height: 60 },
    ];
    expect(renderedData).toEqual(expectedRendering);
  });

  test('Should compute a 2Y bar series domain', () => {
    const spec: BarSeriesSpec = {
      id: getSpecId('spec1'),
      groupId: getGroupId('group1'),
      data: [
        { x: 0, y1: 1, y2: 3 },
        { x: 1, y1: 2, y2: 7 },
        { x: 2, y1: 1, y2: 2 },
        { x: 3, y1: 6, y2: 10 },
      ],
      xAccessor: 'x',
      yAccessors: [ 'y1', 'y2' ],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
    };
    const chartDims: Dimensions = {
      top: 0,
      left: 0,
      width: 160, // to easy compute spaces
      height: 100,
    };
    const domains = computeDomains(spec);
    const renderedData = renderBarSeriesSpec(spec, domains, chartDims);

    const expectedRendering = [
      {
        level: 0,
        accessor: 'x',
        levelValue: '0',
        translateX: 0,
        translateY: 0,
        elements: [
          { x: 0,  y: 90, width: 20, height: 10 },
          { x: 20, y: 70, width: 20, height: 30 },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '1',
        translateX: 40,
        translateY: 0,
        elements: [
          { x: 0,  y: 80, width: 20, height: 20 },
          { x: 20, y: 30, width: 20, height: 70 },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '2',
        translateX: 80,
        translateY: 0,
        elements: [
          { x: 0,  y: 90, width: 20, height: 10 },
          { x: 20, y: 80, width: 20, height: 20 },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '3',
        translateX: 120,
        translateY: 0,
        elements: [
          { x: 0,  y: 40, width: 20, height: 60 },
          { x: 20, y: 0, width: 20, height: 100 },
        ],
      },
    ];
    expect(renderedData).toEqual(expectedRendering);
  });
  test('Should compute a 1Y1G bar series domain', () => {
    const spec: BarSeriesSpec = {
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
    };
    const domains = computeDomains(spec);
    const chartDims: Dimensions = {
      top: 0,
      left: 0,
      width: 160, // to easy compute spaces
      height: 100,
    };
    const renderedData = renderBarSeriesSpec(spec, domains, chartDims);

    const expectedRendering = [
      {
        level: 0,
        accessor: 'x',
        levelValue: '0',
        translateX: 0,
        translateY: 0,
        elements: [
          { x: 0,  y: 90, width: 20, height: 10 },
          { x: 20, y: 90, width: 20, height: 10 },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '1',
        translateX: 40,
        translateY: 0,
        elements: [
          { x: 0,  y: 80, width: 20, height: 20 },
          { x: 20, y: 80, width: 20, height: 20 },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '2',
        translateX: 80,
        translateY: 0,
        elements: [
          { x: 0,  y: 0, width: 20, height: 100 },
          { x: 20, y: 0, width: 20, height: 100 },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '3',
        translateX: 120,
        translateY: 0,
        elements: [
          { x: 0,  y: 40, width: 20, height: 60 },
          { x: 20, y: 40, width: 20, height: 60 },
        ],
      },
    ];
    expect(renderedData).toEqual(expectedRendering);
  });
  test('Should compute a 1Y2G bar series domain', () => {
    const spec: BarSeriesSpec = {
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
    const domains = computeDomains(spec);
    const chartDims: Dimensions = {
      top: 0,
      left: 0,
      width: 160, // to easy compute spaces
      height: 100,
    };
    const renderedData = renderBarSeriesSpec(spec, domains, chartDims);
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
  test('Should compute a 2Y1G bar series domain', () => {
    const spec: BarSeriesSpec = {
      id: getSpecId('spec1'),
      groupId: getGroupId('group1'),
      data: [
        { x: 0, g: 'a', y1: 1, y2: 4},
        { x: 0, g: 'b', y1: 3, y2: 6},
        { x: 1, g: 'a', y1: 2, y2: 1},
        { x: 1, g: 'b', y1: 2, y2: 5},
        { x: 2, g: 'a', y1: 10, y2: 5},
        { x: 2, g: 'b', y1: 3, y2: 1},
        { x: 3, g: 'a', y1: 7, y2: 3},
        { x: 3, g: 'b', y1: 6, y2: 4},
      ],
      xAccessor: 'x',
      yAccessors: [ 'y1', 'y2' ],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      splitSeriesAccessors: ['g'],
    };
    const domains = computeDomains(spec);
    const chartDims: Dimensions = {
      top: 0,
      left: 0,
      width: 160, // to easy compute spaces
      height: 100,
    };
    const renderedData = renderBarSeriesSpec(spec, domains, chartDims);
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
            accessor: 'g',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              { x: 0,  y: 90, width: 10, height: 10 },
              { x: 10, y: 60, width: 10, height: 40 },
            ],
          },
          {
            level: 1,
            accessor: 'g',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0,  y: 70, width: 10, height: 30 },
              { x: 10, y: 40, width: 10, height: 60 },
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
            accessor: 'g',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              { x: 0,  y: 80, width: 10, height: 20 },
              { x: 10, y: 90, width: 10, height: 10 },
            ],
          },
          {
            level: 1,
            accessor: 'g',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0,  y: 80, width: 10, height: 20 },
              { x: 10, y: 50, width: 10, height: 50 },
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
            accessor: 'g',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              { x: 0,  y: 0, width: 10, height: 100 },
              { x: 10, y: 50, width: 10, height: 50 },
            ],
          },
          {
            level: 1,
            accessor: 'g',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0,  y: 70, width: 10, height: 30 },
              { x: 10, y: 90, width: 10, height: 10 },
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
            accessor: 'g',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              { x: 0,  y: 30, width: 10, height: 70 },
              { x: 10, y: 70, width: 10, height: 30 },
            ],
          },
          {
            level: 1,
            accessor: 'g',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0,  y: 40, width: 10, height: 60 },
              { x: 10, y: 60, width: 10, height: 40 },
            ],
          },
        ],
      },
    ];
    expect(renderedData).toEqual(expectedRendering);
  });
  test('Should compute a 1Y2GS bar series domain', () => {
    const spec: BarSeriesSpec = {
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
    const domains = computeDomains(spec);
    // console.log(JSON.stringify(domains));
    const chartDims: Dimensions = {
      top: 0,
      left: 0,
      width: 160, // to easy compute spaces
      height: 200,
    };
    const renderedData = renderBarSeriesSpec(spec, domains, chartDims);
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
              { x: 0,  y: 190, width: 20, height: 10 },
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
              { x: 0,  y: 190, width: 20, height: 10 },
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
              { x: 0,  y: 180, width: 20, height: 20 },
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
              { x: 0,  y: 180, width: 20, height: 20 },
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
              { x: 0,  y: 100, width: 20, height: 100 },
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
              { x: 0,  y: 100, width: 20, height: 100 },
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
              { x: 0,  y: 140, width: 20, height: 60 },
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
              { x: 0,  y: 140, width: 20, height: 60 },
              { x: 0, y: 80, width: 20, height: 60 },
            ],
          },
        ],
      },
    ];
    expect(renderedData).toEqual(expectedRendering);
  });
  test('Should compute a 2Y1GS bar series domain', () => {
    const spec: BarSeriesSpec = {
      id: getSpecId('spec1'),
      groupId: getGroupId('group1'),
      data: [
        { x: 0, g: 'a', y1: 1, y2: 4},
        { x: 0, g: 'b', y1: 3, y2: 6},
        { x: 1, g: 'a', y1: 2, y2: 1},
        { x: 1, g: 'b', y1: 2, y2: 5},
        { x: 2, g: 'a', y1: 10, y2: 5},
        { x: 2, g: 'b', y1: 3, y2: 1},
        { x: 3, g: 'a', y1: 7, y2: 3},
        { x: 3, g: 'b', y1: 6, y2: 4},
      ],
      xAccessor: 'x',
      yAccessors: [ 'y1', 'y2' ],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      splitSeriesAccessors: ['g'],
      stackAccessors: ['x', 'g'],
    };
    const domains = computeDomains(spec);
    const chartDims: Dimensions = {
      top: 0,
      left: 0,
      width: 160, // to easy compute spaces
      height: 150,
    };
    const renderedData = renderBarSeriesSpec(spec, domains, chartDims);
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
            accessor: 'g',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              { x: 0,  y: 140, width: 20, height: 10 },
              { x: 0, y: 100, width: 20, height: 40 },
            ],
          },
          {
            level: 1,
            accessor: 'g',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0,  y: 120, width: 20, height: 30 },
              { x: 0, y: 60, width: 20, height: 60 },
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
            accessor: 'g',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              { x: 0,  y: 130, width: 20, height: 20 },
              { x: 0, y: 120, width: 20, height: 10 },
            ],
          },
          {
            level: 1,
            accessor: 'g',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0,  y: 130, width: 20, height: 20 },
              { x: 0, y: 80, width: 20, height: 50 },
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
            accessor: 'g',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              { x: 0,  y: 50, width: 20, height: 100 },
              { x: 0, y: 0, width: 20, height: 50 },
            ],
          },
          {
            level: 1,
            accessor: 'g',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0,  y: 120, width: 20, height: 30 },
              { x: 0, y: 110, width: 20, height: 10 },
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
            accessor: 'g',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              { x: 0,  y: 80, width: 20, height: 70 },
              { x: 0, y: 50, width: 20, height: 30 },
            ],
          },
          {
            level: 1,
            accessor: 'g',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0,  y: 90, width: 20, height: 60 },
              { x: 0, y: 50, width: 20, height: 40 },
            ],
          },
        ],
      },
    ];
    expect(renderedData).toEqual(expectedRendering);
  });
  test('Should compute a 2Y2G bar series domain', () => {
    const spec: BarSeriesSpec = {
      id: getSpecId('spec1'),
      groupId: getGroupId('group1'),
      data: [
        { x: 0, g1: 'a', g2: 's', y1: 1, y2: 4},
        { x: 0, g1: 'a', g2: 'p', y1: 1, y2: 4},
        { x: 0, g1: 'b', g2: 's', y1: 3, y2: 6},
        { x: 0, g1: 'b', g2: 'p', y1: 3, y2: 6},
        { x: 1, g1: 'a', g2: 's', y1: 2, y2: 1},
        { x: 1, g1: 'a', g2: 'p', y1: 2, y2: 1},
        { x: 1, g1: 'b', g2: 's', y1: 2, y2: 5},
        { x: 1, g1: 'b', g2: 'p', y1: 2, y2: 5},
        { x: 2, g1: 'a', g2: 's', y1: 10, y2: 5},
        { x: 2, g1: 'a', g2: 'p', y1: 10, y2: 5},
        { x: 2, g1: 'b', g2: 's', y1: 3, y2: 1},
        { x: 2, g1: 'b', g2: 'p', y1: 3, y2: 1},
        { x: 3, g1: 'a', g2: 's', y1: 7, y2: 3},
        { x: 3, g1: 'a', g2: 'p', y1: 7, y2: 3},
        { x: 3, g1: 'b', g2: 's', y1: 6, y2: 4},
        { x: 3, g1: 'b', g2: 'p', y1: 6, y2: 4},
      ],
      xAccessor: 'x',
      yAccessors: [ 'y1', 'y2' ],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      splitSeriesAccessors: ['g1', 'g2'],
    };
    const domains = computeDomains(spec);
    const chartDims: Dimensions = {
      top: 0,
      left: 0,
      width: 320, // to easy compute spaces
      height: 100,
    };
    const renderedData = renderBarSeriesSpec(spec, domains, chartDims);
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
                  { x: 0,  y: 90, width: 10, height: 10 },
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
                  { x: 0,  y: 90, width: 10, height: 10 },
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
                  { x: 0,  y: 70, width: 10, height: 30 },
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
                  { x: 0,  y: 70, width: 10, height: 30 },
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
                  { x: 0,  y: 80, width: 10, height: 20 },
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
                  { x: 0,  y: 80, width: 10, height: 20 },
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
                  { x: 0,  y: 80, width: 10, height: 20 },
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
                  { x: 0,  y: 80, width: 10, height: 20 },
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
                  { x: 0,  y: 0, width: 10, height: 100 },
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
                  { x: 0,  y: 0, width: 10, height: 100 },
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
                  { x: 0,  y: 70, width: 10, height: 30 },
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
                  { x: 0,  y: 70, width: 10, height: 30 },
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
                  { x: 0,  y: 30, width: 10, height: 70 },
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
                  { x: 0,  y: 30, width: 10, height: 70 },
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
                  { x: 0,  y: 40, width: 10, height: 60 },
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
                  { x: 0,  y: 40, width: 10, height: 60 },
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
  test('Should compute a 2Y2GS bar series domain', () => {
    const spec: BarSeriesSpec = {
      id: getSpecId('spec1'),
      groupId: getGroupId('group1'),
      data: [
        { x: 0, g1: 'a', g2: 's', y1: 1, y2: 4},
        { x: 0, g1: 'a', g2: 'p', y1: 1, y2: 4},
        { x: 0, g1: 'b', g2: 's', y1: 3, y2: 6},
        { x: 0, g1: 'b', g2: 'p', y1: 3, y2: 6},
        { x: 1, g1: 'a', g2: 's', y1: 2, y2: 1},
        { x: 1, g1: 'a', g2: 'p', y1: 2, y2: 1},
        { x: 1, g1: 'b', g2: 's', y1: 2, y2: 5},
        { x: 1, g1: 'b', g2: 'p', y1: 2, y2: 5},
        { x: 2, g1: 'a', g2: 's', y1: 10, y2: 5},
        { x: 2, g1: 'a', g2: 'p', y1: 10, y2: 5},
        { x: 2, g1: 'b', g2: 's', y1: 3, y2: 1},
        { x: 2, g1: 'b', g2: 'p', y1: 3, y2: 1},
        { x: 3, g1: 'a', g2: 's', y1: 7, y2: 3},
        { x: 3, g1: 'a', g2: 'p', y1: 7, y2: 3},
        { x: 3, g1: 'b', g2: 's', y1: 6, y2: 4},
        { x: 3, g1: 'b', g2: 'p', y1: 6, y2: 4},
      ],
      xAccessor: 'x',
      yAccessors: [ 'y1', 'y2' ],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      splitSeriesAccessors: ['g1', 'g2'],
      stackAccessors: ['x', 'g1', 'g2'],
    };
    const domains = computeDomains(spec);
    const chartDims: Dimensions = {
      top: 0,
      left: 0,
      width: 160, // to easy compute spaces
      height: 150,
    };
    const renderedData = renderBarSeriesSpec(spec, domains, chartDims);
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
                  { x: 0, y: 140, width: 10, height: 10 },
                  { x: 0, y: 100, width: 10, height: 40 },
                ],
              },
              {
                level: 2,
                accessor: 'g2',
                levelValue: 'p',
                translateX: 10,
                translateY: 0,
                elements: [
                  { x: 0, y: 140, width: 10, height: 10 },
                  { x: 0, y: 100, width: 10, height: 40 },
                ],
              },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              {
                level: 2,
                accessor: 'g2',
                levelValue: 's',
                translateX: 0,
                translateY: 0,
                elements: [
                  { x: 0, y: 120, width: 10, height: 30 },
                  { x: 0, y: 60, width: 10, height: 60 },
                ],
              },
              {
                level: 2,
                accessor: 'g2',
                levelValue: 'p',
                translateX: 10,
                translateY: 0,
                elements: [
                  { x: 0, y: 120, width: 10, height: 30 },
                  { x: 0, y: 60, width: 10, height: 60 },
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
              {
                level: 2,
                accessor: 'g2',
                levelValue: 's',
                translateX: 0,
                translateY: 0,
                elements: [
                  { x: 0, y: 130, width: 10, height: 20 },
                  { x: 0, y: 120, width: 10, height: 10 },
                ],
              },
              {
                level: 2,
                accessor: 'g2',
                levelValue: 'p',
                translateX: 10,
                translateY: 0,
                elements: [
                  { x: 0, y: 130, width: 10, height: 20 },
                  { x: 0, y: 120, width: 10, height: 10 },
                ],
              },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              {
                level: 2,
                accessor: 'g2',
                levelValue: 's',
                translateX: 0,
                translateY: 0,
                elements: [
                  { x: 0, y: 130, width: 10, height: 20 },
                  { x: 0, y: 80, width: 10, height: 50 },
                ],
              },
              {
                level: 2,
                accessor: 'g2',
                levelValue: 'p',
                translateX: 10,
                translateY: 0,
                elements: [
                  { x: 0, y: 130, width: 10, height: 20 },
                  { x: 0, y: 80, width: 10, height: 50 },
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
                  { x: 0,  y: 50, width: 10, height: 100 },
                  { x: 0, y: 0, width: 10, height: 50 },
                ],
              },
              {
                level: 2,
                accessor: 'g2',
                levelValue: 'p',
                translateX: 10,
                translateY: 0,
                elements: [
                  { x: 0, y: 50, width: 10, height: 100 },
                  { x: 0, y: 0, width: 10, height: 50 },
                ],
              },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              {
                level: 2,
                accessor: 'g2',
                levelValue: 's',
                translateX: 0,
                translateY: 0,
                elements: [
                  { x: 0,  y: 120, width: 10, height: 30 },
                  { x: 0, y: 110, width: 10, height: 10 },
                ],
              },
              {
                level: 2,
                accessor: 'g2',
                levelValue: 'p',
                translateX: 10,
                translateY: 0,
                elements: [
                  { x: 0,  y: 120, width: 10, height: 30 },
                  { x: 0, y: 110, width: 10, height: 10 },
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
              {
                level: 2,
                accessor: 'g2',
                levelValue: 's',
                translateX: 0,
                translateY: 0,
                elements: [
                  { x: 0, y: 80, width: 10, height: 70 },
                  { x: 0, y: 50, width: 10, height: 30 },
                ],
              },
              {
                level: 2,
                accessor: 'g2',
                levelValue: 'p',
                translateX: 10,
                translateY: 0,
                elements: [
                  { x: 0, y: 80, width: 10, height: 70 },
                  { x: 0, y: 50, width: 10, height: 30 },
                ],
              },
            ],
          },
          {
            level: 1,
            accessor: 'g1',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              {
                level: 2,
                accessor: 'g2',
                levelValue: 's',
                translateX: 0,
                translateY: 0,
                elements: [
                  { x: 0,  y: 90, width: 10, height: 60 },
                  { x: 0, y: 50, width: 10, height: 40 },
                ],
              },
              {
                level: 2,
                accessor: 'g2',
                levelValue: 'p',
                translateX: 10,
                translateY: 0,
                elements: [
                  { x: 0, y: 90, width: 10, height: 60 },
                  { x: 0, y: 50, width: 10, height: 40 },
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

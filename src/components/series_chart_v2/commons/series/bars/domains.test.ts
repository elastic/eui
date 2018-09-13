import { getGroupId, getSpecId } from '../../ids';
import { ScaleType } from '../../scales';
import { BarSeriesSpec } from '../specs';
import { computeDomains, SpecDomains } from './domains';

describe.only('Bar Spec Domain utils', () => {
  test('Should compute a 1Y bar series domain', () => {
    const spec: BarSeriesSpec = {
      id: getSpecId('spec1'),
      groupId: getGroupId('group1'),
      data: [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 10 }, { x: 3, y: 6 }],
      xAccessor: 'x',
      yAccessors: 'y',
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
    };
    const domains = computeDomains(spec);
    const expectedDomains: SpecDomains = {
      x: [
        {
          level: 0,
          domain: [0, 3],
          scaleType: ScaleType.Linear,
        },
      ],
      y: [
        {
          level: 0,
          domain: [0, 10],
          scaleType: ScaleType.Linear,
          isStacked: false,
        },
      ],
    };
    expect(domains).toEqual(expectedDomains);
  });

  test('Should compute a 2Y bar series domain', () => {
    const spec: BarSeriesSpec = {
      id: getSpecId('spec1'),
      groupId: getGroupId('group1'),
      data: [
        { x: 0, y1: 1, y2: 3 },
        { x: 1, y1: 2, y2: 7 },
        { x: 2, y1: 1, y2: 2 },
        { x: 3, y1: 6, y2: 9 },
      ],
      xAccessor: 'x',
      yAccessors: [
        'y1',
        'y2',
      ],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
    };
    const domains = computeDomains(spec);
    // we will expect a 0 level x domain with ordinal type because
    // we have 2 y variables and they needs to be grouped along X
    const expectedDomains: SpecDomains = {
      x: [
        {
          level: 0,
          domain: [0, 1, 2, 3],
          scaleType: ScaleType.Ordinal,
        },
        {
          level: 1,
          domain: ['y1', 'y2'],
          scaleType: ScaleType.Ordinal,
        },
      ],
      y: [
        {
          level: 0,
          domain: [0, 9],
          scaleType: ScaleType.Linear,
          isStacked: false,
        },
      ],
    };
    expect(domains).toEqual(expectedDomains);
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
    const expectedDomains: SpecDomains = {
      x: [
        {
          level: 0,
          domain: [0, 1, 2, 3],
          scaleType: ScaleType.Ordinal, // transformation from linear to ordinal
        },
        {
          level: 1,
          domain: ['a', 'b'],
          scaleType: ScaleType.Ordinal,
        },
      ],
      y: [
        {
          level: 0,
          domain: [0, 10],
          scaleType: ScaleType.Linear,
          isStacked: false,
        },
      ],
    };
    expect(domains).toEqual(expectedDomains);
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
    const expectedDomains: SpecDomains = {
      x: [
        {
          level: 0,
          domain: [0, 1, 2, 3],
          scaleType: ScaleType.Ordinal, // transformation from linear to ordinal
        },
        {
          level: 1,
          domain: ['a', 'b'],
          scaleType: ScaleType.Ordinal,
        },
        {
          level: 2,
          domain: ['s', 'p'],
          scaleType: ScaleType.Ordinal,
        },
      ],
      y: [
        {
          level: 0,
          domain: [0, 10],
          scaleType: ScaleType.Linear,
          isStacked: false,
        },
      ],
    };
    expect(domains).toEqual(expectedDomains);
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
      yAccessors: [
        'y1',
        'y2',
      ],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      splitSeriesAccessors: 'g',
    };
    const domains = computeDomains(spec);
    const expectedDomains: SpecDomains = {
      x: [
        {
          level: 0,
          domain: [0, 1, 2, 3],
          scaleType: ScaleType.Ordinal, // transformation from linear to ordinal
        },
        {
          level: 1,
          domain: ['a', 'b'],
          scaleType: ScaleType.Ordinal,
        },
        {
          level: 2,
          domain: ['y1', 'y2'],
          scaleType: ScaleType.Ordinal,
        },
      ],
      y: [
        {
          level: 0,
          domain: [0, 10],
          scaleType: ScaleType.Linear,
          isStacked: false,
        },
      ],
    };
    expect(domains).toEqual(expectedDomains);
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
      yAccessors: 'y',
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      splitSeriesAccessors: ['g1'],
      stackAccessors: [ 'x', 'g1' ],
    };
    const domains = computeDomains(spec);
    const expectedDomains: SpecDomains = {
      x: [
        {
          level: 0,
          domain: [0, 1, 2, 3],
          scaleType: ScaleType.Ordinal, // transformation from linear to ordinal
        },
        {
          level: 1,
          domain: ['a', 'b'],
          scaleType: ScaleType.Ordinal,
        },
      ],
      y: [
        {
          level: 0,
          domain: [0, 20],
          scaleType: ScaleType.Linear,
          isStacked: true,
        },
      ],
    };
    expect(domains).toEqual(expectedDomains);
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
      yAccessors: [
        'y1',
        'y2',
      ],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      splitSeriesAccessors: ['g'],
      stackAccessors: [ 'x', 'g' ],
    };
    const domains = computeDomains(spec);
    const expectedDomains: SpecDomains = {
      x: [
        {
          level: 0,
          domain: [0, 1, 2, 3],
          scaleType: ScaleType.Ordinal, // transformation from linear to ordinal
        },
        {
          level: 1,
          domain: ['a', 'b'],
          scaleType: ScaleType.Ordinal,
        },
      ],
      y: [
        {
          level: 0,
          domain: [0, 15],
          scaleType: ScaleType.Linear,
          isStacked: true,
        },
      ],
    };
    expect(domains).toEqual(expectedDomains);
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
      yAccessors: [
        'y1',
        'y2',
      ],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      splitSeriesAccessors: ['g1', 'g2'],
    };
    const domains = computeDomains(spec);
    const expectedDomains: SpecDomains = {
      x: [
        {
          level: 0,
          domain: [0, 1, 2, 3],
          scaleType: ScaleType.Ordinal, // transformation from linear to ordinal
        },
        {
          level: 1,
          domain: ['a', 'b'],
          scaleType: ScaleType.Ordinal,
        },
        {
          level: 2,
          domain: ['s', 'p'],
          scaleType: ScaleType.Ordinal,
        },
        {
          level: 3,
          domain: ['y1', 'y2'],
          scaleType: ScaleType.Ordinal,
        },
      ],
      y: [
        {
          level: 0,
          domain: [0, 10],
          scaleType: ScaleType.Linear,
          isStacked: false,
        },
      ],
    };
    expect(domains).toEqual(expectedDomains);
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
      yAccessors: [
        'y1',
        'y2',
      ],
      xScaleType: ScaleType.Linear,
      yScaleType: ScaleType.Linear,
      yScaleToDataExtent: false,
      splitSeriesAccessors: ['g1', 'g2'],
      stackAccessors: ['x', 'g1', 'g2'],
    };
    const domains = computeDomains(spec);
    const expectedDomains: SpecDomains = {
      x: [
        {
          level: 0,
          domain: [0, 1, 2, 3],
          scaleType: ScaleType.Ordinal, // transformation from linear to ordinal
        },
        {
          level: 1,
          domain: ['a', 'b'],
          scaleType: ScaleType.Ordinal,
        },
        {
          level: 2,
          domain: ['s', 'p'],
          scaleType: ScaleType.Ordinal,
        },
      ],
      y: [
        {
          level: 0,
          domain: [0, 15],
          scaleType: ScaleType.Linear,
          isStacked: true,
        },
      ],
    };
    expect(domains).toEqual(expectedDomains);
  });
});

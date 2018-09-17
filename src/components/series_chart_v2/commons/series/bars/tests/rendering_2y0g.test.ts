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
  width: 160, // to easy compute spaces
  height: 100,
};

const SPEC: BarSeriesSpec = {
  id: getSpecId('spec1'),
  groupId: getGroupId('group1'),
  data: [
    { x: 0, y1: 1, y2: 3 },
    { x: 1, y1: 2, y2: 7 },
    { x: 2, y1: 1, y2: 2 },
    { x: 3, y1: 6, y2: 10 },
  ],
  xAccessor: 'x',
  yAccessors: ['y1', 'y2'],
  xScaleType: ScaleType.Linear,
  yScaleType: ScaleType.Linear,
  yScaleToDataExtent: false,
};

describe.only('Bar rendering 2Y0G', () => {
  let computedDomains: SpecDomains;

  test('should compute the domain', () => {
    computedDomains = computeDataDomain(SPEC);
    // we will expect a 0 level x domain with ordinal type because
    // we have 2 y variables and they needs to be grouped along X
    const expectedDomains: SpecDomains = {
      xDomains: [
        {
          accessor: 'x',
          level: 0,
          domain: [0, 1, 2, 3],
          scaleType: ScaleType.Ordinal,
        },
        {
          accessor: 'y',
          level: 1,
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
        elements: [{ x: 0, y: 90, width: 20, height: 10 }, { x: 20, y: 70, width: 20, height: 30 }],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '1',
        translateX: 40,
        translateY: 0,
        elements: [{ x: 0, y: 80, width: 20, height: 20 }, { x: 20, y: 30, width: 20, height: 70 }],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '2',
        translateX: 80,
        translateY: 0,
        elements: [{ x: 0, y: 90, width: 20, height: 10 }, { x: 20, y: 80, width: 20, height: 20 }],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '3',
        translateX: 120,
        translateY: 0,
        elements: [{ x: 0, y: 40, width: 20, height: 60 }, { x: 20, y: 0, width: 20, height: 100 }],
      },
    ];
    expect(renderedData).toEqual(expectedRendering);
  });
});

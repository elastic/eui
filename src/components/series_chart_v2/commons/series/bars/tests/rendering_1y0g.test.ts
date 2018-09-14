import { Dimensions } from '../../../dimensions';
import { getGroupId, getSpecId } from '../../../ids';
import { ScaleType } from '../../../scales';
import { BarSeriesSpec } from '../../specs';
import { computeDomains, SpecDomains } from '../domains';
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

describe.only('Bar rendering 1Y0G', () => {
  let computedDomains: SpecDomains;
  test('should compute the domain', () => {
    computedDomains = computeDomains(SPEC);
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
    };
    expect(computedDomains).toEqual(expectedDomains);
  });

  test('should render the bar series', () => {
    const renderedData = renderBarSeriesSpec(SPEC, computedDomains, CHART_DIMS);
    const expectedRendering = [
      { x: 0, y: 90, width: 25, height: 10 },
      { x: 25, y: 80, width: 25, height: 20 },
      { x: 50, y: 0, width: 25, height: 100 },
      { x: 75, y: 40, width: 25, height: 60 },
    ];
    expect(renderedData).toEqual(expectedRendering);
  });
});

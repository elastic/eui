import { ColorConfig, ScalesConfig } from '../../../themes/theme';
import { Dimensions } from '../../../utils/dimensions';
import { SpecDomains } from '../../../utils/domain';
import { getGroupId, getSpecId } from '../../../utils/ids';
import { ScaleType } from '../../../utils/scales';
import { BarSeriesSpec } from '../../specs';
import { computeDataDomain } from '../domains';
import { renderBarSeriesSpec } from '../rendering';

const CHART_DIMS: Dimensions = {
  top: 0,
  left: 0,
  width: 160,
  height: 100,
};

const chartScalesConfig: ScalesConfig = {
  ordinal: {
      padding: 0,
    },
  };
const chartColorsConfig: ColorConfig = {
  vizColors: ['color1', 'color2'],
  defaultVizColor: 'red',
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
};

describe('Bar rendering 1Y1G', () => {
  let computedDimensions: SpecDomains;

  test('should compute the domain', () => {
    computedDimensions = computeDataDomain(SPEC);
    expect(computedDimensions).toMatchSnapshot();
  });

  test('should render the bar series', () => {
    const renderedData = renderBarSeriesSpec(
      SPEC,
      computedDimensions,
      CHART_DIMS,
      0,
      colorScales,
      chartColorsConfig,
      chartScalesConfig,
    );
    expect(renderedData).toMatchSnapshot();
  });
});

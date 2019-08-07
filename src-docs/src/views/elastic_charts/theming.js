import React, { Component, Fragment } from 'react';
import { withTheme } from '../../components';
import {
  Chart,
  Settings,
  Axis,
  LineSeries,
  BarSeries,
  mergeWithDefaultTheme,
  DataGenerator,
} from '@elastic/charts';

import {
  EUI_DARK_THEME,
  EUI_LIGHT_THEME,
} from '../../../../src/themes/charts/themes';

import { colorPalette } from '../../../../src/services';

class _Theming extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartType: 'LineSeries',
    };
  }

  onMultiChange = multiObject => {
    this.setState({
      ...multiObject,
    });
  };

  onChartTypeChange = chartType => {
    this.setState({
      chartType: chartType,
    });
  };

  render() {
    const dg = new DataGenerator();
    const data1 = dg.generateGroupedSeries(20, 1);
    const data2 = dg.generateGroupedSeries(20, 5);

    const isDarkTheme = this.props.theme.includes('dark');
    const theme = isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme;

    const gridHorizontalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridHorizontalSettings
      : EUI_LIGHT_THEME.gridHorizontalSettings;
    const gridVerticalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridVerticalSettings
      : EUI_LIGHT_THEME.gridVerticalSettings;

    const customColors = mergeWithDefaultTheme(
      {
        colors: {
          vizColors: colorPalette('#FFFFE0', '#017F75', 5),
        },
      },
      theme
    );

    const data1CustomSeriesColors = new Map();
    const data1DataSeriesColorValues = {
      colorValues: [],
      specId: 'control',
    };
    data1CustomSeriesColors.set(data1DataSeriesColorValues, 'black');

    return (
      <Fragment>
        <Chart size={[undefined, 200]}>
          <Settings
            theme={customColors}
            showLegend={false}
            showLegendDisplayValue={false}
          />
          <BarSeries
            id="status"
            name="Status"
            data={data2}
            xAccessor={'x'}
            yAccessors={['y']}
            splitSeriesAccessors={['g']}
            stackAccessors={['g']}
          />
          <LineSeries
            id="control"
            name="Control"
            data={data1}
            xAccessor={'x'}
            yAccessors={['y']}
            customSeriesColors={data1CustomSeriesColors}
          />
          <Axis
            id="bottom-axis"
            position="bottom"
            showGridLines
            gridLineStyle={gridVerticalSettings}
          />
          <Axis
            id="left-axis"
            position="left"
            showGridLines
            gridLineStyle={gridHorizontalSettings}
          />
        </Chart>
      </Fragment>
    );
  }
}

export const Theming = withTheme(_Theming);

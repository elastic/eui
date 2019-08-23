import React, { Component, Fragment } from 'react';
import { withTheme } from '../../components';
import {
  Chart,
  Settings,
  Axis,
  LineSeries,
  BarSeries,
  DataGenerator,
} from '@elastic/charts';

import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
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
    const theme = isDarkTheme
      ? EUI_CHARTS_THEME_DARK.theme
      : EUI_CHARTS_THEME_LIGHT.theme;

    const gridHorizontalSettings = isDarkTheme
      ? EUI_CHARTS_THEME_DARK.gridHorizontalSettings
      : EUI_CHARTS_THEME_LIGHT.gridHorizontalSettings;
    const gridVerticalSettings = isDarkTheme
      ? EUI_CHARTS_THEME_DARK.gridVerticalSettings
      : EUI_CHARTS_THEME_LIGHT.gridVerticalSettings;

    const customColors = {
      colors: {
        vizColors: colorPalette('#FFFFE0', '#017F75', 5),
      },
    };

    const data1CustomSeriesColors = new Map();
    const data1DataSeriesColorValues = {
      colorValues: [],
      specId: 'control',
    };
    data1CustomSeriesColors.set(data1DataSeriesColorValues, 'black');

    return (
      <Fragment>
        <Chart size={{ height: 200 }}>
          <Settings
            theme={[customColors, theme]}
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

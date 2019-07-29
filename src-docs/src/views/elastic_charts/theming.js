import React, { Component, Fragment } from 'react';
import { withTheme } from '../../components';
import {
  Chart,
  getSpecId,
  Settings,
  Axis,
  getAxisId,
  Position,
  ScaleType,
  mergeWithDefaultTheme,
  DataGenerator,
} from '@elastic/charts';

import {
  EUI_DARK_THEME,
  EUI_LIGHT_THEME,
} from '../../../../src/themes/charts/themes';

import {
  EuiSpacer,
  EuiTitle,
  EuiFlexGrid,
  EuiFlexItem,
} from '../../../../src/components';

import { CHART_COMPONENTS, MultiChartCard, ChartTypeCard } from './shared';
import { colorPalette } from '../../../../src/services';

class _Theming extends Component {
  constructor(props) {
    super(props);

    this.idPrefix = 'chartType';

    this.state = {
      multi: false,
      stacked: false,
      chartType: 'BarSeries',
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
    const data1 = dg.generateGroupedSeries(20, 5);
    console.table(data1);

    const isDarkTheme = this.props.theme.includes('dark');
    const theme = isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme;
    const gridHorizontalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridHorizontalSettings
      : EUI_LIGHT_THEME.gridHorizontalSettings;
    const gridVerticalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridVerticalSettings
      : EUI_LIGHT_THEME.gridVerticalSettings;

    const ChartType = CHART_COMPONENTS[this.state.chartType];

    const customColors = mergeWithDefaultTheme(
      {
        colors: {
          vizColors: colorPalette('#58BA6D', '#D75949', 5),
        },
      },
      theme
    );

    return (
      <Fragment>
        <EuiTitle size="xxs">
          <h3>
            Number of {!this.state.multi && 'financial '}robo-calls
            {this.state.multi && ' by type'}
          </h3>
        </EuiTitle>

        <EuiSpacer size="s" />

        <Chart size={[undefined, 200]}>
          <Settings
            theme={customColors}
            showLegend={this.state.multi}
            legendPosition={Position.Right}
          />
          <ChartType
            id={getSpecId('status')}
            data={data1}
            xAccessor={'x'}
            yAccessors={['y']}
            splitSeriesAccessors={this.state.multi ? ['g'] : undefined}
            stackAccessors={this.state.stacked ? ['g'] : undefined}
          />
          <Axis
            id={getAxisId('bottom-axis')}
            position={Position.Bottom}
            xScaleType={ScaleType.Ordinal}
            showGridLines
            gridLineStyle={gridVerticalSettings}
          />
          <Axis
            id={getAxisId('left-axis')}
            position={Position.Left}
            showGridLines
            gridLineStyle={gridHorizontalSettings}
          />
        </Chart>

        <EuiSpacer />

        <EuiFlexGrid columns={3}>
          <EuiFlexItem>
            <ChartTypeCard onChange={this.onChartTypeChange} />
          </EuiFlexItem>

          <EuiFlexItem>
            <MultiChartCard onChange={this.onMultiChange} />
          </EuiFlexItem>
        </EuiFlexGrid>
      </Fragment>
    );
  }
}

export const Theming = withTheme(_Theming);

import React, { Component, Fragment } from 'react';
import { withTheme } from '../../components';
import {
  Chart,
  BarSeries,
  getSpecId,
  Settings,
  Axis,
  getAxisId,
  Position,
  ScaleType,
  timeFormatter,
  niceTimeFormatByDay,
  LineSeries,
  AreaSeries,
} from '@elastic/charts';

import {
  EUI_DARK_THEME,
  EUI_LIGHT_THEME,
} from '../../../../src/themes/charts/themes';

import {
  // EuiCard,
  // EuiCopy,
  EuiSwitch,
  EuiSpacer,
  EuiPanel,
  EuiButtonGroup,
  EuiTitle,
} from '../../../../src/components';

import {
  formatDate,
  dateFormatAliases,
} from '../../../../src/services/format/format_date';

import { TIME_DATA, TIME_DATA_2 } from './data';

class _TimeChart extends Component {
  constructor(props) {
    super(props);

    const idPrefix = 'chartType';
    this.toggleButtonsIcons = [
      {
        id: `${idPrefix}0`,
        label: 'Bar chart',
        iconType: 'visBarVertical',
      },
      {
        id: `${idPrefix}1`,
        label: 'Line chart',
        iconType: 'visLine',
      },
      {
        id: `${idPrefix}2`,
        label: 'Area chart',
        iconType: 'visArea',
      },
    ];

    this.state = {
      multi: false,
      stacked: false,
      toggleIdSelected: `${idPrefix}0`,
    };
  }

  onStackedChange = e => {
    this.setState({
      stacked: e.target.checked,
    });
  };

  onMultiChange = e => {
    this.setState({
      multi: e.target.checked,
    });
  };

  onChartTypeChange = optionId => {
    this.setState({
      toggleIdSelected: optionId,
    });
  };

  render() {
    const isDarkTheme = this.props.theme.includes('dark');
    const theme = isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme;
    const gridHorizontalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridHorizontalSettings
      : EUI_LIGHT_THEME.gridHorizontalSettings;
    const gridVerticalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridVerticalSettings
      : EUI_LIGHT_THEME.gridVerticalSettings;

    const formatter = timeFormatter(niceTimeFormatByDay(1));
    let ChartType;
    switch (this.state.toggleIdSelected) {
      case 'chartType0':
        ChartType = BarSeries;
        break;
      case 'chartType1':
        ChartType = LineSeries;
        break;
      case 'chartType2':
        ChartType = AreaSeries;
        break;
    }

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
            theme={theme}
            showLegend={this.state.multi}
            legendPosition={Position.Right}
          />
          <ChartType
            id={getSpecId('time1')}
            name={'Financial'}
            data={TIME_DATA}
            xAccessor={0}
            yAccessors={[1]}
            stackAccessors={this.state.stacked ? [0] : undefined}
          />
          {this.state.multi && (
            <ChartType
              id={getSpecId('time2')}
              name={'Tech support'}
              data={TIME_DATA_2}
              xAccessor={0}
              yAccessors={[1]}
              stackAccessors={this.state.stacked ? [0] : undefined}
            />
          )}
          <Axis
            title={formatDate(Date.now(), dateFormatAliases.date)}
            id={getAxisId('bottom-axis')}
            position={Position.Bottom}
            xScaleType={ScaleType.Time}
            tickFormat={formatter}
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

        <EuiPanel>
          <EuiSwitch
            label="Multi-series"
            checked={this.state.multi}
            onChange={this.onMultiChange}
          />
          &emsp;
          <EuiSwitch
            label="Stacked"
            checked={this.state.stacked}
            onChange={this.onStackedChange}
            disabled={!this.state.multi}
          />
          &emsp;
          <EuiButtonGroup
            legend="Chart type"
            options={this.toggleButtonsIcons}
            idSelected={this.state.toggleIdSelected}
            onChange={this.onChartTypeChange}
            isIconOnly
          />
        </EuiPanel>
      </Fragment>
    );
  }
}

export const TimeChart = withTheme(_TimeChart);

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
  EuiRadioGroup,
  EuiTitle,
  EuiFlexGrid,
  EuiFlexItem,
  EuiCard,
} from '../../../../src/components';

import {
  formatDate,
  dateFormatAliases,
} from '../../../../src/services/format/format_date';

import { TIME_DATA, TIME_DATA_2 } from './data';

class _Sparklines extends Component {
  constructor(props) {
    super(props);

    this.idPrefix = 'chartType';

    this.state = {
      multi: false,
      stacked: false,
      toggleIdSelected: `${this.idPrefix}0`,
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
    this.toggleButtonsIcons = [
      {
        id: `${this.idPrefix}0`,
        label: 'BarSeries',
      },
      {
        id: `${this.idPrefix}1`,
        label: 'LineSeries',
      },
      {
        id: `${this.idPrefix}2`,
        label: 'AreaSeries',
      },
      {
        id: `${this.idPrefix}3`,
        label: 'Mixed',
        disabled: !this.state.multi,
      },
    ];

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
    let ChartType2;
    switch (this.state.toggleIdSelected) {
      case 'chartType0':
        ChartType = BarSeries;
        ChartType2 = BarSeries;
        break;
      case 'chartType1':
        ChartType = LineSeries;
        ChartType2 = LineSeries;
        break;
      case 'chartType2':
        ChartType = AreaSeries;
        ChartType2 = AreaSeries;
        break;
      case 'chartType3':
        ChartType = BarSeries;
        ChartType2 = LineSeries;
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
            <ChartType2
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

        <EuiFlexGrid
          columns={3}
          className="euiGuide__chartsPageCrosshairSection">
          {/* <EuiFlexItem>
            <EuiCard
              textAlign="left"
              title="Titles"
              description="Provide a meaningful, descriptive title. The title may need to change when show single vs multiple series."
            />
          </EuiFlexItem> */}

          <EuiFlexItem>
            <EuiCard
              textAlign="left"
              title="Chart types"
              description="Time series charts can be displayed as any x/y series type.">
              <EuiRadioGroup
                compressed
                options={this.toggleButtonsIcons}
                idSelected={this.state.toggleIdSelected}
                onChange={this.onChartTypeChange}
              />
            </EuiCard>
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiCard
              textAlign="left"
              title="Single vs multiple series"
              description="Legends are only necessary when there are multiple series. Stacked series indicates accumulation. Do not stack line charts.">
              <EuiSwitch
                label="Show multi-series"
                checked={this.state.multi}
                onChange={this.onMultiChange}
              />
              <EuiSpacer size="s" />
              <EuiSwitch
                label="Stacked"
                checked={this.state.stacked}
                onChange={this.onStackedChange}
                disabled={!this.state.multi}
              />
            </EuiCard>
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiCard
              textAlign="left"
              title="Tick marks"
              description="If the tick marks all share a portion of their date, eg they're all on the same day, format the ticks to only display the disparate portions of the timestamp and show the common portion as the axis title."
            />
          </EuiFlexItem>
        </EuiFlexGrid>
      </Fragment>
    );
  }
}

export const Sparklines = withTheme(_Sparklines);

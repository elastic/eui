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
} from '@elastic/charts';

import {
  EUI_DARK_THEME,
  EUI_LIGHT_THEME,
} from '../../../../src/themes/charts/themes';

import {
  EuiSwitch,
  EuiSpacer,
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
import { ChartTypeCard } from './shared';

class _TimeChart extends Component {
  constructor(props) {
    super(props);

    this.idPrefix = 'chartType';

    this.state = {
      multi: false,
      stacked: false,
      chartType: BarSeries,
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

  onChartTypeChange = chartType => {
    this.setState({
      chartType: chartType,
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
    let ChartType = this.state.chartType;
    let ChartType2 = this.state.chartType;
    if (this.state.chartType === 'Mixed') {
      ChartType = BarSeries;
      ChartType2 = LineSeries;
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
          <EuiFlexItem>
            <ChartTypeCard
              onChange={this.onChartTypeChange}
              mixed={this.state.multi ? 'enabled' : 'disabled'}
            />
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

export const TimeChart = withTheme(_TimeChart);

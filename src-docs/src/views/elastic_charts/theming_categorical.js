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
  EuiCard,
  EuiFlexGrid,
  EuiFlexItem,
  EuiSelect,
  EuiFormRow,
  EuiRange,
  EuiCopy,
  EuiSwitch,
  EuiButton,
} from '../../../../src/components';

import { CHART_COMPONENTS } from './shared';
import { palettes } from '../../../../src/services';

class _Categorical extends Component {
  constructor(props) {
    super(props);

    this.paletteOptions = [
      { value: 'euiPaletteColorBlind', text: 'euiPaletteColorBlind' },
      { value: 'euiPaletteForStatus', text: 'euiPaletteForStatus' },
    ];

    this.state = {
      multi: true,
      grouped: false,
      chartType: 'LineSeries',
      palette: this.paletteOptions[0].value,
      numCharts: '3',
    };
  }

  onNumChartsChange = e => {
    this.setState({
      numCharts: e.target.value,
    });
  };

  onPaletteChange = e => {
    this.setState({
      palette: e.target.value,
    });
  };

  onGroupChange = e => {
    this.setState({
      grouped: e.target.checked,
    });
  };

  render() {
    const dg = new DataGenerator();
    const isDarkTheme = this.props.theme.includes('dark');
    const theme = isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme;
    const gridHorizontalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridHorizontalSettings
      : EUI_LIGHT_THEME.gridHorizontalSettings;
    const gridVerticalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridVerticalSettings
      : EUI_LIGHT_THEME.gridVerticalSettings;

    const ChartType = CHART_COMPONENTS[this.state.chartType];

    const isBadChart =
      this.state.palette === this.paletteOptions[1].value ||
      this.state.numCharts > 5;

    const customColors = mergeWithDefaultTheme(
      {
        colors: {
          vizColors:
            this.state.palette === 'euiPaletteColorBlind'
              ? palettes.euiPaletteColorBlind.colors
              : palettes.euiPaletteForStatus.colors,
        },
      },
      theme
    );

    let data1;
    let data2;
    let data3;
    let data4;

    let chart1;
    let chart2;
    let chart3;
    let chart4;
    let customLegend;

    if (!this.state.grouped) {
      data1 = dg.generateGroupedSeries(20, Number(this.state.numCharts));

      chart1 = (
        <ChartType
          id={getSpecId('data1')}
          name="0"
          data={data1}
          xAccessor={'x'}
          yAccessors={['y']}
          splitSeriesAccessors={['g']}
        />
      );
    } else {
      data1 = dg.generateGroupedSeries(20, 1);
      data2 = dg.generateGroupedSeries(20, 1).map(item => {
        item.y += 5;
        return item;
      });
      data3 = dg.generateGroupedSeries(20, 1).map(item => {
        item.y += 10;
        return item;
      });
      data4 = dg.generateGroupedSeries(20, 1).map(item => {
        item.y += 15;
        return item;
      });

      const data1CustomSeriesColors = new Map();
      const data1DataSeriesColorValues = {
        colorValues: [],
        specId: getSpecId('data1'),
      };
      data1CustomSeriesColors.set(
        data1DataSeriesColorValues,
        palettes.euiPaletteColorBlind.colors[0]
      );

      const data2CustomSeriesColors = new Map();
      const data2DataSeriesColorValues = {
        colorValues: [],
        specId: getSpecId('data2'),
      };
      data2CustomSeriesColors.set(
        data2DataSeriesColorValues,
        palettes.euiPaletteColorBlind.colors[0]
      );

      const data3CustomSeriesColors = new Map();
      const data3DataSeriesColorValues = {
        colorValues: [],
        specId: getSpecId('data3'),
      };
      data3CustomSeriesColors.set(
        data3DataSeriesColorValues,
        palettes.euiPaletteColorBlind.colors[1]
      );

      const data4CustomSeriesColors = new Map();
      const data4DataSeriesColorValues = {
        colorValues: [],
        specId: getSpecId('data4'),
      };
      data4CustomSeriesColors.set(
        data4DataSeriesColorValues,
        palettes.euiPaletteColorBlind.colors[1]
      );

      chart1 = (
        <ChartType
          id={getSpecId('data1')}
          name="Series 1"
          data={data1}
          xAccessor={'x'}
          yAccessors={['y']}
          customSeriesColors={data1CustomSeriesColors}
          lineSeriesStyle={{
            line: {
              strokeWidth: 1,
            },
            point: {
              visible: false,
            },
          }}
        />
      );

      chart2 = (
        <ChartType
          id={getSpecId('data2')}
          name="Series 1"
          data={data2}
          xAccessor={'x'}
          yAccessors={['y']}
          customSeriesColors={data2CustomSeriesColors}
          hideInLegend={true}
          lineSeriesStyle={{
            line: {
              strokeWidth: 6,
            },
          }}
        />
      );

      chart3 = (
        <ChartType
          id={getSpecId('data3')}
          name="Series 2"
          data={data3}
          xAccessor={'x'}
          yAccessors={['y']}
          customSeriesColors={data3CustomSeriesColors}
          lineSeriesStyle={{
            line: {
              strokeWidth: 1,
            },
            point: {
              visible: false,
            },
          }}
        />
      );

      chart4 = (
        <ChartType
          id={getSpecId('data4')}
          name="Series 2"
          data={data4}
          xAccessor={'x'}
          yAccessors={['y']}
          customSeriesColors={data4CustomSeriesColors}
          hideInLegend={true}
          lineSeriesStyle={{
            line: {
              strokeWidth: 6,
            },
          }}
        />
      );

      customLegend = (
        <dl
          style={{
            fontSize: 12,
            position: 'absolute',
            width: 200,
            right: 0,
            bottom: 0,
            padding: 4,
          }}>
          <span
            style={{
              display: 'inline-block',
              width: 16,
              height: 6,
              backgroundColor: 'currentColor',
              verticalAlign: 'middle',
            }}
          />
          &emsp;
          <span>Actual</span>
          <br />
          <br />
          <span
            style={{
              display: 'inline-block',
              width: 16,
              height: 1,
              backgroundColor: 'currentColor',
              verticalAlign: 'middle',
            }}
          />
          &emsp;
          <span>Projected</span>
        </dl>
      );
    }

    return (
      <Fragment>
        <div style={{ position: 'relative' }}>
          <Chart size={[undefined, 200]}>
            <Settings
              theme={customColors}
              showLegend={this.state.multi}
              legendPosition={Position.Right}
              showLegendDisplayValue={false}
            />
            {chart1}
            {chart2}
            {chart3}
            {chart4}
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
          {customLegend}
        </div>

        <EuiSpacer />

        <EuiFlexGrid columns={3}>
          <EuiFlexItem>
            <EuiCard
              textAlign="left"
              title="Palettes"
              description="For contrasting data, use the color blind safe palette of contrasting colors.">
              <EuiFormRow>
                <EuiSelect
                  options={this.paletteOptions}
                  value={
                    this.state.grouped
                      ? this.paletteOptions[0].value
                      : this.state.palette
                  }
                  disabled={this.state.grouped}
                  onChange={this.onPaletteChange}
                  aria-label="Palette"
                />
              </EuiFormRow>
            </EuiCard>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              textAlign="left"
              title="Number of series"
              description="Do not use too many colors in a single chart as this will hinder understanding.">
              <EuiFormRow
                helpText={
                  <span id="levelsHelp3">
                    Recommended number of series is 5 or less.
                  </span>
                }>
                <EuiRange
                  min={1}
                  max={10}
                  showTicks
                  value={this.state.grouped ? '4' : this.state.numCharts}
                  disabled={this.state.grouped}
                  onChange={this.onNumChartsChange}
                  levels={[
                    { min: 1, max: 5.5, color: 'success' },
                    { min: 5.5, max: 10, color: 'danger' },
                  ]}
                  aria-describedby="levelsHelp3"
                  aria-label="Number of series"
                />
              </EuiFormRow>
            </EuiCard>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              textAlign="left"
              title="Grouping data"
              description="If the series' are or can be combined into logical groups, use contrasting shapes/styles but keep the same color for within groups.">
              <EuiSwitch
                label="Show grouped"
                checked={this.state.grouped}
                onChange={this.onGroupChange}
              />
            </EuiCard>
          </EuiFlexItem>
        </EuiFlexGrid>
        <EuiSpacer />

        <div className="eui-textCenter">
          <EuiCopy textToCopy={'<Chart size={[undefined, 200]}></Chart>'}>
            {copy => (
              <EuiButton
                disabled={isBadChart}
                fill
                onClick={copy}
                iconType="copyClipboard">
                {isBadChart
                  ? "Bad chart, don't copy"
                  : 'Copy code of current configuration'}
              </EuiButton>
            )}
          </EuiCopy>
        </div>
      </Fragment>
    );
  }
}

export const Categorical = withTheme(_Categorical);

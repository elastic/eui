import React, { Component, Fragment } from 'react';
import { find } from 'lodash';
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
  EuiFormRow,
  EuiRange,
  EuiCopy,
  EuiSwitch,
  EuiButton,
  EuiRadioGroup,
} from '../../../../src/components';

import { CHART_COMPONENTS } from './shared';
import { colorPalette, palettes } from '../../../../src/services';

class _Categorical extends Component {
  constructor(props) {
    super(props);

    this.idPrefix = 'colorType';

    this.colorTypeRadios = [
      {
        id: `${this.idPrefix}3`,
        label: 'Category',
      },
      {
        id: `${this.idPrefix}0`,
        label: 'Quantity',
      },
      {
        id: `${this.idPrefix}1`,
        label: 'Trend',
      },
      {
        id: `${this.idPrefix}2`,
        label: 'Highlight',
      },
    ];

    this.state = {
      grouped: false,
      colorTypeIdSelected: this.colorTypeRadios[0].id,
      colorType: this.colorTypeRadios[0].label,
      numCharts: '3',
    };
  }

  onNumChartsChange = e => {
    this.setState({
      numCharts: e.target.value,
    });
  };

  onColorTypeChange = optionId => {
    const colorType = find(this.colorTypeRadios, { id: optionId }).label;
    this.setState({
      colorTypeIdSelected: optionId,
      colorType,
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

    let ChartType = CHART_COMPONENTS.LineSeries;

    const isBadChart = this.state.numCharts > 5;

    let vizColors = palettes.euiPaletteForLightBackground.colors;
    let firstColor;
    let lastColor;

    switch (this.state.colorType) {
      case 'Highlight':
        firstColor = '#D3DAE6';
        lastColor = '#98A2B3';
        vizColors = colorPalette(firstColor, lastColor, this.state.numCharts);
        vizColors[vizColors.length - 1] =
          palettes.euiPaletteColorBlind.colors[2];
        break;
      case 'Trend':
        ChartType = CHART_COMPONENTS.BarSeries;
        firstColor = palettes.euiPaletteForStatus.colors[0];
        lastColor =
          palettes.euiPaletteForStatus.colors[
            palettes.euiPaletteForStatus.colors.length - 1
          ];

        const half = Math.round(this.state.numCharts / 2);

        if (half < 2) {
          vizColors = [firstColor, lastColor];
          break;
        } else {
          let firstHalf = colorPalette(firstColor, '#98A2B3', half);
          let lastHalf = colorPalette('#98A2B3', lastColor, half);

          if (Number(this.state.numCharts % 2)) {
            // Number is odd
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const removeFirstColor = lastHalf.shift();
          } else {
            firstHalf = colorPalette(firstColor, '#98A2B3', half + 1);
            lastHalf = colorPalette('#98A2B3', lastColor, half + 1);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const removeFirstColor = lastHalf.shift();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const removeLastColor = firstHalf.pop();
          }
          vizColors = [...firstHalf, ...lastHalf];
          break;
        }
      case 'Quantity':
        ChartType = CHART_COMPONENTS.BarSeries;
        firstColor = '#FFFFFF';
        lastColor = palettes.euiPaletteColorBlind.colors[0];
        vizColors = colorPalette(
          firstColor,
          lastColor,
          Number(this.state.numCharts) + 1
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const removeFirstColor = vizColors.shift();
        break;
      default:
        break;
    }

    const customColors = mergeWithDefaultTheme(
      {
        colors: { vizColors },
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
          stackAccessors={
            ChartType === CHART_COMPONENTS.BarSeries ? ['g'] : undefined
          }
        />
      );
    } else {
      ChartType = CHART_COMPONENTS.LineSeries;
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
              showLegend={true}
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
              title="Color types"
              description="Coloring multi-series non-categorical charts can have different connotations.">
              <EuiRadioGroup
                compressed
                options={this.colorTypeRadios}
                idSelected={
                  this.state.grouped
                    ? this.colorTypeRadios[0].id
                    : this.state.colorTypeIdSelected
                }
                onChange={this.onColorTypeChange}
                disabled={this.state.grouped}
              />
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
                  value={this.state.grouped ? '2' : this.state.numCharts}
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

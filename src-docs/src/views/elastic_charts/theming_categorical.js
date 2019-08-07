/* eslint-disable no-nested-ternary */
import React, { Component, Fragment } from 'react';
import { find } from 'lodash';
import { withTheme } from '../../components';
import {
  Chart,
  Settings,
  Axis,
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
  EuiIcon,
  EuiTitle,
} from '../../../../src/components';

import { CHART_COMPONENTS, createSpectrum } from './shared';
import { palettes } from '../../../../src/services';

class _Categorical extends Component {
  constructor(props) {
    super(props);

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

    const isBadChart = !this.state.grouped && this.state.numCharts > 5;
    const isComplicatedChart = this.state.grouped;
    let showLegend = this.state.numCharts > 1;

    let data1 = dg.generateGroupedSeries(20, Number(this.state.numCharts));
    let dataString = '[{x: 1, y: 5.5, g: 0}]';
    let data2;
    let data3;
    let data4;

    let chart1;
    let chart2;
    let chart3;
    let chart4;
    let customLegend;
    let customTitle;

    let vizColors = palettes.euiPaletteColorBlind.colors;

    switch (this.state.colorType) {
      case 'Highlight':
        const highlightColor = palettes.euiPaletteColorBlind.colors[2];
        if (this.state.numCharts < 2) {
          vizColors = [highlightColor];
          break;
        }
        vizColors = createSpectrum(
          ['#D3DAE6', '#98A2B3'],
          this.state.numCharts
        );
        vizColors[vizColors.length - 1] = highlightColor;
        customTitle = (
          <EuiTitle size="xxs">
            <h4>
              <EuiIcon type="dot" color={highlightColor} /> My number of issues
              compared to others
            </h4>
          </EuiTitle>
        );
        showLegend = false;
        break;
      case 'Trend':
        ChartType = CHART_COMPONENTS.BarSeries;
        vizColors = createSpectrum(
          ['#58ba6d', '#ebdf62', '#d75949'],
          Number(this.state.numCharts)
        );
        // convert series labels to better/worse
        const oddSeries = this.state.numCharts % 2;
        const numOfHalf = Math.floor(this.state.numCharts / 2);
        data1 = data1.map(item => {
          const index = Number(item.g);
          let howManyErs;
          if (oddSeries && index === numOfHalf) {
            item.g = 'Meh';
          } else if (index < numOfHalf) {
            howManyErs = numOfHalf - (index + 1);
            item.g = `Better${'er'.repeat(howManyErs)}`;
          } else if (index >= numOfHalf) {
            howManyErs = index - numOfHalf;
            if (oddSeries) {
              howManyErs -= 1;
            }
            item.g = `Wors${!howManyErs ? 'e' : ''}${'er'.repeat(
              howManyErs > 0 ? howManyErs : 0
            )}`;
          }
          return item;
        });
        dataString = "[{x: 1, y: 5.5, g: 'Better'}]";
        break;
      case 'Quantity':
        ChartType = CHART_COMPONENTS.BarSeries;
        vizColors = createSpectrum(
          ['#FFFFFF', palettes.euiPaletteColorBlind.colors[0]],
          Number(this.state.numCharts) + 1
        );
        vizColors.shift();

        // convert series labels to percentages
        data1 = data1.map(item => {
          const increment = 100 / Number(this.state.numCharts);
          const index = Number(item.g);
          const lower = Math.floor(increment * index);
          const higher =
            index + 1 === this.state.numCharts
              ? Math.ceil(increment * (index + 1))
              : Math.floor(increment * (index + 1));
          item.g = `${lower} - ${higher}%`;
          return item;
        });
        dataString = "[{x: 1, y: 5.5, g: '0 - 100%'}]";
        break;
      default:
        data1 = data1.map(item => {
          const index = Number(item.g);
          item.g = `Category ${index + 1}`;
          return item;
        });
        dataString = "[{x: 1, y: 5.5, g: 'Category 1'}]";
        break;
    }

    const customColors = mergeWithDefaultTheme(
      {
        colors: { vizColors },
      },
      theme
    );
    const customColorsString =
      vizColors !== palettes.euiPaletteColorBlind.colors
        ? `mergeWithDefaultTheme(
  { colors: { vizColors: [${JSON.stringify(vizColors)}] }},
  isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme
)`
        : null;

    if (!this.state.grouped) {
      chart1 = (
        <ChartType
          id="data1"
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
      showLegend = true;
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
        specId: 'data1',
      };
      data1CustomSeriesColors.set(
        data1DataSeriesColorValues,
        palettes.euiPaletteColorBlind.colors[0]
      );

      const data2CustomSeriesColors = new Map();
      const data2DataSeriesColorValues = {
        colorValues: [],
        specId: 'data2',
      };
      data2CustomSeriesColors.set(
        data2DataSeriesColorValues,
        palettes.euiPaletteColorBlind.colors[0]
      );

      const data3CustomSeriesColors = new Map();
      const data3DataSeriesColorValues = {
        colorValues: [],
        specId: 'data3',
      };
      data3CustomSeriesColors.set(
        data3DataSeriesColorValues,
        palettes.euiPaletteColorBlind.colors[1]
      );

      const data4CustomSeriesColors = new Map();
      const data4DataSeriesColorValues = {
        colorValues: [],
        specId: 'data4',
      };
      data4CustomSeriesColors.set(
        data4DataSeriesColorValues,
        palettes.euiPaletteColorBlind.colors[1]
      );

      chart1 = (
        <ChartType
          id="data1"
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
          id="data2"
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
          id="data3"
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
          id="data4"
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
        {customTitle}
        <div style={{ position: 'relative' }}>
          <Chart size={[undefined, 200]}>
            <Settings
              theme={customColors}
              showLegend={showLegend}
              legendPosition="right"
              showLegendDisplayValue={false}
            />
            {chart1}
            {chart2}
            {chart3}
            {chart4}
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
              <EuiSpacer />
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
              <EuiSpacer />
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
          <EuiCopy
            textToCopy={`${
              customTitle
                ? `<EuiTitle size="xxs">
  <h4>
    <EuiIcon type="dot" color={highlightColor} /> My number of issues
    compared to others
  </h4>
</EuiTitle>`
                : ''
            }
<Chart size={[undefined, 200]}>
  <Settings
    ${
      customColorsString
        ? `theme={${customColorsString}}`
        : 'theme={isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme}'
    }
    showLegend={${showLegend}}
    legendPosition="right"
    showLegendDisplayValue={false}
  />
  <${ChartType === CHART_COMPONENTS.BarSeries ? 'BarSeries' : 'LineSeries'}
    id="bars"
    name="0"
    data={${dataString}}
    xAccessor={'x'}
    yAccessors={['y']}
    splitSeriesAccessors={['g']}
    ${ChartType === CHART_COMPONENTS.BarSeries ? "stackAccessors={['g']}" : ''}
  />
  <Axis
    id="bottom-axis"
    position="bottom"
    showGridLines
  />
  <Axis
    id="left-axis"
    position="left"
    showGridLines
  />
</Chart>`}>
            {copy => (
              <EuiButton
                fill
                onClick={copy}
                iconType="copyClipboard"
                disabled={isBadChart || isComplicatedChart}>
                {isBadChart || isComplicatedChart
                  ? isComplicatedChart
                    ? "It's complicated"
                    : "Bad chart, don't copy"
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

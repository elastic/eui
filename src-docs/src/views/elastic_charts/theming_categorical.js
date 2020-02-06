/* eslint-disable no-nested-ternary */
import React, { Component, Fragment } from 'react';
import { find } from 'lodash';
import { withTheme } from '../../components';
import { Chart, Settings, Axis, DataGenerator } from '@elastic/charts';

import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';

import {
  EuiSpacer,
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

import { CHART_COMPONENTS, ChartCard } from './shared';
import {
  euiPaletteColorBlind,
  euiPalettePositive,
  euiPaletteForStatus,
  euiPaletteGray,
} from '../../../../src/services';

class _Categorical extends Component {
  constructor(props) {
    super(props);

    this.highlightColor = euiPaletteColorBlind()[2];

    this.colorTypeRadios = [
      {
        id: `${this.idPrefix}3`,
        label: 'Categorical',
      },
      {
        id: `${this.idPrefix}0`,
        label: 'Sequential',
      },
      {
        id: `${this.idPrefix}1`,
        label: 'Diverging',
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
      data: [],
      dataString: '[{x: 1, y: 5.5, g: 0}]',
      vizColors: euiPaletteColorBlind(),
      vizColorsString: 'euiPaletteColorBlind()',
      chartType: 'LineSeries',
    };
  }

  componentDidMount = () => {
    this.createCategoryChart(3);
  };

  onNumChartsChange = e => {
    this.updateCorrectChart(Number(e.target.value), this.state.colorType);
    this.setState({
      numCharts: e.target.value,
    });
  };

  onColorTypeChange = optionId => {
    const colorType = find(this.colorTypeRadios, { id: optionId }).label;
    this.updateCorrectChart(Number(this.state.numCharts), colorType);
    this.setState({
      colorTypeIdSelected: optionId,
      colorType,
    });
  };

  onGroupChange = e => {
    const colorType = e.target.checked
      ? 'Grouped'
      : find(this.colorTypeRadios, { id: this.state.colorTypeIdSelected })
          .label;
    this.updateCorrectChart(Number(this.state.numCharts), colorType);
    this.setState({
      grouped: e.target.checked,
      colorType,
    });
  };

  updateCorrectChart = (numCharts, chartType) => {
    switch (chartType) {
      case 'Categorical':
        this.createCategoryChart(numCharts);
        break;
      case 'Sequential':
        this.createQuantityChart(numCharts);
        break;
      case 'Diverging':
        this.createTrendChart(numCharts);
        break;
      case 'Highlight':
        this.createHighlightChart(numCharts);
        break;
      case 'Grouped':
        this.setState({
          dataString: "[{x: 1, y: 5.5, g: 'Series 1'}]",
          chartType: 'LineSeries',
        });
        break;
      default:
        console.warn("Couldn't find the right chart type");
        break;
    }
  };

  createCategoryChart = numCharts => {
    const dg = new DataGenerator();
    const data = dg.generateGroupedSeries(20, numCharts).map(item => {
      item.g = `Categorical ${item.g.toUpperCase()}`;
      return item;
    });

    this.setState({
      data,
      dataString: "[{x: 1, y: 5.5, g: 'Categorical 1'}]",
      vizColors: euiPaletteColorBlind(),
      vizColorsString: 'euiPaletteColorBlind()',
      chartType: 'LineSeries',
    });
  };

  createQuantityChart = numCharts => {
    const vizColors = euiPalettePositive(numCharts);

    // convert series labels to percentages
    const dg = new DataGenerator();
    const data = dg.generateGroupedSeries(20, numCharts).map(item => {
      const increment = 100 / numCharts;
      const index = item.g.charCodeAt(0) - 97;
      const lower = Math.floor(increment * index);
      const higher =
        index + 1 === numCharts
          ? Math.ceil(increment * (index + 1))
          : Math.floor(increment * (index + 1));
      item.g = `${lower} - ${higher}%`;
      return item;
    });

    this.setState({
      data,
      dataString: "[{x: 1, y: 5.5, g: '0 - 100%'}]",
      vizColors,
      vizColorsString: `euiPaletteCool(${numCharts})`,
      chartType: 'BarSeries',
    });
  };

  createTrendChart = numCharts => {
    const vizColors = euiPaletteForStatus(numCharts);

    // convert series labels to better/worse
    const oddSeries = numCharts % 2;
    const numOfHalf = Math.floor(numCharts / 2);

    const dg = new DataGenerator();
    const data = dg.generateGroupedSeries(20, numCharts).map(item => {
      const index = item.g.charCodeAt(0) - 97;
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

    this.setState({
      data,
      dataString: "[{x: 1, y: 5.5, g: 'Better'}]",
      vizColors,
      vizColorsString: `euiPaletteForStatus(${numCharts})`,
      chartType: 'BarSeries',
    });
  };

  createHighlightChart = numCharts => {
    const vizColors = euiPaletteGray(numCharts);
    vizColors[vizColors.length - 1] = this.highlightColor;

    const dg = new DataGenerator();
    const data = dg.generateGroupedSeries(20, numCharts);

    this.setState({
      data,
      dataString: "[{x: 1, y: 5.5, g: '0'}]",
      vizColors: numCharts < 2 ? [this.highlightColor] : vizColors,
      vizColorsString: `euiPaletteGray(${numCharts})[length - 1] = this.highlightColor`,
      chartType: 'LineSeries',
    });
  };

  render() {
    const {
      data,
      dataString,
      vizColors,
      vizColorsString,
      chartType,
      numCharts,
      colorType,
      colorTypeIdSelected,
    } = this.state;

    if (data.length === 0) {
      return null;
    }

    const dg = new DataGenerator();
    const isDarkTheme = this.props.theme.includes('dark');
    const theme = isDarkTheme
      ? EUI_CHARTS_THEME_DARK.theme
      : EUI_CHARTS_THEME_LIGHT.theme;

    let ChartType = CHART_COMPONENTS[chartType];

    const isBadChart = !this.state.grouped && numCharts > 5;
    const isComplicatedChart = this.state.grouped;

    const customTitle =
      colorType === 'Highlight' ? (
        <EuiTitle size="xxs">
          <h4>
            <EuiIcon type="dot" color={this.highlightColor} /> My number of
            issues compared to others
          </h4>
        </EuiTitle>
      ) : (
        undefined
      );

    const customColors = {
      colors: { vizColors },
    };
    const customColorsString = `[
  { colors: { vizColors: ${vizColorsString} }},
  isDarkTheme ? EUI_CHARTS_THEME_DARK.theme : EUI_CHARTS_THEME_LIGHT.theme
]`;

    const charts = [];
    let customLegend;

    if (!this.state.grouped) {
      charts.push(
        <ChartType
          key="data1"
          id="data1"
          name="0"
          data={data}
          xAccessor={'x'}
          yAccessors={['y']}
          splitSeriesAccessors={['g']}
          stackAccessors={chartType === 'BarSeries' ? ['g'] : undefined}
        />
      );
    } else {
      ChartType = CHART_COMPONENTS.LineSeries;

      for (let index = 0; index < 4; index++) {
        const data = dg.generateGroupedSeries(20, 1).map(item => {
          item.y += index * 5;
          return item;
        });

        const isOdd = index % 2;

        const chart = (
          <ChartType
            key={`data${index}`}
            id={`data${index}`}
            name={`Series ${index < 2 ? 1 : 2}`}
            data={data}
            xAccessor={'x'}
            yAccessors={['y']}
            customSeriesColors={[euiPaletteColorBlind()[index < 2 ? 0 : 1]]}
            lineSeriesStyle={{
              line: {
                strokeWidth: isOdd ? 1 : 6,
              },
              point: {
                visible: !isOdd,
              },
            }}
            hideInLegend={isOdd}
          />
        );

        charts.push(chart);
      }

      customLegend = (
        <dl className="guideCharts__customLegend">
          <span className="guideCharts__customLegendLine" />
          <span>Actual</span>
          <br />
          <br />
          <span className="guideCharts__customLegendLine guideCharts__customLegendLine--thin" />
          <span>Projected</span>
        </dl>
      );
    }

    let showLegend = numCharts > 1 || colorType === 'Grouped';
    if (colorType === 'Highlight') showLegend = false;

    return (
      <Fragment>
        {customTitle}
        <div style={{ position: 'relative' }}>
          <Chart size={{ height: 200 }}>
            <Settings
              theme={[customColors, theme]}
              showLegend={showLegend}
              legendPosition="right"
              showLegendDisplayValue={false}
            />
            {charts}
            <Axis
              id="bottom-axis"
              position="bottom"
              showGridLines={this.state.chartType !== 'BarSeries'}
            />
            <Axis id="left-axis" position="left" showGridLines />
          </Chart>
          {customLegend}
        </div>

        <EuiSpacer />

        <EuiFlexGrid columns={3}>
          <EuiFlexItem>
            <ChartCard
              title="Color types"
              description="Coloring multi-series non-categorical charts can have different connotations.">
              <EuiRadioGroup
                compressed
                options={this.colorTypeRadios}
                idSelected={
                  this.state.grouped
                    ? this.colorTypeRadios[0].id
                    : colorTypeIdSelected
                }
                onChange={this.onColorTypeChange}
                disabled={this.state.grouped}
              />
            </ChartCard>
          </EuiFlexItem>
          <EuiFlexItem>
            <ChartCard
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
                  value={this.state.grouped ? '2' : numCharts}
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
            </ChartCard>
          </EuiFlexItem>
          <EuiFlexItem>
            <ChartCard
              title="Grouping data"
              description="If the series' are or can be combined into logical groups, use contrasting shapes/styles but keep the same color for within groups.">
              <EuiSpacer />
              <EuiSwitch
                label="Show grouped"
                checked={this.state.grouped}
                onChange={this.onGroupChange}
              />
            </ChartCard>
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
<Chart size={{height: 200}}>
  <Settings
    theme={${customColorsString}}
    showLegend={${showLegend}}
    legendPosition="right"
    showLegendDisplayValue={false}
  />
  <${chartType}
    id="bars"
    name="0"
    data={${dataString}}
    xAccessor={'x'}
    yAccessors={['y']}
    splitSeriesAccessors={['g']}
    ${chartType === 'BarSeries' ? "stackAccessors={['g']}" : ''}
  />
  <Axis
    id="bottom-axis"
    position="bottom"
    ${this.state.chartType !== 'BarSeries' ? 'showGridLines' : ''}
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

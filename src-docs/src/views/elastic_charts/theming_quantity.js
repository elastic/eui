import React, { Component, Fragment } from 'react';
import { withTheme } from '../../components';
import { find } from 'lodash';
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
  EuiCard,
  EuiRadioGroup,
} from '../../../../src/components';

import { CHART_COMPONENTS } from './shared';
import { colorPalette, palettes } from '../../../../src/services';

class _Quantity extends Component {
  constructor(props) {
    super(props);

    this.idPrefix = 'colorType';

    this.colorTypeRadios = [
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
      multi: true,
      stacked: true,
      chartType: 'BarSeries',
      colorTypeIdSelected: this.colorTypeRadios[0].id,
      colorType: this.colorTypeRadios[0].label,
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

  onColorTypeChange = optionId => {
    const colorType = find(this.colorTypeRadios, { id: optionId }).label;
    this.setState({
      colorTypeIdSelected: optionId,
      colorType,
    });
  };

  render() {
    const dg = new DataGenerator();
    const data1 = dg.generateGroupedSeries(20, 4);
    // console.table(data1);

    const isDarkTheme = this.props.theme.includes('dark');
    const theme = isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme;
    const gridHorizontalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridHorizontalSettings
      : EUI_LIGHT_THEME.gridHorizontalSettings;
    const gridVerticalSettings = isDarkTheme
      ? EUI_DARK_THEME.gridVerticalSettings
      : EUI_LIGHT_THEME.gridVerticalSettings;

    const ChartType = CHART_COMPONENTS[this.state.chartType];

    let vizColors = palettes.euiPaletteColorBlind.colors;
    let firstColor;
    let lastColor;

    switch (this.state.colorType) {
      case 'Highlight':
        firstColor = '#FFFFFF';
        lastColor = '#98A2B3';
        vizColors = colorPalette(firstColor, lastColor, 4);
        vizColors[0] = palettes.euiPaletteColorBlind.colors[2];
        break;
      case 'Trend':
        firstColor = palettes.euiPaletteForStatus.colors[0];
        lastColor =
          palettes.euiPaletteForStatus.colors[
            palettes.euiPaletteForStatus.colors.length - 1
          ];
        vizColors = colorPalette(firstColor, lastColor, 4);
        break;

      default:
        firstColor = '#FFFFFF';
        lastColor = palettes.euiPaletteColorBlind.colors[0];
        vizColors = colorPalette(firstColor, lastColor, 5);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const removeFirstColor = vizColors.shift();
        break;
    }

    const customColors = mergeWithDefaultTheme(
      {
        colors: { vizColors },
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
            showLegendDisplayValue={false}
          />
          <ChartType
            id={getSpecId('status')}
            name={this.state.colorType}
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
            <EuiCard
              textAlign="left"
              title="Color types"
              description="Coloring multi-series non-categorical charts can have different connotations.">
              <EuiRadioGroup
                options={this.colorTypeRadios}
                idSelected={this.state.colorTypeIdSelected}
                onChange={this.onColorTypeChange}
              />
            </EuiCard>
          </EuiFlexItem>
        </EuiFlexGrid>
      </Fragment>
    );
  }
}

export const Quantity = withTheme(_Quantity);

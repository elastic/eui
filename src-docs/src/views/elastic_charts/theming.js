import React, { useState, Fragment, useContext } from 'react';
import { ThemeContext } from '../../components';
import {
  Chart,
  Settings,
  Axis,
  LineSeries,
  BarSeries,
  DataGenerator,
} from '@elastic/charts';

import {
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSuperSelect,
} from '../../../../src/components';

import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';

import {
  euiPaletteColorBlind,
  euiPaletteComplimentary,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteNegative,
  euiPalettePositive,
  euiPaletteGray,
} from '../../../../src/services';
const paletteData = {
  euiPaletteColorBlind,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteComplimentary,
  euiPaletteNegative,
  euiPalettePositive,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteGray,
};
const paletteNames = Object.keys(paletteData);

export const Theming = () => {
  const themeContext = useContext(ThemeContext);

  /**
   * Create palette select
   */
  const paletteOptions = paletteNames.map((paletteName, index) =>
    createPaletteOption(paletteName, index)
  );

  const [barPalette, setBarPalette] = useState('5');
  const onBarPaletteChange = value => {
    setBarPalette(value);
  };

  /**
   * Create data
   */
  const dg = new DataGenerator();
  const data1 = dg.generateGroupedSeries(20, 1);
  const data2 = dg.generateGroupedSeries(20, 5);

  /**
   * Setup theme based on current light/dark theme
   */
  const isDarkTheme = themeContext.theme.includes('dark');
  const theme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK.theme
    : EUI_CHARTS_THEME_LIGHT.theme;

  const customColors = {
    colors: {
      vizColors: paletteData[paletteNames[Number(barPalette)]](5),
    },
  };

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
          customSeriesColors={['black']}
        />
        <Axis id="bottom-axis" position="bottom" showGridLines />
        <Axis id="left-axis" position="left" showGridLines />
      </Chart>
      <EuiSpacer size="xxl" />
      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem grow={false}>
          <EuiSuperSelect
            id="setChartBarColor"
            options={paletteOptions}
            valueOfSelected={barPalette}
            onChange={onBarPaletteChange}
            aria-label="Bars color palette"
            style={{ width: 300 }}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </Fragment>
  );
};

const createPaletteOption = function(paletteName, index) {
  return {
    value: String(index),
    inputDisplay: createPalette(
      paletteData[paletteNames[index]](index > 0 ? 10 : 1)
    ),
    dropdownDisplay: (
      <Fragment>
        <strong>{paletteName}</strong>
        <EuiSpacer size="xs" />
        {createPalette(paletteData[paletteNames[index]](index > 0 ? 10 : 1))}
      </Fragment>
    ),
  };
};

const createPalette = function(palette) {
  return (
    <EuiFlexGroup
      className="guideColorPalette__swatchHolder"
      gutterSize="none"
      responsive={false}>
      {palette.map(hexCode => (
        <EuiFlexItem
          key={hexCode}
          className={'guideColorPalette__swatch--small'}>
          <span title={hexCode} style={{ backgroundColor: hexCode }} />
        </EuiFlexItem>
      ))}
    </EuiFlexGroup>
  );
};

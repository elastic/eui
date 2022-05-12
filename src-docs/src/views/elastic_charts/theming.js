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
  EuiColorPalettePicker,
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

  const palettes = paletteNames.map((paletteName, index) => {
    const options =
      index > 0
        ? 10
        : {
            sortBy: 'natural',
          };

    return {
      value: paletteName,
      title: paletteName,
      palette: paletteData[paletteNames[index]](options),
      type: 'fixed',
    };
  });

  const [barPalette, setBarPalette] = useState('euiPaletteColorBlind');

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

  const barPaletteIndex = paletteNames.findIndex((item) => item === barPalette);

  const customTheme =
    barPaletteIndex > 0
      ? [
          {
            colors: {
              vizColors: paletteData[paletteNames[barPaletteIndex]](5),
            },
          },
          theme,
        ]
      : theme;

  return (
    <Fragment>
      <Chart size={{ height: 200 }}>
        <Settings theme={customTheme} showLegend={false} />
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
          color={['black']}
        />
        <Axis id="bottom-axis" position="bottom" showGridLines />
        <Axis
          id="left-axis"
          position="left"
          showGridLines
          tickFormat={(d) => Number(d).toFixed(2)}
        />
      </Chart>
      <EuiSpacer size="xxl" />
      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem grow={false} style={{ width: 300 }}>
          <EuiColorPalettePicker
            palettes={palettes}
            onChange={setBarPalette}
            valueOfSelected={barPalette}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </Fragment>
  );
};

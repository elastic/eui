import React, { useState } from 'react';

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
  euiPaletteComplementary,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteNegative,
  euiPalettePositive,
  euiPaletteGray,
  useEuiTheme,
} from '../../../../src/services';

const paletteData = {
  euiPaletteColorBlind,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteComplementary,
  euiPaletteNegative,
  euiPalettePositive,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteGray,
};

const palettes = Object.entries(paletteData).map(([paletteName, palette]) => {
  return {
    value: paletteName,
    title: paletteName,
    palette:
      palette === euiPaletteColorBlind
        ? euiPaletteColorBlind({ sortBy: 'natural' })
        : palette(10),
    type: 'fixed' as const,
  };
});

export default () => {
  const { colorMode } = useEuiTheme();

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
  const isDarkTheme = colorMode === 'DARK';
  const theme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK.theme
    : EUI_CHARTS_THEME_LIGHT.theme;

  const customTheme =
    barPalette !== 'euiPaletteColorBlind'
      ? [
          {
            colors: {
              vizColors: paletteData[barPalette as keyof typeof paletteData](5),
            },
          },
          theme,
        ]
      : theme;

  return (
    <>
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
        <Axis id="bottom-axis" position="bottom" gridLine={{ visible: true }} />
        <Axis
          id="left-axis"
          position="left"
          gridLine={{ visible: true }}
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
    </>
  );
};

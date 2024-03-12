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
  euiPaletteColorBlind,
  euiPaletteComplementary,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteNegative,
  euiPalettePositive,
  euiPaletteGray,
} from '../../../../src/services';
import { useChartBaseTheme } from './utils/use_chart_base_theme';

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
  const chartBaseTheme = useChartBaseTheme();

  const [barPalette, setBarPalette] = useState('euiPaletteColorBlind');

  /**
   * Create data
   */
  const dg = new DataGenerator();
  const data1 = dg.generateGroupedSeries(20, 1);
  const data2 = dg.generateGroupedSeries(20, 5);

  const themeOverrides =
    barPalette !== 'euiPaletteColorBlind'
      ? [
          {
            colors: {
              vizColors: paletteData[barPalette as keyof typeof paletteData](5),
            },
          },
        ]
      : [];

  return (
    <>
      <Chart size={{ height: 200 }}>
        <Settings
          baseTheme={chartBaseTheme}
          theme={themeOverrides}
          showLegend={false}
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

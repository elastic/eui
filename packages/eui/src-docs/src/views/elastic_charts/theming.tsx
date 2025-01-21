import React, { useEffect, useMemo, useState } from 'react';

import {
  Chart,
  Settings,
  Axis,
  LineSeries,
  BarSeries,
  DataGenerator,
} from '@elastic/charts';
import { VIS_COLOR_STORE_EVENTS } from '@elastic/eui-theme-common';

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
  euiPaletteRed,
  euiPaletteGreen,
  euiPaletteGray,
  EUI_VIS_COLOR_STORE,
} from '../../../../src/services';
import { useChartBaseTheme } from './utils/use_chart_base_theme';

const getPaletteData = () => ({
  euiPaletteColorBlind,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteComplementary,
  euiPaletteRed,
  euiPaletteGreen,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteGray,
});

const getPalettes = () =>
  Object.entries(getPaletteData()).map(([paletteName, palette]) => {
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

  const [palettes, setPalettes] = useState(getPalettes());
  const [barPalette, setBarPalette] = useState('euiPaletteColorBlind');

  const paletteData = useMemo(
    () => getPaletteData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [palettes]
  );

  useEffect(() => {
    const storeId = EUI_VIS_COLOR_STORE.subscribe(
      VIS_COLOR_STORE_EVENTS.UPDATE,
      () => {
        setPalettes(getPalettes());
      }
    );

    return () => {
      EUI_VIS_COLOR_STORE.unsubscribe(VIS_COLOR_STORE_EVENTS.UPDATE, storeId);
    };
  }, []);

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

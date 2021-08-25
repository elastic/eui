import React, { useContext } from 'react';
import { Chart, Settings, Goal } from '@elastic/charts';
import { EuiSpacer, EuiTitle } from '../../../../src/components';
import {
  htmlIdGenerator,
  euiPalettePositive,
  colorPalette,
  euiPaletteGray,
} from '../../../../src/services';
import { ThemeContext } from '../../components';
import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';

export const AccessibilityBullet = () => {
  const themeContext = useContext(ThemeContext);
  const id = htmlIdGenerator()();

  /**
   * Setup theme based on current light/dark theme
   */
  const isDarkTheme = themeContext.theme.includes('dark');
  const euiChartTheme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK
    : EUI_CHARTS_THEME_LIGHT;

  const bandLabels = ['freezing', 'cold', 'brisk', 'warm', 'hot'];
  const bands = [0, 100, 125, 150, 250];

  const spectrum = euiPalettePositive(5);
  // For dark theme, start with the brightest positive color and create a palette that goes to dark gray instead of light
  const spectrumDark = colorPalette(
    [spectrum[4], euiPaletteGray(5)[4]],
    5
  ).reverse();

  const colorMap = {
    '0': isDarkTheme ? spectrumDark[0] : spectrum[0],
    '100': isDarkTheme ? spectrumDark[1] : spectrum[1],
    '125': isDarkTheme ? spectrumDark[2] : spectrum[2],
    '150': isDarkTheme ? spectrumDark[3] : spectrum[3],
    '250': isDarkTheme ? spectrumDark[4] : spectrum[4],
  };
  const bandFillColor = (x) => colorMap[x];
  return (
    <>
      <EuiTitle size="xs" className="eui-textCenter">
        <h3 id={`bullet--example--${id}`}>Example bullet chart</h3>
      </EuiTitle>
      <EuiSpacer />
      <Chart size={{ height: 200 }}>
        <Settings
          theme={euiChartTheme.theme}
          ariaLabelledBy={id}
          ariaDescription="This goal chart has a target of 260."
          ariaUseDefaultSummary={false}
        />
        <Goal
          id="spec_1"
          subtype="horizontalBullet"
          base={0}
          target={260}
          actual={280}
          bands={bands}
          ticks={[0, 50, 100, 150, 200, 250, 300]}
          tickValueFormatter={({ value }) => String(value)}
          bandFillColor={({ value }) => bandFillColor(value)}
          labelMajor="Revenue 2020 YTD  "
          labelMinor="(thousand USD)  "
          centralMajor="280"
          centralMinor="target: 260"
          bandLabels={bandLabels}
        />
      </Chart>
    </>
  );
};

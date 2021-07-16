import React, { useContext } from 'react';
import { Chart, Settings, Goal } from '@elastic/charts';
import { EuiSpacer, EuiTitle } from '../../../../src/components';
import { htmlIdGenerator, euiPalettePositive } from '../../../../src/services';
import { ThemeContext } from '../../components';

import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';

export const BulletExample = () => {
  const id = htmlIdGenerator('bullet')();
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');
  const euiChartTheme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK
    : EUI_CHARTS_THEME_LIGHT;

  const euiGoalConfig = euiChartTheme.euiGoalConfig;

  const bandLabels = ['freezing', 'cold', 'brisk', 'warm', 'hot'];
  const bands = [0, 100, 125, 150, 250];

  const spectrum = euiPalettePositive(5);

  const colorMap = {
    '0': spectrum[0],
    '100': spectrum[1],
    '125': spectrum[2],
    '150': spectrum[3],
    '250': spectrum[4],
  };

  const bandFillColor = (x) => colorMap[x];
  return (
    <>
      <EuiTitle size="xs" className="eui-textCenter">
        <h3 id={id}>Example bullet chart</h3>
      </EuiTitle>
      <EuiSpacer />
      <Chart size={{ height: 200 }}>
        <Settings
          ariaLabelledBy={id}
          ariaDescription="This goal chart has a target of 260."
          ariaUseDefaultSummary={false}
          theme={euiChartTheme}
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
          config={{ ...euiGoalConfig }}
        />
      </Chart>
    </>
  );
};

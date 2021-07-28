import React, { useContext } from 'react';
import { Chart, Settings, Goal } from '@elastic/charts';
import { EuiSpacer, EuiTitle, EuiCode } from '../../../../src/components';
import {
  htmlIdGenerator,
  useIsWithinBreakpoints,
  euiPalettePositive,
} from '../../../../src/services';
import { EuiFlexGrid, EuiFlexItem } from '../../../../src/components/flex';
import { ThemeContext } from '../../components';

import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';

export const GoalChart = () => {
  const id = htmlIdGenerator('goal')();
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');
  const euiChartTheme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK
    : EUI_CHARTS_THEME_LIGHT;

  const euiGoalConfig = euiChartTheme.euiGoalConfig;

  const isDesktop = useIsWithinBreakpoints(['l', 'xl']);
  const bandLabels = ['', 'freezing', 'cold', 'warm', 'hot'];
  const bands = [-10, 0, 15, 25, 40];

  const spectrum = euiPalettePositive(5);
  const opacityMapHex = {
    '-10': spectrum[0],
    '0': spectrum[1],
    '15': spectrum[2],
    '25': spectrum[3],
    '40': spectrum[4],
  };

  const colorMapTheme = bands.reduce((acc, band) => {
    acc[band] = opacityMapHex[band];
    return acc;
  }, {});

  const bandFillColor = (x) => colorMapTheme[x];
  return (
    <EuiFlexGrid direction={isDesktop ? 'row' : 'column'} columns={2}>
      <EuiFlexItem>
        <EuiTitle size="xs" className="eui-textCenter">
          <h3 id={id}>Example goal chart</h3>
        </EuiTitle>
        <EuiSpacer />
        <Chart size={{ height: 200 }}>
          <Settings
            ariaLabelledBy={id}
            ariaDescription="This goal chart has a target of 22."
            ariaUseDefaultSummary={false}
            theme={euiChartTheme}
          />
          <Goal
            base={-10}
            target={22}
            actual={12}
            bands={bands}
            ticks={[-10, 0, 10, 20, 30, 40]}
            tickValueFormatter={({ value }) => String(value)}
            bandFillColor={({ value }) => bandFillColor(value)}
            labelMajor="Temperature"
            labelMinor="Celsius"
            centralMajor="12"
            centralMinor=""
            config={{ ...euiGoalConfig, angleStart: Math.PI, angleEnd: 0 }}
            bandLabels={bandLabels}
          />
        </Chart>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiTitle size="xs" className="eui-textCenter">
          <h3>Visually hidden content for chart</h3>
        </EuiTitle>
        <EuiSpacer />
        <EuiCode language="jsx" inline={false}>
          {`<p>Temperature</p>
<p>Celsius</p>
<p>This goal chart has a target of 22.</p>
<dl>
  <dt>Chart type:</dt>
  <dd>goal chart</dd>
  <dt>Minimum:</dt>
  <dd>-10</dd>
  <dt>Maximum:</dt>
  <dd>40</dd>
  <dt>Target:</dt>
  <dd>$22</dd>
  <dd>Value:</dd>
  <dt>12</dt>
</dl>
<dl>
  <dt>-10 - 0</dt>
  <dd>freezing</dd>
  <dt>0 - 25</dt>
  <dd>cold</dd>
  <dt>25 - 40</dt>
  <dd>warm</dd>
  <dt>250 - 300</dt>
  <dd>hot</dd>
</dl>`}
        </EuiCode>
      </EuiFlexItem>
    </EuiFlexGrid>
  );
};

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

export const BulletExample = () => {
  const id = htmlIdGenerator('bullet')();
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');
  const euiChartTheme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK
    : EUI_CHARTS_THEME_LIGHT;

  const euiGoalConfig = euiChartTheme.euiGoalConfig;

  const isDesktop = useIsWithinBreakpoints(['l', 'xl']);
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
    <EuiFlexGrid direction={isDesktop ? 'row' : 'column'} columns={2}>
      <EuiFlexItem>
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
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiTitle size="xs" className="eui-textCenter">
          <h3>Visually hidden content for chart</h3>
        </EuiTitle>
        <EuiSpacer />
        <EuiCode language="jsx" inline={false}>
          {`<p>Revenue 2020 YTD</p>
<p>(thousand USD</p>
<p>This goal chart has a target of 260.</p>
<dl>
  <dt>Chart type:</dt>
  <dd>horizontalBullet chart</dd>
  <dt>Minimum:</dt>
  <dd>0</dd>
  <dt>Maximum:</dt>
  <dd>300</dd>
  <dt>Target:</dt>
  <dd>260</dd>
  <dd>Value:</dd>
  <dt>280</dt>
</dl>
...
<dl class="echScreenReaderOnly echGoalDescription">
  <dt>0 - 100</dt>
  <dd>cold</dd>
  <dt>100 - 125</dt>
  <dd>brisk</dd>
  <dt>125 - 150</dt>
  <dd>warm</dd>
  <dt>150 - 250</dt>
  <dd>hot</dd>
</dl>`}
        </EuiCode>
      </EuiFlexItem>
    </EuiFlexGrid>
  );
};

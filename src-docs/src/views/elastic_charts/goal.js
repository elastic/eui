import React from 'react';
import { Chart, Settings, Goal } from '@elastic/charts';
import { EuiSpacer, EuiTitle, EuiCode } from '../../../../src/components';
import {
  htmlIdGenerator,
  useIsWithinBreakpoints,
} from '../../../../src/services';
import { EuiFlexGrid, EuiFlexItem } from '../../../../src/components/flex';

export const GoalChart = () => {
  const id = htmlIdGenerator()();
  // const themeContext = useContext(ThemeContext);
  const isDesktop = useIsWithinBreakpoints(['l', 'xl']);
  const bandLabels = ['', 'freezing', 'cold', 'warm', 'hot'];
  const bands = [-10, 0, 15, 25, 40];

  const opacityMap = {
    '-10': 0.8,
    '0': 0.66,
    '15': 0.5,
    '25': 0.33,
    '40': 0.05,
  };

  const colorMap = bands.reduce((acc, band) => {
    const defaultValue = opacityMap[band];
    acc[band] = `rgba(0, 0, 0, ${defaultValue.toFixed(2)})`;
    return acc;
  }, {});

  const bandFillColor = (x) => colorMap[x];

  return (
    <EuiFlexGrid direction={isDesktop ? 'row' : 'column'} columns={2}>
      <EuiFlexItem>
        <EuiTitle size="xs">
          <h3 id={id}>Example goal chart</h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <Chart size={{ height: 200 }}>
          <Settings
            ariaLabelledBy={id}
            ariaDescription="This goal chart has a target of 22."
            ariaUseDefaultSummary={false}
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
            config={{ angleStart: Math.PI, angleEnd: 0 }}
            bandLabels={bandLabels}
          />
        </Chart>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiTitle className="eui-textCenter" size="xs">
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

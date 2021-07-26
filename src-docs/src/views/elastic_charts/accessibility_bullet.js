import React from 'react';
import { Chart, Settings, Goal } from '@elastic/charts';
import { EuiSpacer, EuiTitle, EuiPanel } from '../../../../src/components';
import { htmlIdGenerator, euiPalettePositive } from '../../../../src/services';

export const AccessibilityBullet = () => {
  const id = htmlIdGenerator()();

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
        <h3 id={`bullet--example--${id}`}>Example bullet chart</h3>
      </EuiTitle>
      <EuiSpacer />
      <EuiPanel
        hasShadow={false}
        hasBorder={false}
        style={{
          backgroundColor: 'aliceblue',
        }}
        grow={false}>
        <Chart size={{ height: 200 }}>
          <Settings
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
      </EuiPanel>
    </>
  );
};

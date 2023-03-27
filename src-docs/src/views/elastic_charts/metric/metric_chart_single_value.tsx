import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiRange,
  useEuiTheme,
} from '../../../../../src';
import {
  Chart,
  DARK_THEME,
  LIGHT_THEME,
  Metric,
  Settings,
} from '@elastic/charts';
import React, { useState } from 'react';
import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../../src/themes/charts/themes';

export default () => {
  const { colorMode } = useEuiTheme();
  const isDarkTheme = colorMode === 'DARK';

  const euiChartTheme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK
    : EUI_CHARTS_THEME_LIGHT;
  const chartBaseTheme = isDarkTheme ? DARK_THEME : LIGHT_THEME;
  const customTicks = [
    { label: '', value: 0 },
    { label: '', value: 1 },
    { label: '', value: 2 },
    { label: '', value: 3 },
    { label: '', value: 4 },
  ];

  const customColorsLevels = [
    {
      min: 0,
      max: 1,
      color: '#a2cb9f',
    },
    {
      min: 1,
      max: 2,
      color: '#a1cbea',
    },
    {
      min: 2,
      max: 3,
      color: '#f2cc8f',
    },
    {
      min: 3,
      max: 4,
      color: '#e07a5f',
    },
    {
      min: 4,
      max: 5,
      color: '#b1130a',
    },
  ];
  const [customColorsValue, setCustomColorsValue] = useState(5 - 3.364726);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 3,
  });

  return (
    <EuiFlexGroup direction={'column'}>
      <EuiFlexItem grow={0}>
        <EuiPanel paddingSize="none" style={{ overflow: 'hidden', width: 200 }}>
          <Chart size={[200, 200]}>
            <Settings baseTheme={chartBaseTheme} theme={euiChartTheme.theme} />
            <Metric
              id="1"
              data={[
                [
                  {
                    color:
                      customColorsValue === 5
                        ? 'white'
                        : customColorsLevels
                            .slice()
                            .reverse()
                            .find((d) => d.min <= customColorsValue)?.color ??
                          'white',
                    title: 'Current Year Revenue',
                    subtitle: 'Rigid.co',
                    extra: (
                      <span>
                        Last year <strong>{formatter.format(1250000)}</strong>
                      </span>
                    ),
                    value:
                      (customColorsValue === 5 ? NaN : 5 - customColorsValue) *
                      1000000,
                    valueFormatter: (v) => formatter.format(v),
                  },
                ],
              ]}
            />
          </Chart>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem grow={0}>
        <EuiRange
          value={customColorsValue}
          onChange={(e) => setCustomColorsValue(+e.currentTarget.value)}
          min={0}
          max={5}
          ticks={customTicks}
          levels={customColorsLevels}
          step={0.001}
          aria-label="An example of EuiRange with custom colored indicators"
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

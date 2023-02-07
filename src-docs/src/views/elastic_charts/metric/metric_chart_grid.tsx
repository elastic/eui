import React from 'react';
import { EuiIcon, EuiPanel, useEuiTheme } from '../../../../../src';
import {
  Chart,
  DARK_THEME,
  LIGHT_THEME,
  Metric,
  MetricSpec,
  Settings,
} from '@elastic/charts';
import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../../src/themes/charts/themes';

const osTrend = Array.from({ length: 30 }).map((d, i) => ({
  x: i,
  y: Math.random(),
}));
const DATA: MetricSpec['data'] = [
  [
    {
      color: '#3c3c3c',
      title: 'Network eth0',
      subtitle: 'Inbound traffic',
      icon: () => <EuiIcon type={'sortDown'} />,
      value: NaN,
      valueFormatter: (d) => `${d}KBps`,
      trend: osTrend.map((d, i) =>
        i > osTrend.length - 10 ? { x: d.x, y: 0 } : d
      ),
      extra: (
        <span>
          last 10m <b>24KBps</b>
        </span>
      ),
      trendShape: 'area',
      trendA11yTitle: 'The current inbound traffic for the eth0 network',
      trendA11yDescription:
        'The last 10 minutes of inbound traffic for eth0 shows a negative trend',
    },
    {
      color: '#FF7E62',
      title: 'Network eth1',
      subtitle: 'Inbound traffic',
      icon: () => <EuiIcon type={'sortUp'} />,
      value: 33.57,
      extra: (
        <span>
          last 10m <b>23.5KBps</b>
        </span>
      ),
      valueFormatter: (d) => `${d}KBps`,
      trend: osTrend.map((d, i) =>
        i > osTrend.length - 10 ? { x: d.x, y: d.y + 5 } : d
      ),
      trendShape: 'area',
      trendA11yTitle: 'The current inbound traffic for the eth1 network',
      trendA11yDescription:
        'The last 10 minutes of inbound traffic for eth1 shows a positive trend',
    },
    {
      color: '#F1D86F',
      title: 'Network eth2',
      subtitle: 'Inbound traffic',
      icon: () => <EuiIcon type={'grab'} />,
      extra: (
        <span>
          last 10m <b>1.5KBps</b>
        </span>
      ),
      value: 1.57,
      valueFormatter: (d) => `${d}KBps`,
      trend: osTrend.map((d) => ({ x: d.x, y: Math.random() * 0.1 + 5 })),
      trendShape: 'area',
      trendA11yTitle: 'The current inbound traffic for the eth2 network',
      trendA11yDescription:
        'The last 10 minutes of inbound traffic for eth2 shows a stable trend',
    },
  ],
  [
    {
      color: '#6DCCB1',
      title: 'Network eth0',
      subtitle: 'Outbound traffic',
      icon: () => <EuiIcon type={'grab'} />,
      extra: (
        <span>
          last 10m <b>24KBps</b>
        </span>
      ),
      value: 24.85,
      valueFormatter: (d) => `${d}KBps`,
      trend: osTrend.map((d) => ({ x: d.x, y: Math.random() * 0.1 + 3 })),
      trendShape: 'area',
      trendA11yTitle: 'The current outbound traffic for the eth0 network',
      trendA11yDescription:
        'The last 10 minutes of outbound traffic for eth0 shows a stable trend',
    },
    {
      color: '#FFBDAF',
      title: 'Network eth1',
      subtitle: 'Outbound traffic',
      extra: (
        <span>
          last 10m <b>32KBps</b>
        </span>
      ),
      icon: () => <EuiIcon type={'sortUp'} />,
      value: 1.2,
      valueFormatter: (d) => `${d}MBps`,
      trend: osTrend.map((d, i) =>
        i > osTrend.length - 10 ? { x: d.x, y: d.y + 2 } : d
      ),
      trendShape: 'area',
      trendA11yTitle: 'The current outbound traffic for the eth1 network',
      trendA11yDescription:
        'The last 10 minutes of outbound traffic for eth1 shows a positive trend',
    },
    {
      color: '#F1D86F',
      title: 'Network eth2',
      subtitle: 'Outbound traffic',
      extra: (
        <span>
          last 10m <b>50KBps</b>
        </span>
      ),
      icon: () => <EuiIcon type={'sortDown'} />,
      value: 23.21,
      valueFormatter: (d) => `${d}KBps`,
      trend: osTrend.map((d, i) =>
        i > osTrend.length - 10 ? { x: d.x, y: Math.random() * 0.2 } : d
      ),
      trendShape: 'area',
      trendA11yTitle: 'The current outbound traffic for the eth2 network',
      trendA11yDescription:
        'The last 10 minutes of outbound traffic for eth2 shows a negative trend',
    },
  ],
];

export default () => {
  const { colorMode } = useEuiTheme();
  const isDarkTheme = colorMode === 'DARK';
  const euiChartTheme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK
    : EUI_CHARTS_THEME_LIGHT;
  const chartBaseTheme = isDarkTheme ? DARK_THEME : LIGHT_THEME;
  return (
    <EuiPanel paddingSize="none" style={{ overflow: 'hidden', width: 800 }}>
      <Chart size={[800, 300]}>
        <Settings baseTheme={chartBaseTheme} theme={euiChartTheme.theme} />
        <Metric id="1" data={DATA} />
      </Chart>
    </EuiPanel>
  );
};

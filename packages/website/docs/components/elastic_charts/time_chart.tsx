import React, { useState } from 'react';

import {
  Chart,
  BarSeries,
  Settings,
  Tooltip,
  Axis,
  timeFormatter,
  niceTimeFormatByDay,
  LineSeries,
} from '@elastic/charts';

import {
  EuiSpacer,
  EuiTitle,
  EuiFlexGrid,
  EuiFlexItem,
  EuiCopy,
  EuiButton,
  formatDate,
  dateFormatAliases,
} from '@elastic/eui';

import { TIME_DATA, TIME_DATA_2 } from './data';
import {
  ChartTypeCard,
  CHART_COMPONENTS,
  type ChartType,
  MultiChartCard,
  ChartCard,
} from './shared';
import { useChartBaseTheme } from './use_chart_base_theme';

export const TimeChart = () => {
  const chartBaseTheme = useChartBaseTheme();

  const [multi, setMulti] = useState(false);
  const [stacked, setStacked] = useState(false);
  const [chartType, setChartType] = useState<ChartType | 'Mixed'>('BarSeries');

  const ChartType =
    chartType === 'Mixed' ? BarSeries : CHART_COMPONENTS[chartType];
  const ChartType2 =
    chartType === 'Mixed' ? LineSeries : CHART_COMPONENTS[chartType];

  const isBadChart = chartType === 'LineSeries' && stacked;

  return (
    <>
      <EuiTitle size="xxs">
        <h2>
          Number of {!multi && 'financial '}robo-calls
          {multi && ' by type'}
        </h2>
      </EuiTitle>

      <EuiSpacer size="s" />

      <Chart size={{ height: 200 }}>
        <Settings
          baseTheme={chartBaseTheme}
          showLegend={multi}
          legendPosition="right"
        />
        <Tooltip type="cross" />
        <ChartType
          id="financial"
          name="Financial"
          data={TIME_DATA}
          xScaleType="time"
          xAccessor={0}
          yAccessors={[1]}
          stackAccessors={stacked ? [0] : undefined}
        />
        {multi && (
          <ChartType2
            id="tech"
            name="Tech support"
            data={TIME_DATA_2}
            xScaleType="time"
            xAccessor={0}
            yAccessors={[1]}
            stackAccessors={stacked ? [0] : undefined}
          />
        )}
        <Axis
          title={formatDate(Date.now(), dateFormatAliases.date)}
          id="bottom-axis"
          position="bottom"
          tickFormat={timeFormatter(niceTimeFormatByDay(1))}
          gridLine={{ visible: chartType !== 'BarSeries' }}
          style={{ tickLine: { padding: 0 } }}
        />
        <Axis
          id="left-axis"
          position="left"
          gridLine={{ visible: true }}
          tickFormat={(d) => Number(d).toFixed(2)}
        />
      </Chart>

      <EuiSpacer />

      <EuiFlexGrid columns={3}>
        <EuiFlexItem>
          <ChartTypeCard<{ mixed: true }>
            type="Time series"
            onChange={(chartType) => setChartType(chartType)}
            mixed={multi ? 'enabled' : 'disabled'}
          />
        </EuiFlexItem>

        <EuiFlexItem>
          <MultiChartCard
            onChange={({ multi, stacked }) => {
              setMulti(multi);
              setStacked(stacked);
            }}
          />
        </EuiFlexItem>

        <EuiFlexItem>
          <ChartCard
            title="Tick marks"
            description="If the tick marks all share a portion of their date (e.g. they're all on the same day) format the ticks to only display the disparate portions of the timestamp and show the common portion as the axis title."
          />
        </EuiFlexItem>
      </EuiFlexGrid>

      <EuiSpacer />

      <div className="eui-textCenter">
        <EuiCopy
          textToCopy={`<Chart size={{height: 200}}>
  <Settings
    baseTheme={isDarkTheme ? DARK_THEME : LIGHT_THEME}
    showLegend={${multi}}
    ${multi ? 'legendPosition="right"' : ''}
  />
  <${chartType === 'Mixed' ? 'BarSeries' : chartType}
    id="financial"
    name="Financial"
    data={[[0,1],[1,2]]}
    xScaleType="time"
    xAccessor={0}
    yAccessors={[1]}
    ${stacked ? 'stackAccessors={[0]}' : ''}
  />
  ${
    multi
      ? `<${chartType === 'Mixed' ? 'LineSeries' : chartType}
      id="tech"
      name="Tech support"
      data={[[0,1],[1,2]]}
      xScaleType="time"
      xAccessor={0}
      yAccessors={[1]}
      ${stacked ? 'stackAccessors={[0]}' : ''}
    />`
      : ''
  }
  <Axis
    title={formatDate(Date.now(), dateFormatAliases.date)}
    id="bottom-axis"
    position="bottom"
    tickFormat={timeFormatter(niceTimeFormatByDay(1))}
    gridLine={{ visible: ${chartType !== 'BarSeries'} }}
  />
  <Axis
    id="left-axis"
    position="left"
    gridLine={{ visible: true }}
    tickFormat={(d) => Number(d).toFixed(2)}
  />
</Chart>`}
        >
          {(copy) => (
            <EuiButton
              fill
              onClick={copy}
              iconType="copyClipboard"
              disabled={isBadChart}
            >
              {isBadChart
                ? "Bad chart, don't copy"
                : 'Copy code of current configuration'}
            </EuiButton>
          )}
        </EuiCopy>
      </div>
    </>
  );
};

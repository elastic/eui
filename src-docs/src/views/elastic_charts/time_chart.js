import React, { useState, useContext, Fragment } from 'react';
import { ThemeContext } from '../../components';
import {
  Chart,
  BarSeries,
  Settings,
  Axis,
  timeFormatter,
  niceTimeFormatByDay,
  LineSeries,
} from '@elastic/charts';

import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';

import {
  EuiSpacer,
  EuiTitle,
  EuiFlexGrid,
  EuiFlexItem,
  EuiCopy,
  EuiButton,
} from '../../../../src/components';

import { formatDate, dateFormatAliases } from '../../../../src/services';

import { TIME_DATA, TIME_DATA_2 } from './data';
import {
  ChartTypeCard,
  CHART_COMPONENTS,
  MultiChartCard,
  ChartCard,
} from './shared';

export const TimeChart = () => {
  const themeContext = useContext(ThemeContext);

  const [multi, setMulti] = useState(false);
  const [stacked, setStacked] = useState(false);
  const [chartType, setChartType] = useState('BarSeries');

  const onMultiChange = (multiObject) => {
    const { multi, stacked } = multiObject;
    setMulti(multi);
    setStacked(stacked);
  };

  const onChartTypeChange = (chartType) => {
    setChartType(chartType);
  };

  const isDarkTheme = themeContext.theme.includes('dark');
  const theme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK.theme
    : EUI_CHARTS_THEME_LIGHT.theme;

  let ChartType = CHART_COMPONENTS[chartType];
  let ChartType2 = CHART_COMPONENTS[chartType];
  if (chartType === 'Mixed') {
    ChartType = BarSeries;
    ChartType2 = LineSeries;
  }

  const isBadChart = chartType === 'LineSeries' && stacked;

  return (
    <Fragment>
      <EuiTitle size="xxs">
        <h2>
          Number of {!multi && 'financial '}robo-calls
          {multi && ' by type'}
        </h2>
      </EuiTitle>

      <EuiSpacer size="s" />

      <Chart size={{ height: 200 }}>
        <Settings
          theme={theme}
          showLegend={multi}
          legendPosition="right"
          tooltip="cross"
        />
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
          showGridLines={chartType !== 'BarSeries'}
          tickPadding={0}
        />
        <Axis
          id="left-axis"
          position="left"
          showGridLines
          tickFormat={(d) => Number(d).toFixed(2)}
        />
      </Chart>

      <EuiSpacer />

      <EuiFlexGrid columns={3}>
        <EuiFlexItem>
          <ChartTypeCard
            type="Time series"
            onChange={onChartTypeChange}
            mixed={multi ? 'enabled' : 'disabled'}
          />
        </EuiFlexItem>

        <EuiFlexItem>
          <MultiChartCard onChange={onMultiChange} />
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
    theme={isDarkTheme ? EUI_CHARTS_THEME_DARK.theme : EUI_CHARTS_THEME_LIGHT.theme}
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
    ${chartType !== 'BarSeries' ? 'showGridLines' : ''}
  />
  <Axis
    id="left-axis"
    position="left"
    showGridLines
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
    </Fragment>
  );
};

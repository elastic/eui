import React, { Fragment } from 'react';

import { ExternalBadge } from './shared';
import { TimeChart } from './time_chart';

import { EuiSpacer, EuiCode } from '../../../../src/components';

export const ElasticChartsTimeExample = {
  title: 'Time series charts',
  intro: (
    <Fragment>
      <ExternalBadge />
      <EuiSpacer />
      <p>
        Change over time charts show data over a period of time, such as trends
        or comparisons across multiple categories.
      </p>
      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      text: (
        <Fragment>
          <ul>
            <li>
              <EuiCode>xScaleType = ScaleType.Time</EuiCode> on the x axis
            </li>
            <li>
              <EuiCode>
                tickFormat = timeFormatter(niceTimeFormatByDay(1));
              </EuiCode>
            </li>
          </ul>
        </Fragment>
      ),
      demo: <TimeChart />,
      snippet: `<EuiTitle size="xxs">
  <h3>
    Number of {!this.state.multi && 'financial '}robo-calls
    {this.state.multi && ' by type'}
  </h3>
</EuiTitle>

<EuiSpacer size="s" />

<Chart size={[undefined, 200]}>
  <Settings
    theme={theme}
    showLegend={this.state.multi}
    legendPosition={Position.Right}
  />
  <BarSeries
    id={getSpecId('time1')}
    name={'Financial'}
    data={TIME_DATA}
    xAccessor={0}
    yAccessors={[1]}
    stackAccessors={this.state.stacked ? [0] : undefined}
  />
  {this.state.multi && (
    <BarSeries
      id={getSpecId('time2')}
      name={'Tech support'}
      data={TIME_DATA_2}
      xAccessor={0}
      yAccessors={[1]}
      stackAccessors={this.state.stacked ? [0] : undefined}
    />
  )}
  <Axis
    id={getAxisId('bottom-axis')}
    position={Position.Bottom}
    xScaleType={ScaleType.Time}
    tickFormat={formatter}
    showGridLines
    gridLineStyle={gridVerticalSettings}
  />
  <Axis
    id={getAxisId('left-axis')}
    position={Position.Left}
    showGridLines
    gridLineStyle={gridHorizontalSettings}
  />
</Chart>`,
    },
  ],
};

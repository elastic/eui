import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { EuiHealth } from '../../health';
import { ChartStore } from '../state/chart_state';

interface ReactiveChartProps {
  chartStore?: ChartStore; // FIX until we find a better way on ts mobx
}

class LegendComponent extends React.Component<ReactiveChartProps> {
  public static displayName = 'Legend';

  public render() {
    const {
      initialized,
      legendItems,
      legendPosition,
      showLegend,
      debug,
    } = this.props.chartStore!;
    if (!showLegend || !initialized.get() || legendItems.length === 0) {
      return null;
    }
    const classes = classNames(
      'euiChartLegend',
      `euiChartLegend--${legendPosition}`,
      debug && 'euiChartLegend--debug');
    return (
      <div className={classes}>
        <div className="euiChartLegend__collapse"/>
        <ul className="euiChartLegend__list">
          {
            legendItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className="euiChartLegend__listItem"
                >
                  <EuiHealth color={item.color}>
                  {item.label}
                  </EuiHealth>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export const Legend = inject('chartStore')(observer(LegendComponent));

import { inject, observer } from 'mobx-react';
import React from 'react';
import { ChartStore } from '../state/chart_state';

interface ReactiveChartProps {
  chartStore?: ChartStore; // FIX until we find a better way on ts mobx
}

class TooltipsComponent extends React.Component<ReactiveChartProps> {
  public static displayName = 'Tooltips';

  public render() {
    const { initialized, tooltipData } = this.props.chartStore!;
    if (!initialized.get() || tooltipData.length === 0) {
      return null;
    }

    const { parentDimensions, chartDimensions } = this.props.chartStore!;
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          boxSizing: 'border-box',
          pointerEvents: 'none',
        }}
      >
        <ul>
          {tooltipData.map((datum, i) => {
            return <p key={i}>{JSON.stringify(datum)}</p>;
          })}
        </ul>
      </div>
    );
  }
}

export const Tooltips = inject('chartStore')(observer(TooltipsComponent));

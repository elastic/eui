import { inject, observer } from 'mobx-react';
import React from 'react';
import { Accessor } from '../commons/data_ops/accessor';
import { SpecId } from '../commons/ids';
import { Datum } from '../commons/series/specs';
import { ChartStore, TooltipData } from '../state/chart_state';

interface ReactiveChartProps {
  chartStore?: ChartStore; // FIX until we find a better way on ts mobx
}

class TooltipsComponent extends React.Component<ReactiveChartProps> {
  public static displayName = 'Tooltips';

  public render() {
    const { initialized, tooltipData } = this.props.chartStore!;
    if (!initialized.get()) {
      return null;
    }
    const tooltip = tooltipData.get();
    return tooltip.fold(null, this.renderTooltip);
  }
  private renderTooltip = (tooltipData: TooltipData) => {
    console.log(tooltipData);
    const { top, left, right } = tooltipData.position;
    return (
      <div
        className={'euiChartTooltip'}
        style={{
          position: 'absolute',
          top,
          left,
          right,
        }}
      >
        <p>{tooltipData.specId}</p>
        <ul>
          {tooltipData.data.map((datum, i) => {
            return (
              <p key={i}>
              {
                this.formatData(tooltipData.specId, datum)
              }
              </p>);
          })}
        </ul>
      </div>
    );
  }
  private formatData = (specId: SpecId, datum: Datum) => {
    const spec = this.props.chartStore!.getSpecById(specId);
    if (!spec) {
      return null;
    }
    return [
      ...this.formatAccessor([spec.xAccessor], datum),
      ...this.formatAccessor(spec.splitSeriesAccessors, datum),
      ...this.formatAccessor(spec.yAccessors, datum),
    ];
  }
  private formatAccessor(accessors: Accessor[] | undefined, datum: Datum): JSX.Element[] {
    if (!accessors) {
      return [];
    }
    return accessors.map((accessor) => {
      return <span>{accessor} : {datum[accessor]} </span>;
    });
  }
}

export const Tooltips = inject('chartStore')(observer(TooltipsComponent));

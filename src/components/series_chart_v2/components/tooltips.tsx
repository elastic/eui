import { inject, observer } from 'mobx-react';
import React from 'react';
import { Datum } from '../lib/series/specs';
import { Accessor } from '../lib/utils/accessor';
import { SpecId } from '../lib/utils/ids';
import { ChartStore, TooltipData } from '../state/chart_state';

interface ReactiveChartProps {
  chartStore?: ChartStore; // FIX until we find a better way on ts mobx
}

class TooltipsComponent extends React.Component<ReactiveChartProps> {
  public static displayName = 'Tooltips';

  public render() {
    const { initialized, tooltipData, tooltipPosition, parentDimensions } = this.props.chartStore!;
    if (!initialized.get()) {
      return null;
    }
    const tooltip = tooltipData.get();
    const tooltipPos = tooltipPosition.get();
    let hPosition;
    if (!tooltipPos) {
      return null;
    }
    if (tooltipPos.x <= parentDimensions.width / 2) {
      hPosition = {
        position: 'left',
        value: tooltipPos.x + 20,
      };
    } else {
      hPosition = {
        position: 'right',
        value: parentDimensions.width - tooltipPos.x + 10,
      };
    }
    let vPosition;
    if (tooltipPos.y <= parentDimensions.height / 2) {
      vPosition = {
        position: 'top',
        value: tooltipPos.y,
      };
    } else {
      vPosition = {
        position: 'bottom',
        value: parentDimensions.height - tooltipPos.y,
      };
    }
    return tooltip && this.renderTooltip(tooltip, vPosition, hPosition);
  }
  private renderTooltip = (
    tooltipData: TooltipData,
    vPosition: { position: string; value: number },
    hPosition: { position: string; value: number },
  ) => {
    if (!tooltipData) {
      return null;
    }

    return (
      <div
        className={'euiChartTooltip'}
        style={{
          position: 'absolute',
          [vPosition.position]: vPosition.value,
          [hPosition.position]: hPosition.value,
        }}
      >
        <p>{tooltipData.value.specId}</p>
        <ul>{this.formatData(tooltipData.value.specId, tooltipData.value.datum)}</ul>
      </div>
    );
  }
  private formatData = (specId: SpecId, datum: Datum) => {
    const spec = this.props.chartStore!.seriesSpecs.get(specId);
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
    return accessors.map((accessor, i) => {
      return (
        <span key={`${accessor} - ${i}`}>
          {accessor} : {datum[accessor]}{' '}
        </span>
      );
    });
  }
}

export const Tooltips = inject('chartStore')(observer(TooltipsComponent));

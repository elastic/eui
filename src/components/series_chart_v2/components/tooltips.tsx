import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { ChartStore } from '../state/chart_state';

interface ReactiveChartProps {
  chartStore?: ChartStore; // FIX until we find a better way on ts mobx
}

class TooltipsComponent extends React.Component<ReactiveChartProps> {
  public static displayName = 'Tooltips';

  public render() {
    const {
      initialized,
      tooltipData,
      tooltipPosition,
      showTooltip,
      parentDimensions,
    } = this.props.chartStore!;
    const tooltip = tooltipData.get();
    const tooltipPos = tooltipPosition.get();
    let hPosition;
    if (!initialized.get() || !tooltip || !tooltipPos) {
      return <div className="euiChartTooltip euiChartTooltip--hidden" />;
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
    return this.renderTooltip(showTooltip.get(), tooltip, vPosition, hPosition);
  }

  private renderTooltip = (
    showTooltip: boolean,
    tooltip: Array<[any, any]>,
    vPosition: { position: string; value: number },
    hPosition: { position: string; value: number },
  ) => {
    return (
      <div
        className={classNames('euiChartTooltip', showTooltip ? null : 'euiChartTooltip--hidden')}
        style={{
          position: 'absolute',
          [vPosition.position]: vPosition.value,
          [hPosition.position]: hPosition.value,
        }}
      >
        {/* <p>{tooltipData.value.specId}</p> */}
        <table>
          <tbody>
            {
              tooltip.map(([field, value], index) => {
                return (
                  <tr key={`row-${index}`}>
                    <td className="euiChartTooltip__label">{field}</td>
                    <td>{value}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

}

export const Tooltips = inject('chartStore')(observer(TooltipsComponent));

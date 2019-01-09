import classNames from 'classnames';
import { right } from 'fp-ts/lib/Either';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { EuiButtonIcon } from '../../button';
import { EuiFlexGrid, EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiHealth } from '../../health';
import { EuiIcon } from '../../icon';
import { EuiText } from '../../text';
import { EuiToolTip } from '../../tool_tip';
import { LegendItem } from '../lib/series/legend';
import { Position } from '../lib/series/specs';
import { ChartStore } from '../state/chart_state';

interface ReactiveChartProps {
  chartStore?: ChartStore; // FIX until we find a better way on ts mobx
}

function getCollapseArrowType(position: Position | undefined, legendShown: boolean): string {
  switch (position) {
    case Position.Left:
      return legendShown ? 'arrowRight' : 'arrowLeft';
    case Position.Bottom:
      return legendShown ? 'arrowUp' : 'arrowDown';
    case Position.Right:
      return legendShown ? 'arrowLeft' : 'arrowRight';
    case Position.Top:
      return legendShown ? 'arrowDown' : 'arrowUp';
    default:
      return '';
  }
}

class LegendComponent extends React.Component<ReactiveChartProps> {
  public static displayName = 'Legend';

  public onCollapseLegend = () => {
    this.props.chartStore!.toggleLegendCollapsed();
  }

  public render() {
    const {
      initialized,
      legendItems,
      legendPosition,
      showLegend,
      legendCollapsed,
      debug,
    } = this.props.chartStore!;

    if (!showLegend || !initialized.get() || legendItems.length === 0) {
      return null;
    }

    const legendClasses = classNames(
      'euiChartLegend',
      `euiChartLegend--${legendPosition}`,
      legendCollapsed.get() && 'euiChartLegend--collapsed',
      debug && 'euiChartLegend--debug');

    const legendCollapser = classNames(
      'euiChartLegendCollapser',
      `euiChartLegendCollapser--${legendPosition}`,
    );
    const collapseArrowType = getCollapseArrowType(legendPosition, legendCollapsed.get());

    return (
      <div
        className={legendClasses}>
        <div
          className={legendCollapser}
        >
          <EuiButtonIcon
            onClick={this.onCollapseLegend}
            iconType={collapseArrowType}
            aria-label={legendCollapsed.get() ? 'Expand legend' : 'Collapse legend'}
          />
        </div>
        <div
          className="euiChartLegendList"
        >
          <EuiFlexGroup
            gutterSize="s"
            wrap
            className="euiChartLegendListContainer"
            responsive={false}
          >
            {
              legendItems.map((item, index) => {
                return (
                  <EuiFlexItem
                    key={index}
                    className="euiChartLegendList__item"
                  >
                    <LegendElement
                      color={item.color}
                      label={item.label}
                    />
                  </EuiFlexItem>
                );
              })
            }
          </EuiFlexGroup>
        </div>
      </div>
    );
  }
}
function LegendElement({color, label}: Partial<LegendItem>) {
  return (
    <EuiFlexGroup
      gutterSize="xs"
      alignItems="center"
      responsive={false}
    >
      <EuiFlexItem grow={false}>
        <EuiIcon type="dot" color={color} />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
      <EuiToolTip position="right" content={<EuiText size="xs">{label}</EuiText>}>
        <EuiFlexItem grow={true} className="euiChartLegendListItem__title">
          <EuiText size="xs" className="eui-textTruncate">
            {label}
          </EuiText>
        </EuiFlexItem>
      </EuiToolTip>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

export const Legend = inject('chartStore')(observer(LegendComponent));

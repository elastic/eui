import { inject } from 'mobx-react';
import React from 'react';
import { getGroupId } from '../commons/ids';
import { AxisOrientation, AxisPosition, AxisSpec as AxisSpecType } from '../commons/specs';
import { SpecProps } from './specs';

type AxisSpecProps = SpecProps & AxisSpecType;

class AxisSpec extends React.PureComponent<AxisSpecProps> {
  public static defaultProps: Partial<AxisSpecProps> = {
    groupId: getGroupId('__global__'),
    hide: false,
    showOverlappingTicks: false,
    showOverlappingLabels: false,
    position: AxisPosition.Left,
    orientation: AxisOrientation.Vertical,
    tickSize: 10,
    tickPadding: 10,
    tickFormat: (tick) => tick,
  };
  public componentDidMount() {
    const { chartStore, children, ...spec } = this.props;
    chartStore!.addAxis({ ...spec });
  }
  public componentDidUpdate() {
    const { chartStore, children, ...spec } = this.props;
    chartStore!.addAxis({ ...spec });
  }
  public componentWillUnmount() {
    const { id }  = this.props;
    this.props.chartStore!.removeAxis(id);
  }
  public render() {
    return null;
  }
}

export const Axis = inject('chartStore')(AxisSpec);

import { inject } from 'mobx-react';
import React from 'react';
import { AxisOrientation, AxisPosition, AxisSpec as AxisSpecType } from '../commons/series/specs';
import { getGroupId } from '../commons/utils/ids';
import { SpecProps } from './specs_parser';

type AxisSpecProps =
  SpecProps &
  AxisSpecType;

type DefaultProps =
  | 'groupId'
  | 'hide'
  | 'showOverlappingTicks'
  | 'showOverlappingLabels'
  | 'position'
  | 'orientation'
  | 'tickSize'
  | 'tickPadding'
  | 'tickFormat';

class AxisSpec extends React.PureComponent<AxisSpecProps> {
  public static defaultProps: Pick<AxisSpecProps, DefaultProps> = {
    groupId: getGroupId('__global__'),
    hide: false,
    showOverlappingTicks: false,
    showOverlappingLabels: false,
    position: AxisPosition.Left,
    orientation: AxisOrientation.Vertical,
    tickSize: 10,
    tickPadding: 10,
    tickFormat: (tick: any) => `${tick}`,
  };
  public componentDidMount() {
    const { chartStore, children, ...spec } = this.props;
    chartStore!.addAxisSpec({ ...spec });
  }
  public componentDidUpdate() {
    const { chartStore, children, ...spec } = this.props;
    chartStore!.addAxisSpec({ ...spec });
  }
  public componentWillUnmount() {
    const { id } = this.props;
    this.props.chartStore!.removeAxisSpec(id);
  }
  public render() {
    return null;
  }
}

export const Axis = inject('chartStore')(AxisSpec);

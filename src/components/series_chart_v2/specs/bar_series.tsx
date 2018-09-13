import { inject } from 'mobx-react';
import React from 'react';
import { getGroupId } from '../commons/ids';
import { ScaleType } from '../commons/scales';
import { DataSeriesSpec, DataSeriesType } from '../commons/series/specs';
import { SpecProps } from './specs';

type BarSpecProps = SpecProps & DataSeriesSpec;

export class BarSeriesSpec extends React.PureComponent<BarSpecProps> {
  public static defaultProps: Partial<BarSpecProps> = {
    groupId: getGroupId('__global__'),
    type: DataSeriesType.Bar,
    xScaleType: ScaleType.Linear,
    yScaleType: ScaleType.Linear,
    xAccessor: (d) => d.x,
    yAccessor: (d) => d.y,
    scaleToExtent: false,
  };
  public componentDidMount() {
    const { chartStore, children, ...config } = this.props;
    chartStore!.addSeriesSpecs({ ...config });
  }
  public componentDidUpdate() {
    const { chartStore, children, ...config } = this.props;
    chartStore!.addSeriesSpecs({ ...config });
  }
  public componentWillUnmount() {
    const { chartStore, id } = this.props;
    chartStore!.removeSeriesSpecs(id);
  }
  public render() {
    return null;
  }
}

export const BarSeries = inject('chartStore')(BarSeriesSpec);

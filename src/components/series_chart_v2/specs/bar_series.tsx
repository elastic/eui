import { inject } from 'mobx-react';
import React from 'react';
import { ScaleType } from '../commons/data_ops/scales';
import { getGroupId } from '../commons/ids';
import { BarSeriesSpec } from '../commons/series/specs';
import { SpecProps } from './specs_parser';

type BarSpecProps = SpecProps & BarSeriesSpec;

type DefaultProps = 'groupId' | 'xScaleType' | 'yScaleType' | 'xAccessor' | 'yAccessors' | 'yScaleToDataExtent';

export class BarSeriesSpecComponent extends React.PureComponent<BarSpecProps> {
  public static defaultProps: Pick<BarSpecProps, DefaultProps> = {
    groupId: getGroupId('__global__'),
    xScaleType: ScaleType.Ordinal,
    yScaleType: ScaleType.Linear,
    xAccessor: 'x',
    yAccessors: ['y'],
    yScaleToDataExtent: true,
  };
  public componentDidMount() {
    const { chartStore, children, ...config } = this.props;
    chartStore!.addBarSeriesSpecs({ ...config });
  }
  public componentDidUpdate() {
    const { chartStore, children, ...config } = this.props;
    chartStore!.addBarSeriesSpecs({ ...config });
  }
  public componentWillUnmount() {
    const { chartStore, id } = this.props;
    chartStore!.removeBarSeriesSpecs(id);
  }
  public render() {
    return null;
  }
}

export const BarSeries = inject('chartStore')(BarSeriesSpecComponent);

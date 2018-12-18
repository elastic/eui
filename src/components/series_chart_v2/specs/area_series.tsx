import { inject } from 'mobx-react';
import React from 'react';
import { AreaSeriesSpec } from '../lib/series/specs';
import { getGroupId } from '../lib/utils/ids';
import { ScaleType } from '../lib/utils/scales/scales';
import { SpecProps } from './specs_parser';

type AreaSpecProps = SpecProps & AreaSeriesSpec;

type DefaultProps =
  | 'seriesType'
  | 'groupId'
  | 'xScaleType'
  | 'yScaleType'
  | 'xAccessor'
  | 'yAccessors'
  | 'yScaleToDataExtent';

export class AreaSeriesSpecComponent extends React.PureComponent<AreaSpecProps> {
  public static defaultProps: Pick<AreaSpecProps, DefaultProps> = {
    seriesType: 'area',
    groupId: getGroupId('__global__'),
    xScaleType: ScaleType.Ordinal,
    yScaleType: ScaleType.Linear,
    xAccessor: 'x',
    yAccessors: ['y'],
    yScaleToDataExtent: false,
  };
  public componentDidMount() {
    const { chartStore, children, ...config } = this.props;
    chartStore!.addSeriesSpec({ ...config });
  }
  public componentDidUpdate() {
    const { chartStore, children, ...config } = this.props;
    chartStore!.addSeriesSpec({ ...config });
  }
  public componentWillUnmount() {
    const { chartStore, id } = this.props;
    chartStore!.removeSeriesSpec(id);
  }
  public render() {
    return null;
  }
}

export const AreaSeries = inject('chartStore')(AreaSeriesSpecComponent);

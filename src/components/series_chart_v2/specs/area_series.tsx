import { inject } from 'mobx-react';
import React from 'react';
import { AreaSeriesSpec } from '../commons/series/specs';
import { getGroupId } from '../commons/utils/ids';
import { ScaleType } from '../commons/utils/scales';
import { SpecProps } from './specs_parser';

type AreaSpecProps = SpecProps & AreaSeriesSpec;

type DefaultProps = 'groupId' | 'xScaleType' | 'yScaleType' | 'xAccessor' | 'yAccessors' | 'yScaleToDataExtent';

export class AreaSeriesSpecComponent extends React.PureComponent<AreaSpecProps> {
  public static defaultProps: Pick<AreaSpecProps, DefaultProps> = {
    groupId: getGroupId('__global__'),
    xScaleType: ScaleType.Ordinal,
    yScaleType: ScaleType.Linear,
    xAccessor: 'x',
    yAccessors: ['y'],
    yScaleToDataExtent: false,
  };
  public componentDidMount() {
    const { chartStore, children, ...config } = this.props;
    chartStore!.addAreaSeriesSpecs({ ...config });
  }
  public componentDidUpdate() {
    const { chartStore, children, ...config } = this.props;
    chartStore!.addAreaSeriesSpecs({ ...config });
  }
  public componentWillUnmount() {
    const { chartStore, id } = this.props;
    chartStore!.removeAreaSeriesSpecs(id);
  }
  public render() {
    return null;
  }
}

export const AreaSeries = inject('chartStore')(AreaSeriesSpecComponent);

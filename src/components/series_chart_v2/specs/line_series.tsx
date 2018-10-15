import { inject } from 'mobx-react';
import React from 'react';
import { ScaleType } from '../commons/data_ops/scales';
import { getGroupId } from '../commons/ids';
import { LineSeriesSpec } from '../commons/series/specs';
import { SpecProps } from './specs_parser';

type LineSpecProps = SpecProps & LineSeriesSpec;

type DefaultProps = 'groupId' | 'xScaleType' | 'yScaleType' | 'xAccessor' | 'yAccessors' | 'yScaleToDataExtent';

export class LineSeriesSpecComponent extends React.PureComponent<LineSpecProps> {
  public static defaultProps: Pick<LineSpecProps, DefaultProps> = {
    groupId: getGroupId('__global__'),
    xScaleType: ScaleType.Ordinal,
    yScaleType: ScaleType.Linear,
    xAccessor: 'x',
    yAccessors: ['y'],
    yScaleToDataExtent: false,
  };
  public componentDidMount() {
    const { chartStore, children, ...config } = this.props;
    chartStore!.addLineSeriesSpecs({ ...config });
  }
  public componentDidUpdate() {
    const { chartStore, children, ...config } = this.props;
    chartStore!.addLineSeriesSpecs({ ...config });
  }
  public componentWillUnmount() {
    const { chartStore, id } = this.props;
    chartStore!.removeLineSeriesSpecs(id);
  }
  public render() {
    return null;
  }
}

export const LineSeries = inject('chartStore')(LineSeriesSpecComponent);

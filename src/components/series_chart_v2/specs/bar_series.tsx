import { inject } from 'mobx-react';
import React from 'react';
import { getGroupId } from '../commons/ids';
import { ScaleType } from '../commons/scales';
import { DataSeriesSpec, DataSeriesType } from '../commons/specs';
import { SpecProps } from './specs';

type BarSpecProps = SpecProps & DataSeriesSpec;

class BarSeriesSpec extends React.PureComponent<BarSpecProps> {
  public static defaultProps: Partial<BarSpecProps> = {
    groupId: getGroupId('__global__'),
    type: DataSeriesType.Bar,
    xScaleType: ScaleType.Linear,
    yScaleType: ScaleType.Linear,
    xAccessor: (d) => d.x,
    yAccessor: (d) => d.y,
    scaleToExtent: false,
    // onMouseOver: () => {},
    // onMouseOut: () => {},
    // grouping: {
    //   xAccessor: ({ group }) => group,
    //   type: 'group',
    //   subElements: {
    //     xAccessor: ({ level1 }) => level1,
    //     type: 'group',
    //     subElements: {
    //       yAccessor: ({ y }) => y,
    //       type: 'stack',
    //     },
    //   },
    // },
  };
  public componentDidMount() {
    const { chartStore, children, ...config } = this.props;
    chartStore.addSeriesSpecs({ ...config });
  }
  public componentDidUpdate() {
    const { chartStore, children, ...config } = this.props;
    chartStore.addSeriesSpecs({ ...config });
  }
  public componentWillUnmount() {
    const { chartStore, id } = this.props;
    chartStore.removeSeriesSpecs(id);
  }
  public render() {
    return null;
  }
}

export const BarSeries = inject('chartStore')(BarSeriesSpec);

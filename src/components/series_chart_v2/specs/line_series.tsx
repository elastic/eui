import { inject } from 'mobx-react';
import React from 'react';
import { getGroupId } from '../commons/ids';
import { CurveType } from '../commons/line_series';
import { ScaleType } from '../commons/scales';
import { DataSeriesSpec, DataSeriesType } from '../commons/specs';
import { SpecProps } from './specs';
interface LineSeriesExtraProps {
  curveType: CurveType;
}
type LineSpecProps = SpecProps & DataSeriesSpec & LineSeriesExtraProps;

class LineSeriesSpec extends React.PureComponent<LineSpecProps> {
  public static defaultProps: Partial<LineSpecProps> = {
    groupId: getGroupId('__global__'),
    type: DataSeriesType.Line,
    xScaleType: ScaleType.Linear,
    yScaleType: ScaleType.Linear,
    xAccessor: (d) => d.x,
    yAccessor: (d) => d.y,
    scaleToExtent: false,
    curveType: CurveType.LINEAR,
  };

  public componentDidMount() {
    const { chartStore, children, curveType, ...config } = this.props;
    chartStore!.addSeriesSpecs({ ...config });
  }

  public componentDidUpdate() {
    const { chartStore, children, curveType, ...config } = this.props;
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

export const LineSeries = inject('chartStore')(LineSeriesSpec);

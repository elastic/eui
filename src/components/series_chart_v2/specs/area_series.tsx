import { inject } from 'mobx-react';
import React from 'react';
import { getGroupId } from '../commons/ids';
import { CurveType } from '../commons/line_series';
import { ScaleType } from '../commons/scales';
import { DataSeriesSpec, DataSeriesType } from '../commons/specs';
import { SpecProps } from './specs';
interface AreaSeriesExtraProps {
  curveType: CurveType;
}
type AreaSpecProps = SpecProps & DataSeriesSpec & AreaSeriesExtraProps;

class AreaSeriesSpec extends React.PureComponent<AreaSpecProps> {
  public static displayName = 'AreaSeries';
  public static defaultProps: Partial<AreaSpecProps> = {
    groupId: getGroupId('__global__'),
    type: DataSeriesType.Area,
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
const AreaSeries = inject('chartStore')(AreaSeriesSpec);
AreaSeries.displayName = 'areaseries';
export { AreaSeries };

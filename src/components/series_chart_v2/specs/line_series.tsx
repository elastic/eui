// import { inject } from 'mobx-react';
// import React from 'react';
// import { ScaleType } from '../commons/data_ops/scales';
// import { getGroupId } from '../commons/ids';
// import { DataSeriesSpec, DataSeriesType } from '../commons/series/specs';
// import { CurveType } from '../commons/series/utils/curves';
// import { SpecProps } from './specs_root';
// interface LineSeriesExtraProps {
//   curveType: CurveType;
// }
// type LineSpecProps = SpecProps & DataSeriesSpec & LineSeriesExtraProps;

// class LineSeriesSpec extends React.PureComponent<LineSpecProps> {
//   public static defaultProps: Partial<LineSpecProps> = {
//     groupId: getGroupId('__global__'),
//     type: DataSeriesType.Line,
//     xScaleType: ScaleType.Linear,
//     yScaleType: ScaleType.Linear,
//     xAccessor: (d) => d.x,
//     yAccessor: (d) => d.y,
//     scaleToExtent: false,
//     curveType: CurveType.LINEAR,
//   };

//   public componentDidMount() {
//     const { chartStore, children, curveType, ...config } = this.props;
//     chartStore!.addSeriesSpecs({ ...config });
//   }

//   public componentDidUpdate() {
//     const { chartStore, children, curveType, ...config } = this.props;
//     chartStore!.addSeriesSpecs({ ...config });
//   }

//   public componentWillUnmount() {
//     const { chartStore, id } = this.props;
//     chartStore!.removeSeriesSpecs(id);
//   }

//   public render() {
//     return null;
//   }
// }

// export const LineSeries = inject('chartStore')(LineSeriesSpec);

import { Accessor } from '../domains/accessor';
import { AxisId, GroupId, SpecId } from '../ids';
import { ScaleType } from '../scales';

export type Datum = any;

export enum DataSeriesType {
  Bar = 'bar',
  Line = 'line',
  Area = 'area',
  Point = 'point',
}

export interface DataSeriesSpec {
  id: SpecId;
  groupId: GroupId;
  type: DataSeriesType;
  data: Datum[];
  scaleToExtent: boolean;
  xAccessor: Accessor;
  yAccessor: Accessor | Accessor[];
  xScaleType: ScaleType;
  yScaleType: ScaleType;
  stackAccessor?: Accessor | Accessor[];
}

export interface BasicSeriesSpec {
  id: SpecId;
  groupId: GroupId;
  data: Datum[];
  splitChartAccessor?: Accessor | Accessor[];
}

// export interface LineSeriesSpec extends BasicSeriesSpec {
//   xAccessor: Accessor;
//   yAccessor: Accessor;
//   xScaleType: ScaleType;
//   yScaleType: ScaleType;
//   /** if true, the min y value is set to the minimum domain value, 0 otherwise */
//   yScaleToDataExtent: boolean;
//   splitSeriesAccessor?: Accessor;
//   stackAccessor?: Accessor;
// }

// export interface AreaSeriesSpec extends BasicSeriesSpec {
//   xAccessor: Accessor;
//   yAccessor: Array<Accessor | [Accessor, Accessor]>;
//   xScaleType: ScaleType;
//   yScaleType: ScaleType;
//   /** if true, the area y0 value is set to the minimum domain value, 0 otherwise */
//   yScaleToDataExtent: boolean;
//   splitSeriesAccessor?: Accessor;
//   stackAccessor?: Accessor | Accessor[];
// }

export interface BarSeriesSpec extends BasicSeriesSpec {
  xAccessor: Accessor;
  yAccessors: Accessor[];
  xScaleType: ScaleType;
  yScaleType: ScaleType;
  /** if true, the min y value is set to the minimum domain value, 0 otherwise */
  yScaleToDataExtent: boolean;
  splitSeriesAccessors?: Accessor[];
  stackAccessors?: Accessor[];
}

export interface AxisSpec {
  id: AxisId;
  groupId: GroupId;
  hide: boolean;
  showOverlappingTicks: boolean;
  showOverlappingLabels: boolean;
  position: AxisPosition;
  orientation: AxisOrientation;
  tickSize: number;
  tickPadding: number;
  tickFormat: (value: any) => string;
  groupingLayer?: number;
}

export enum AxisPosition {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

export enum AxisOrientation {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

import { Accessor } from '../data_ops/accessor';
import { ScaleType } from '../data_ops/scales';
import { AxisId, GroupId, SpecId } from '../ids';

export type Datum = any;
export type Rotation = 0 | 90 | -90 | 180;
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

/**
 * A Bar series spec. This specs specify how the bar series is configured
 * and provides data together with all configured accessors.
 */
export interface BasicSeriesSpec {
  id: SpecId;
  groupId: GroupId;
  data: Datum[];
  splitChartAccessor?: Accessor | Accessor[];
}

export interface BarSeriesSpec extends BasicSeriesSpec {
  xAccessor: Accessor;
  yAccessors: Accessor[];
  xScaleType: ScaleType;
  yScaleType: ScaleType;
  /** if true, the min y value is set to the minimum domain value, 0 otherwise */
  yScaleToDataExtent: boolean;
  splitSeriesAccessors?: Accessor[];
  stackAccessors?: Accessor[];
  colorAccessors?: Accessor[];
  tooltipLevel?: number;
}

export interface LineSeriesSpec extends BasicSeriesSpec {
  xAccessor: Accessor;
  yAccessors: Accessor[];
  xScaleType: ScaleType;
  yScaleType: ScaleType;
  /** if true, the min y value is set to the minimum domain value, 0 otherwise */
  yScaleToDataExtent: boolean;
  splitSeriesAccessors?: Accessor[];
  stackAccessors?: Accessor[];
  colorAccessors?: Accessor[];
  tooltipLevel?: number;
}

export interface AreaSeriesSpec extends BasicSeriesSpec {
  xAccessor: Accessor;
  yAccessors: Accessor[];
  xScaleType: ScaleType;
  yScaleType: ScaleType;
  /** if true, the min y value is set to the minimum domain value, 0 otherwise */
  yScaleToDataExtent: boolean;
  splitSeriesAccessors?: Accessor[];
  stackAccessors?: Accessor[];
  colorAccessors?: Accessor[];
  tooltipLevel?: number;
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
  /** Select the level of ticks to show. Currently not implemented. */
  groupingLevel?: number;
  /** The axis title */
  title?: string;
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

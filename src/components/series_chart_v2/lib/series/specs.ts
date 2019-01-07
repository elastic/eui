import { TooltipPosition } from '../../state/chart_state';
import { Accessor } from '../utils/accessor';
import { Domain } from '../utils/domain';
import { AxisId, GroupId, SpecId } from '../utils/ids';
import { ScaleContinuousType, ScaleType } from '../utils/scales/scales';
import { CurveType } from './curves';

export type Datum = any;
export type Rotation = 0 | 90 | -90 | 180;
export type Rendering = 'canvas' | 'svg';
export enum DataSeriesType {
  Bar = 'bar',
  Line = 'line',
  Area = 'area',
  Point = 'point',
}
export interface GeomDatum {
  specId: SpecId;
  yAccessor: Accessor;
  datum: Datum;
  tooltipPosition: TooltipPosition;
}
/**
 * A Bar series spec. This specs specify how the bar series is configured
 * and provides data together with all configured accessors.
 */
export interface SeriesSpec {
  /* The ID of the spec, generated via getSpecId method */
  id: SpecId;
  /* The ID of the spec, generated via getGroupId method, default to __global__ */
  groupId: GroupId;
  /* An array of data */
  data: Datum[];
  /* If specified, it constrant the x domain to these values */
  xDomain?: Domain;
  /* If specified, it constrant the y Domain to these values */
  yDomain?: Domain;
  /* The type of series you are looking to render */
  seriesType: 'bar' | 'line' | 'area' | 'basic';
}

export interface SeriesAccessors {
  /* The field name of the x value on Datum object */
  xAccessor: Accessor;
  /* An array of field names one per y metric value */
  yAccessors: Accessor[];
  /* An array of fields thats indicates the datum series membership */
  splitSeriesAccessors?: Accessor[];
  /* An array of fields thats indicates the stack membership */
  stackAccessors?: Accessor[];
  /* An optional array of field name thats indicates the stack membership */
  colorAccessors?: Accessor[];
}

export interface SeriesScales {
  /* The x axis scale type */
  xScaleType: ScaleType;
  /* The y axis scale type */
  yScaleType: ScaleContinuousType;
  /** if true, the min y value is set to the minimum domain value, 0 otherwise */
  yScaleToDataExtent: boolean;
}

export type BasicSeriesSpec = SeriesSpec & SeriesAccessors & SeriesScales;

export type BarSeriesSpec = BasicSeriesSpec & {
  seriesType: 'bar';
};

export type LineSeriesSpec = BasicSeriesSpec  & {
  seriesType: 'line';
  curve?: CurveType;
};

export type AreaSeriesSpec = BasicSeriesSpec & {
  seriesType: 'area';
  curve?: CurveType;
};

export interface AxisSpec {
  id: AxisId;
  groupId: GroupId;
  hide: boolean;
  showOverlappingTicks: boolean;
  showOverlappingLabels: boolean;
  position: Position;
  tickSize: number;
  tickPadding: number;
  tickFormat: TickFormatter;
  /** The axis title */
  title?: string;
}

export type TickFormatter = (value: any) => string;

/**
 * The position of the axis relative to the chart.
 * A left or right positioned axis is a vertical axis.
 * A top or bottom positioned axis is an horizontal axis.
 */
export enum Position {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

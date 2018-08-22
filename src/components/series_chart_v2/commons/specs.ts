import { Accessor } from './domain';
import { ScaleType } from './scales';
type Datum = any;

export type SpecId = string;
export type GroupId = string;
export type AxisId = string;

export interface GeneralSpec {
  id: SpecId;
  groupId: GroupId;
}

export interface DataSeriesSpec extends GeneralSpec {
  data: Datum[];
  xAccessor: Accessor;
  yAccessor: Accessor;
  xScaleType: ScaleType;
  yScaleType: ScaleType;
  groupAccessors: Accessor[];
}

export interface SeriesDomains {
  xDomain: number[] | string[] | [number, number] | [undefined, undefined];
  yDomain: number[] | string[] | [number, number] | [undefined, undefined];
}
export interface SeriesScaleTypes {
  xScaleType: ScaleType;
  yScaleType: ScaleType;
}
export interface SeriesScales {
  domains: SeriesDomains;
  scaleTypes: SeriesScaleTypes;
}

export interface AxisSpec extends GeneralSpec {
  hide: boolean;
  showOverlappingTicks: boolean;
  showOverlappingLabels: boolean;
  position: AxisPosition;
  orientation: AxisOrientation;
  tickSize: number;
  tickPadding: number;
  tickFormat: (value: any) => string;
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

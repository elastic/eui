import { Accessor } from './domain';
import { AxisId, GroupId, SpecId } from './ids';
import { ScaleType } from './scales';

type Datum = any;
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
  yAccessor: Accessor;
  xScaleType: ScaleType;
  yScaleType: ScaleType;
  groupAccessors: Accessor[];
}

export type Domain = number[] | string[] | [number, number] | [undefined, undefined];

export interface SeriesDomains {
  xDomain: Domain;
  yDomain: Domain;
}
export interface SeriesScaleTypes {
  xScaleType: ScaleType;
  yScaleType: ScaleType;
}
export interface SeriesScales {
  domains: SeriesDomains;
  scaleTypes: SeriesScaleTypes;
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

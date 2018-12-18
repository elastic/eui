import { area, line } from 'd3-shape';
import { SpecId } from '../utils/ids';
import { Scale } from '../utils/scales/scales';
import { CurveType, getCurveFactory } from './curves';
import { DataSeriesDatum } from './series';

export interface GeometryValue {
  specId: SpecId;
  datum: any;
  seriesKey: any[];
}
export interface PointGeometry {
  x: number;
  y: number;
  color: string;
  value: GeometryValue;
  transform: {
    x: number,
    y: number,
  };
}
export interface BarGeometry {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  value: GeometryValue;
}
export interface LineGeometry {
  line: string;
  points: PointGeometry[];
  color: string;
  transform: {
    x: number,
    y: number,
  };
}
export interface AreaGeometry {
  area: string;
  line: string;
  points: PointGeometry[];
  color: string;
  transform: {
    x: number,
    y: number,
  };
}

export function renderPoints(
  shift: number,
  dataset: DataSeriesDatum[],
  xScale: Scale,
  yScale: Scale,
  color: string,
  specId: SpecId,
  seriesKey: any[],
): PointGeometry[] {
  return dataset.map((datum) => {
    return {
      x: xScale.scale(datum.x),
      y: yScale.scale(datum.y1),
      color,
      value: {
        specId,
        datum: datum.datum,
        seriesKey,
      },
      transform: {
        x: shift,
        y: 0,
      },
    };
  });
}

export function renderBars(
  orderIndex: number,
  dataset: DataSeriesDatum[],
  xScale: Scale,
  yScale: Scale,
  color: string,
  specId: SpecId,
  seriesKey: any[],
): BarGeometry[] {
  return dataset.map((datum, i) => {
    return {
      x: xScale.scale(datum.x) + xScale.bandwidth * orderIndex,
      y: yScale.scale(datum.y1), // top most value
      width: xScale.bandwidth,
      height: yScale.scale(datum.y0) - yScale.scale(datum.y1),
      color,
      value: {
        specId,
        datum: datum.datum,
        seriesKey,
      },
    };
  });
}

export function renderLine(
  shift: number,
  dataset: DataSeriesDatum[],
  xScale: Scale,
  yScale: Scale,
  color: string,
  curve: CurveType,
  specId: SpecId,
  seriesKey: any[],
): LineGeometry {
  const pathGenerator = line<DataSeriesDatum>()
    .x((datum: DataSeriesDatum) => xScale.scale(datum.x))
    .y((datum: DataSeriesDatum) => yScale.scale(datum.y1))
    .curve(getCurveFactory(curve));
  const y = 0;
  const x = shift;
  console.log(x);
  return {
    line: pathGenerator(dataset) || '',
    points: renderPoints(shift, dataset, xScale, yScale, color, specId, seriesKey),
    color,
    transform: {
      x,
      y,
    },
  };
}

export function renderArea(
  shift: number,
  dataset: DataSeriesDatum[],
  xScale: Scale,
  yScale: Scale,
  color: string,
  curve: CurveType,
  specId: SpecId,
  seriesKey: any[],
): AreaGeometry {
  const pathGenerator = area<DataSeriesDatum>()
    .x((datum: DataSeriesDatum) => xScale.scale(datum.x))
    .y1((datum: DataSeriesDatum) => yScale.scale(datum.y1))
    .y0((datum: DataSeriesDatum) => yScale.scale(datum.y0))
    .curve(getCurveFactory(curve));
  const lineGeometry = renderLine(shift, dataset, xScale, yScale, color, curve, specId, seriesKey);
  return {
    area: pathGenerator(dataset) || '',
    line: lineGeometry.line,
    points: lineGeometry.points,
    color,
    transform: lineGeometry.transform,
  };
}

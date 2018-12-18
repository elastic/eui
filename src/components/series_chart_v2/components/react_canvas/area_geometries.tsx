import {  Group as KonvaGroup } from 'konva';
import { IAction } from 'mobx';
import React from 'react';
import { Circle, Group, Path } from 'react-konva';
import { animated, Spring } from 'react-spring/dist/konva';
import { AreaGeometry, PointGeometry } from '../../lib/series/rendering';
import { AreaSeriesStyle } from '../../lib/themes/theme';
import { TooltipData } from '../../state/chart_state';

interface AreaGeometriesDataProps {
  animated?: boolean;
  areas: AreaGeometry[];
  num?: number;
  style: AreaSeriesStyle;
  onElementOver: ((tooltip: TooltipData) => void) & IAction;
  onElementOut: (() => void) & IAction;
}
export class AreaGeometries extends React.PureComponent<AreaGeometriesDataProps> {
  public static defaultProps: Partial<AreaGeometriesDataProps> = {
    animated: false,
    num: 1,
  };
  private readonly barSeriesRef: React.RefObject<KonvaGroup> = React.createRef();
  constructor(props: AreaGeometriesDataProps) {
    super(props);
    this.barSeriesRef = React.createRef();
  }
  public render() {
    return (
      <Group ref={this.barSeriesRef} key={'bar_series'}>
        {
          this.renderAreaGeoms()
        }
        {
          this.renderAreaPoints()
        }
      </Group>
    );
  }
  private renderAreaPoints = (): JSX.Element[] => {
    const { areas } = this.props;
    return areas.reduce((acc, glyph, i) => {
      const { points } = glyph;
      return [...acc, ...this.renderPoints(points)];
    }, [] as JSX.Element[]);
  }
  private renderPoints = (points: PointGeometry[]): JSX.Element[] => {
    const { style, onElementOver, onElementOut } = this.props;
    return points.map((point) => {
      const { x, y, color, value, transform } = point;
      return <Circle
        x={transform.x + x}
        y={y}
        radius={style.dataPointsRadius}
        stroke={color}
        strokeWidth={style.dataPointsStrokeWidth}
        // fill={point.color}
        onMouseOver={() => {
          onElementOver({
            value,
            position: {
              left: transform.x + x,
              top: y,
            },
          });
        }}
        onMouseLeave={() => {
          onElementOut();
        }}
        /> ;
    });
  }
  private renderAreaGeoms = (): JSX.Element[] => {
    const { areas } = this.props;
    const PathComponent = this.props.animated ? animated.Path : Path;
    return areas.reverse().map((glyph, i) => {
      const { area, color, transform } = glyph;
      if (this.props.animated) {
        return (
          <Group key={i} x={transform.x}>
            <Spring
              native
              from={{ area }}
              to={{ area }}
              >
                {(props: {area: string}) => (
                  <PathComponent
                    key="area"
                    data={props.area}
                    fill={color}
                    listening={false}
                    areaCap="round"
                    areaJoin="round"
                    opacity={0.4}
                  />
                )}
            </Spring>
          </Group>
        );
      } else {
        return <PathComponent
          key="area"
          data={area}
          fill={color}
          listening={false}
          areaCap="round"
          areaJoin="round"
          opacity={0.4}
        />;
      }
    });
  }
}

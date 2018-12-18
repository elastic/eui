import { Group as KonvaGroup } from 'konva';
import { IAction } from 'mobx';
import React from 'react';
import { Circle, Group, Path } from 'react-konva';
import { animated, Spring } from 'react-spring/dist/konva';
import { LineGeometry, PointGeometry } from '../../lib/series/rendering';
import { LineSeriesStyle } from '../../lib/themes/theme';
import { TooltipData } from '../../state/chart_state';

interface LineGeometriesDataProps {
  animated?: boolean;
  lines: LineGeometry[];
  style: LineSeriesStyle;
  onElementOver: ((tooltip: TooltipData) => void) & IAction;
  onElementOut: (() => void) & IAction;
}
export class LineGeometries extends React.PureComponent<LineGeometriesDataProps> {
  public static defaultProps: Partial<LineGeometriesDataProps> = {
    animated: false,
  };
  private readonly barSeriesRef: React.RefObject<KonvaGroup> = React.createRef();
  constructor(props: LineGeometriesDataProps) {
    super(props);
    this.barSeriesRef = React.createRef();
  }
  public render() {
    return (
      <Group ref={this.barSeriesRef} key={'bar_series'}>
        {
          this.renderLineGeoms()
        }
        {
          this.renderLinePoints()
        }
      </Group>
    );
  }
  private renderLinePoints = (): JSX.Element[] => {
    const { lines } = this.props;
    return lines.reduce((acc, glyph, i) => {
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
  private renderLineGeoms = (): JSX.Element[] => {
    const { style, lines } = this.props;
    const PathComponent = this.props.animated ? animated.Path : Path;
    return lines.map((glyph, i) => {
      const { line, color, transform } = glyph;
      if (this.props.animated) {
        return (
          <Group key={i} x={transform.x}>
            <Spring
              native
              from={{ line }}
              to={{ line }}
              >
                {(props: {line: string}) => (
                  <PathComponent
                    key="line"
                    data={props.line}
                    strokeWidth={style.lineWidth}
                    stroke={color}
                    listening={false}
                    lineCap="round"
                    lineJoin="round"

                  />
                )}
            </Spring>
          </Group>
        );
      } else {
        return <PathComponent
          key="line"
          data={line}
          strokeWidth={style.lineWidth}
          stroke={color}
          listening={false}
          lineCap="round"
          lineJoin="round"
        />;
      }
    });
  }
}

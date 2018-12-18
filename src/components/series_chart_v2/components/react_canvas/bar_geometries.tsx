import { Group as KonvaGroup } from 'konva';
import { IAction } from 'mobx';
import React from 'react';
import { Group, Rect } from 'react-konva';
import { animated, Spring } from 'react-spring/dist/konva';
import { BarGeometry } from '../../lib/series/rendering';
import { TooltipData } from '../../state/chart_state';

interface BarGeometriesDataProps {
  animated?: boolean;
  bars: BarGeometry[];
  onElementOver: ((tooltip: TooltipData) => void) & IAction;
  onElementOut: (() => void) & IAction;
}
export class BarGeometries extends React.PureComponent<BarGeometriesDataProps> {
  public static defaultProps: Partial<BarGeometriesDataProps> = {
    animated: false,
  };
  private readonly barSeriesRef: React.RefObject<KonvaGroup> = React.createRef();
  constructor(props: BarGeometriesDataProps) {
    super(props);
    this.barSeriesRef = React.createRef();
  }
  public render() {
    const { bars } = this.props;
    return (
      <Group ref={this.barSeriesRef} key={'bar_series'}>
        {
          this.renderBarGeoms(bars)
        }
      </Group>
    );
  }
  private renderBarGeoms = (bars: BarGeometry[]): JSX.Element[] => {
    const { onElementOver, onElementOut } = this.props;
    return bars.map((glyph, i) => {
      const { x, y, width, height, color, value } = glyph;
      if (this.props.animated) {
        return (
          <Group key={i}>
            <Spring
              native
              from={{ y: y + height, height: 0 }}
              to={{ y, height }}
              >
                {(props: {y: number, height: number}) => (
                  <animated.Rect
                    key="animatedRect"
                    x={x}
                    y={props.y}
                    width={width}
                    height={props.height}
                    fill={color}
                    strokeWidth={0}
                    // listening={false}
                    // opacity={0.2}
                    perfectDrawEnabled={true}
                    onMouseOver={() => {
                      onElementOver({
                        value,
                        position: {
                          left: x,
                          top: y,
                        },
                      });
                    }}
                    onMouseLeave={() => {
                      onElementOut();
                    }}
                  />
                )}
            </Spring>
          </Group>
        );
      } else {
        return <Rect
          key={i}
          x={x}
          y={y}
          width={width}
          height={height}
          fill={color}
          strokeWidth={0}
          opacity={1}
          perfectDrawEnabled={false}
          onMouseOver={() => {
            onElementOver({
              value,
              position: {
                left: x,
                top: y,
              },
            });
          }}
          onMouseLeave={() => {
            onElementOut();
          }}
        />;
      }
    });
  }
}

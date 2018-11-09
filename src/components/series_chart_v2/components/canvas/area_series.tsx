import { Group as KonvaGroup } from 'konva';
import React from 'react';
import { Circle, Group, Path } from 'react-konva';
import { animated, Spring } from 'react-spring/dist/konva';
import { AreaGlyph } from '../../lib/series/areas/rendering';
import { AreaSeriesStyle } from '../../lib/themes/theme';
import { SpecId } from '../../lib/utils/ids';

interface AreaSeriesDataProps {
  specId: SpecId;
  animated?: boolean;
  glyphs: AreaGlyph[];
  style: AreaSeriesStyle;
  isStacked: boolean;
}

export class AreaSeries extends React.Component<AreaSeriesDataProps> {
  public static defaultProps: Partial<AreaSeriesDataProps> = {
    animated: false,
    isStacked: false,
  };
  private readonly lineSeriesRef: React.RefObject<KonvaGroup> = React.createRef();
  constructor(props: AreaSeriesDataProps) {
    super(props);
    this.lineSeriesRef = React.createRef();
  }
  public render() {
    const { glyphs, style } = this.props;
    return (
      <Group ref={this.lineSeriesRef}>
        {!style.hideArea && this.renderAreas(glyphs)}
        {!style.hideLine && this.renderLines(glyphs, style)}
      </Group>
    );
  }
  private renderAreas = (glyphs: AreaGlyph[]): JSX.Element[] => {
    const opacity = !this.props.isStacked && glyphs.length > 1 ? 0.2 : 1;
    return glyphs.map((glyph, i) => {
      if (this.props.animated) {
        return (
          <Spring
            key={`spring-area${i}`}
            native
            from={{  initialOpacity: 0, path: glyph.path }}
            to={{  initialOpacity: opacity, path: glyph.path }}
            >
              {(props: {initialOpacity: number, path: string}) => (
                <animated.Path
                  key={`area${i}`}
                  data={props.path}
                  fill={glyph.color}
                  listening={false}
                  opacity={props.initialOpacity}
                />
              )}
          </Spring>
        );
      } else {
        return <Path
          key={`area${i}`}
          data={glyph.path}
          fill={glyph.color}
          listening={false}
          opacity={opacity}
        />;
      }
    });
  }
  private renderLines = (glyphs: AreaGlyph[], style: AreaSeriesStyle): JSX.Element[] => {
    return glyphs.map((glyph, i) => {
      return this.renderLine(glyph, i, style);
    });
  }

  private renderLine = (glyph: AreaGlyph, i: number, style: AreaSeriesStyle): JSX.Element => {
    const { isStacked } = this.props;
    if (this.props.animated) {
      return (
        <Spring
          key={`spring-area${i}`}
          native
          duration={250}
          from={{ opacity: 0, path: glyph.path, points: glyph.points }}
          to={{ opacity: 1, path: glyph.path, points: glyph.points }}
          >
            {(props: {opacity: number, path: string, points: Array<{x: number, y1: number, y0: number}>}) => {
              return this.renderLineGlyphs(
                true,
                props.path,
                props.opacity,
                i,
                style,
                glyph.points,
                isStacked,
                glyph.color,
              );
            }}
        </Spring>
      );
    } else {
      return this.renderLineGlyphs(false, glyph.path, 1, i, style, glyph.points, isStacked, glyph.color);
    }
  }

  private renderLineGlyphs = (
    isAnimated: boolean,
    linePath: string,
    opacity: number,
    i: number,
    style: AreaSeriesStyle,
    points: Array<{x: number, y1: number, y0: number}>,
    isStacked: boolean,
    color?: string,
    ) => {
      const PathComponent = isAnimated ? animated.Path : Path;
      return (<Group key={i}>
      {
        !style.hideBorder && isStacked && <PathComponent
          key="border"
          data={linePath}
          strokeWidth={style.borderWidth}
          stroke={style.borderStrokeColor}
          listening={false}
          lineCap="round"
          lineJoin="round"
          opacity={opacity}
        />
      }
      {
        !style.hideLine && isStacked && <PathComponent
          key="line"
          data={linePath}
          strokeWidth={style.lineWidth}
          stroke={style.lineStrokeColor}
          listening={false}
          lineCap="round"
          lineJoin="round"
          opacity={opacity}
        />
      }
      {
        !style.hideDataPoints  && isStacked && points.map((point, pointIndex) => {
          return <Circle
              key={`point${pointIndex}`}
              x={point.x}
              y={point.y1}
              radius={style.dataPointsRadius}
              fill={color}
              opacity={opacity}
              // stroke={style.dataPointsStroke}
              // strokeWidth={undefined}
            />;
        })
      }
    </Group>
    );
  }
}

import { Group as KonvaGroup } from 'konva';
import React from 'react';
import { Circle, Group, Path } from 'react-konva';
import { SpecId } from '../../commons/ids';
import { AreaGlyph } from '../../commons/series/areas/rendering';
import { AreaSeriesStyle } from '../../commons/themes/theme';
interface AreaSeriesDataProps {
  specId: SpecId;
  animated?: boolean;
  glyphs: AreaGlyph[];
  style: AreaSeriesStyle;
}

export class AreaSeries extends React.Component<AreaSeriesDataProps> {
  public static defaultProps: Partial<AreaSeriesDataProps> = {
    animated: false,
  };
  private readonly lineSeriesRef: React.RefObject<KonvaGroup> = React.createRef();
  constructor(props: AreaSeriesDataProps) {
    super(props);
    this.lineSeriesRef = React.createRef();
  }
  public render() {
    const { animated, glyphs, style } = this.props;
    if (animated) {
      return this.renderAnimatedAreas();
    } else {
      return (
      <Group ref={this.lineSeriesRef}>
        {!style.hideArea && this.renderAreas(glyphs)}
        {!style.hideLine && this.renderLines(glyphs, style)}
      </Group>);
    }
  }
  private renderAreas = (glyphs: AreaGlyph[]): JSX.Element[] => {
    return glyphs.map((glyph, i) => {
      return (
        <Path
          key={`area${i}`}
          data={glyph.path}
          fill={glyph.color}
          listening={false}
          opacity={0.5}
        />
      );
    });
  }
  private renderLines = (glyphs: AreaGlyph[], style: AreaSeriesStyle): JSX.Element[] => {
    return glyphs.map((glyph, i) => {
      return (
        <Group key={i}>
          {
            !style.hideBorder && <Path
              key="border"
              data={glyph.linePath}
              strokeWidth={style.borderWidth}
              stroke={style.borderStrokeColor}
              listening={false}
              lineCap="round"
              lineJoin="round"
            />
          }
          {
            !style.hideLine && <Path
              key="line"
              data={glyph.linePath}
              strokeWidth={style.lineWidth}
              stroke={style.lineStrokeColor}
              listening={false}
              lineCap="round"
              lineJoin="round"
            />
          }
          {
            !style.hideDataPoints && glyph.points.map((point, pointIndex) => {
              return (
                <Circle
                  key={`point${pointIndex}`}
                  x={point.x}
                  y={point.y1}
                  radius={style.dataPointsRadius}
                  fill={glyph.color}
                  // stroke={style.dataPointsStroke}
                  // strokeWidth={undefined}
                />
              );
            })
          }
        </Group>
      );
    });
  }

  private renderAnimatedAreas = () => {
    return null;
  }
}

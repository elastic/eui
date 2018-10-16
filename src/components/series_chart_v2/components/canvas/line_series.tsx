import { Group as KonvaGroup } from 'konva';
import React from 'react';
import { Circle, Group, Path } from 'react-konva';
import { SpecId } from '../../commons/ids';
import { LineGlyph } from '../../commons/series/lines/rendering';
import { LineSeriesStyle } from '../../commons/themes/theme';
interface LineSeriesDataProps {
  specId: SpecId;
  animated?: boolean;
  glyphs: LineGlyph[];
  style: LineSeriesStyle;
}

export class LineSeries extends React.Component<LineSeriesDataProps> {
  public static defaultProps: Partial<LineSeriesDataProps> = {
    animated: false,
  };
  private readonly lineSeriesRef: React.RefObject<KonvaGroup> = React.createRef();
  constructor(props: LineSeriesDataProps) {
    super(props);
    this.lineSeriesRef = React.createRef();
  }
  public render() {
    const { animated, glyphs, style } = this.props;
    if (animated) {
      return this.renderAnimatedLines();
    } else {
      return <Group ref={this.lineSeriesRef}>{this.renderGlyphs(glyphs, style)}</Group>;
    }
  }

  private renderGlyphs = (glyphs: LineGlyph[], style: LineSeriesStyle): JSX.Element[] => {
    return glyphs.map((glyph, i) => {
      return (
        <Group
        key={i}
        >

          {
            !style.hideBorder && <Path
              key="border"
              data={glyph.path}
              strokeWidth={style.borderWidth}
              stroke={style.borderStrokeColor}
              listening={false}
            />
          }
          {
            !style.hideDataPoints && glyph.points.map((point) => {
              return (
                <Circle
                  x={point.x}
                  y={point.y}
                  radius={style.dataPointsRadius}
                  fill={glyph.color}
                  stroke={style.dataPointsStroke}
                />
              );
            })
          }
          {
            !style.hideLine && <Path
              key="line"
              data={glyph.path}
              strokeWidth={style.lineWidth}
              stroke={glyph.color}
              listening={false}
            />
          }
        </Group>

      );
    });
  }

  private renderAnimatedLines = () => {
    return null;
  }
}

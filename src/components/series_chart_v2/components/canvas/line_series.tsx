import { Group as KonvaGroup } from 'konva';
import React from 'react';
import { Circle, Group, Path } from 'react-konva';
import { LineGlyph } from '../../commons/series/lines/rendering';
import { LineSeriesStyle } from '../../commons/themes/theme';
import { SpecId } from '../../commons/utils/ids';
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

  private renderDataPoints = (
    dataPoints: Array<{x: number, y: number}>,
    color: string | undefined,
    style: LineSeriesStyle,
    ): JSX.Element[] => {
    return dataPoints.map((point) => {
      return (
        <Circle
          x={point.x}
          y={point.y}
          radius={style.dataPointsRadius}
          fill={color}
          stroke={style.dataPointsStroke}
        />
      );
    });
  }

  private renderGlyphs = (glyphs: LineGlyph[], style: LineSeriesStyle): JSX.Element[] => {
    return glyphs.map((glyph, i) => {
      return (
        <Group key={i}>
          {
            !style.hideBorder && <Path
              key="border"
              data={glyph.path}
              strokeWidth={style.borderWidth}
              stroke={style.borderStrokeColor}
              listening={false}
              lineCap="round"
              lineJoin="round"
            />
          }
          {
            !style.hideDataPoints && this.renderDataPoints(glyph.points, glyph.color, style)
          }
          {
            !style.hideLine && <Path
              key="line"
              data={glyph.path}
              strokeWidth={style.lineWidth}
              stroke={glyph.color}
              listening={false}
              lineCap="round"
              lineJoin="round"
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

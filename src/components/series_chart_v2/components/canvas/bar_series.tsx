import React from 'react';
import { Group, Rect } from 'react-konva';
import { BarGlyph, BarGlyphGroup } from '../../commons/series/bars/rendering';

interface BarSeriesDataProps {
  animated?: boolean;
  glyphs: BarGlyphGroup[];
}
export class BarSeries extends React.PureComponent<BarSeriesDataProps> {
  public static defaultProps: Partial<BarSeriesDataProps> = {
    animated: false,
  };
  public render() {
    const { animated, glyphs } = this.props;
    if (animated) {
      return this.renderAnimatedBars(glyphs);
    } else {
      return this.renderGlyphs(glyphs);
    }
  }
  private renderGlyphs = (glyphs: BarGlyphGroup[] | BarGlyph[]): JSX.Element[] => {
    if (Array.isArray(glyphs) && glyphs.length > 0 && !(glyphs[0] as BarGlyphGroup).accessor) {
      // leaf
      return [<Group key={'group-0'}>{this.renderBars(glyphs as BarGlyph[])}</Group>];
    }
    return (glyphs as BarGlyphGroup[]).map((glyph) => {
      return (
        <Group
          key={`group-${glyph.level}-${glyph.levelValue}`}
          x={glyph.translateX}
          y={glyph.translateY}
        >
          {this.renderGlyphs(glyph.elements)}
        </Group>
      );
    });
  }
  private renderBars = (glyphs: BarGlyph[]) => {
    return glyphs.map((element, index) => {
      const { x, y, width, height, fill } = element;
      return (
        <Rect
          key={`rect-${index}`}
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          strokeWidth={0}
          perfectDrawEnabled={false}
        />
      );
    });
  }
  private renderAnimatedBars = (glyphs: BarGlyphGroup[]) => {
    return null;
  }
}

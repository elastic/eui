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
      return this.renderBars(glyphs as BarGlyph[]);
    }
    return (glyphs as BarGlyphGroup[]).map((glyph) => {
      return (
        <Group
          key={`group-${glyph.level}-${glyph.levelValue}`}
          x={glyph.translateX}
          y={glyph.translateY}
        >
        {
          this.renderGlyphs(glyph.elements)
        }
        </Group>
      );
    });
  }
  private renderBars = (glyphs: BarGlyph[]) => {
    return glyphs.map(({x, y, width, height, fill, opacity}, index) => {
      return (
        <Rect
          key={`rect-${index}`}
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
        />);
    });
  }
  private renderAnimatedBars = (glyphs: BarGlyphGroup[]) => {
    return null;
  }
}

import { Group as KonvaGroup } from 'konva';
import React from 'react';
import { Group, Path } from 'react-konva';
import { SpecId } from '../../commons/ids';
import { LineGlyph } from '../../commons/series/lines/rendering';
interface LineSeriesDataProps {
  specId: SpecId;
  animated?: boolean;
  glyphs: LineGlyph[];
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
    const { animated, glyphs } = this.props;
    if (animated) {
      return this.renderAnimatedLines();
    } else {
      return <Group ref={this.lineSeriesRef}>{this.renderGlyphs(glyphs)}</Group>;
    }
  }

  private renderGlyphs = (glyphs: LineGlyph[]): JSX.Element[] => {
    return glyphs.map((glyph, i) => {
      return (
        <Group
        key={i}
        >

          <Path
            key="border"
            data={glyph.path}
            strokeWidth={1}
            stroke="white"
            listening={false}
          />
          <Path
            key="line"
            data={glyph.path}
            strokeWidth={0.5}
            stroke={glyph.color}
            listening={false}
            />
        </Group>

      );
    });
  }

  private renderAnimatedLines = () => {
    return null;
  }
}

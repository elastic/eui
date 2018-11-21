import { Group as KonvaGroup, Node, Shape } from 'konva';
import React from 'react';
import { Circle, Group, Rect } from 'react-konva';
import { Dimensions } from 'react-virtualized';
import { AreaGlyph } from '../../lib/series/areas/rendering';
import { isBarGlyphGroupLeaf } from '../../lib/series/bars/commons';
import { BarGlyphGroup } from '../../lib/series/bars/rendering';
import { Datum } from '../../lib/series/specs';
import { SpecId } from '../../lib/utils/ids';
import { TooltipPosition } from '../../state/chart_state';

interface InteractionsProps {
  debug: boolean;
  chartDimensions: Dimensions;
  areaSeriesGlyphs: Map<SpecId, AreaGlyph[]>;
  barSeriesGlyphs: Map<SpecId, BarGlyphGroup[]>;
  onElementOver?: (specId: SpecId, datum: Datum[], position: TooltipPosition) => void;
  onElementOut?: () => void;
}
export class InteractionsLayer extends React.PureComponent<InteractionsProps> {
  public static defaultProps: Partial<InteractionsProps> = {
    debug: false,
  };
  public render() {
    return (<Group key={'interactions'}>
      {
        this.renderAreaSeriesHighlightMarkers()
      }
      {
        this.renderAreaSeriesSensitiveAreas()
      }
    </Group>);
  }
  private renderAreaSeriesSensitiveArea = (areaGlyphs: AreaGlyph, maxWidth: number, maxHeight: number) => {
    // TODO compute sensitive area in another way, from domain
    let sensitiveAreaWidth = maxWidth;

    if (areaGlyphs.points.length > 1) {
      sensitiveAreaWidth = (areaGlyphs.points[1].x - areaGlyphs.points[0].x);
    }
    return areaGlyphs.points.map((glyph) => {
      return <Rect
        x={glyph.x - sensitiveAreaWidth / 2}
        y={0}
        width={sensitiveAreaWidth}
        height={maxHeight}
        fill="blue"
        stroke="gray"
        opacity={0}
      />;
    });
  }
  private renderAreaSeriesSensitiveAreas = () => {
    const { areaSeriesGlyphs, chartDimensions: {width, height} } = this.props;
    return Array.from(areaSeriesGlyphs.values()).map((glyphs) => {
      return (
      <Group key={'interactions'}>
          {
            glyphs.map((glyph) => this.renderAreaSeriesSensitiveArea(glyph, width, height))
          }
        </Group>
      );
    });
  }

  private renderAreaSeriesPoints = (areaGlyphs: AreaGlyph) => {
    return areaGlyphs.points.map((glyph) => {
      return <Circle x={glyph.x} y={glyph.y1} radius={5} fill="red" listening={false} />;
    });
  }
  private renderAreaSeriesHighlightMarkers = () => {
    const { areaSeriesGlyphs } = this.props;
    return Array.from(areaSeriesGlyphs.values()).map((glyphs) => {
      return (
        <Group key={'interactions'}>
          {
            glyphs.map((glyph) => this.renderAreaSeriesPoints(glyph))
          }
        </Group>
      );
    });
  }
}

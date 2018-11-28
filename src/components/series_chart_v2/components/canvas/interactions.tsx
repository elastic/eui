import React from 'react';
import { Circle, Group, Rect } from 'react-konva';
import { Dimensions } from 'react-virtualized';
import { AreaGlyph } from '../../lib/series/areas/rendering';
import { BarGeom, BarSeriesState } from '../../lib/series/bars/rendering';
import { Datum } from '../../lib/series/specs';
import { SpecId } from '../../lib/utils/ids';
import { TooltipPosition } from '../../state/chart_state';

interface InteractionsProps {
  debug: boolean;
  chartDimensions: Dimensions;
  areaSeriesGlyphs: Map<SpecId, AreaGlyph[]>;
  barSeriesStates: Map<SpecId, BarSeriesState>;
  barSeriesTooltipLevel: number;
  onElementOver?: (specId: SpecId, datum: Datum[], position: TooltipPosition) => void;
  onElementOut?: () => void;
}
export class InteractionsLayer extends React.PureComponent<InteractionsProps> {
  public static defaultProps: Partial<InteractionsProps> = {
    debug: false,
    barSeriesTooltipLevel: 1,
  };
  public render() {
    return (<Group key={'interactions'}>
      {
        this.renderAreaSeriesHighlightMarkers()
      }
      {
        this.renderAreaSeriesSensitiveAreas()
      }
      {
        this.renderBarSeriesSensitiveAreas()
      }
    </Group>);
  }
  private renderAreaSeriesSensitiveArea = (areaGlyphs: AreaGlyph, maxWidth: number, maxHeight: number) => {
    // TODO compute sensitive area in another way, from domain
    let sensitiveAreaWidth = maxWidth;

    if (areaGlyphs.points.length > 1) {
      sensitiveAreaWidth = (areaGlyphs.points[1].x - areaGlyphs.points[0].x);
    }
    sensitiveAreaWidth = 5;
    return areaGlyphs.points.map((glyph, i) => {
      return <Rect
        key={i}
        x={glyph.x - sensitiveAreaWidth / 2}
        y={0}
        width={sensitiveAreaWidth}
        height={maxHeight}
        fill="blue"
        stroke="gray"
        opacity={0.5}
      />;
    });
  }
  private renderAreaSeriesSensitiveAreas = () => {
    const { areaSeriesGlyphs, chartDimensions: {width, height} } = this.props;
    return Array.from(areaSeriesGlyphs.values()).map((glyphs, index) => {
      return (
        <Group key={'interactions'}>
            {
              glyphs.map((glyph) => this.renderAreaSeriesSensitiveArea(glyph, width, height))
            }
        </Group>
      );
    });
  }

  private renderAreaSeriesPoints = (areaGlyphs: AreaGlyph, index: number) => {
    return areaGlyphs.points.map((glyph, i) => {
      return <Circle
        key={`${index} - ${i}`}
        x={glyph.x}
        y={glyph.y1}
        radius={5}
        fill="red"
        listening={false}
      />;
    });
  }
  private renderAreaSeriesHighlightMarkers = () => {
    const { areaSeriesGlyphs } = this.props;
    return Array.from(areaSeriesGlyphs.values()).map((glyphs) => {
      return (
        <Group key={'areas-interactions'}>
          {
            glyphs.map((glyph, index) => this.renderAreaSeriesPoints(glyph, index))
          }
        </Group>
      );
    });
  }
  // BAR SERIES
  private renderBarSeriesSensitiveAreas = () => {
    const { barSeriesStates } = this.props;
    return (
      <Group key={'bar-interactions'}>
      {
        Array.from(barSeriesStates.values())
          .map((seriesState, index) => this.renderBarSeriesSensitiveArea(seriesState.interactionAreas, index))
      }
      </Group>
    );
  }
  private renderBarSeriesSensitiveArea(barSeriesState: BarGeom[], index: number) {
    return barSeriesState.map((geom, i) => {
      const { x, y1, width, height, color } = geom;
      return <Rect
        key={`${index} - ${i}`}
        x={x}
        y={y1}
        width={width}
        height={height}
        fill={color}
        opacity={0.2}
        strokeWidth={0}
        listening={false}
        perfectDrawEnabled={false}
      />;
    });
  }
}

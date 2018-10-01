import { Group as KonvaGroup } from 'konva';
import { find } from 'lodash';
import React from 'react';
import { Group, Rect } from 'react-konva';

import { getDataFromBarGlyphs } from '../../commons/series/bars/commons';
import { BarGlyph, BarGlyphGroup } from '../../commons/series/bars/rendering';
import { Datum } from '../../commons/series/specs';

interface BarSeriesDataProps {
  animated?: boolean;
  tooltipLevel: number;
  glyphs: BarGlyphGroup[];
}
interface BarSeriesDataState {
  overedElements: Datum[];
  groupKey: string | undefined;
}
export class BarSeries extends React.Component<BarSeriesDataProps, BarSeriesDataState> {
  public static defaultProps: Partial<BarSeriesDataProps> = {
    animated: false,
  };
  private readonly barSeriesRef: React.RefObject<KonvaGroup> = React.createRef();
  constructor(props: BarSeriesDataProps) {
    super(props);
    this.state = {
      overedElements: [],
      groupKey: undefined,
    };
    this.barSeriesRef = React.createRef();
  }
  public render() {
    const { animated, glyphs } = this.props;
    if (animated) {
      return this.renderAnimatedBars(glyphs);
    } else {
      return (
        <Group
          ref={this.barSeriesRef}
        >
          {
            this.renderGlyphs(glyphs)
          }
        </Group>
      );
    }
  }
  private onMouseOver = (data: any, groupKey: string) => () => {
    const elementsData = getDataFromBarGlyphs(data);
    // console.log(`mouse over ${JSON.stringify(getDataFromBarGlyphs(data), null, 2)}`);
    this.setState(() => ({
      overedElements: elementsData,
      groupKey,
    }));
    // console.log(this.barSeriesRef);
    if (this.barSeriesRef.current) {
      this.barSeriesRef.current.getStage().batchDraw();
    }
  }
  private onMouseOut = () => {
    // console.log('mouse out');
    this.setState(() => ({
      overedElements: [],
      groupKey: undefined,
    }));
  }
  private isHovered = (datum: Datum) => {
    // console.log(datum);
    // console.log(find(this.state.overedElements, datum), datum, this.state.overedElements);
    return find(this.state.overedElements, datum);
  }
  private renderGlyphs = (glyphs: BarGlyphGroup[] | BarGlyph[]): JSX.Element[] => {
    const { tooltipLevel } = this.props;
    if (Array.isArray(glyphs) && glyphs.length > 0 && !(glyphs[0] as BarGlyphGroup).accessor) {
      // leaf
      return [<Group key={'group-0'}>{this.renderBars(glyphs as BarGlyph[])}</Group>];
    }
    return (glyphs as BarGlyphGroup[]).map((glyph, i) => {
      let onMouseOverFn;
      const groupKey = `group-${glyph.level}-${glyph.accessor}-${glyph.levelValue}`;
      if (tooltipLevel === glyph.level) {
        // const data: any[] = glyph.elements.map(({ data }) => data);
        onMouseOverFn = this.onMouseOver(glyph.elements, groupKey);
      }
      return (
        <Group
          key={groupKey}
          x={glyph.translateX}
          y={glyph.translateY}
        >
        {
          tooltipLevel === glyph.level &&
          <Rect
            x={0}
            y={0}
            width={glyph.groupWidth}
            height={glyph.groupHeight}
            fill={'lightgray'}
            dash={[2, 2]}
            strokeWidth={1}
            stroke={'black'}
            opacity={this.state.groupKey === groupKey ? 1 : 0}
            onMouseOver={onMouseOverFn}
            onMouseOut={tooltipLevel === glyph.level ? this.onMouseOut : undefined}
          />
        }

          {this.renderGlyphs(glyph.elements)}
        </Group>
      );
    });
  }
  private renderBars = (glyphs: BarGlyph[]) => {
    const { tooltipLevel } = this.props;
    return glyphs.map((element, index) => {
      const { x, y, width, height, fill, data } = element;
      const isTooltipAtSingleBarLevel = tooltipLevel === -1;
      return (
        <Rect
          key={`rect-${index}`}
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          strokeWidth={0}
          listening={isTooltipAtSingleBarLevel}
          opacity={this.isHovered(data) || this.state.overedElements.length === 0 ? 1 : 0.3}
          perfectDrawEnabled={false}
          onMouseOver={isTooltipAtSingleBarLevel ? this.onMouseOver([element], `rect-${index}`) : undefined}
          onMouseOut={isTooltipAtSingleBarLevel ? this.onMouseOut : undefined}
        />
      );
    });
  }
  private renderAnimatedBars = (glyphs: BarGlyphGroup[]) => {
    return null;
  }
}

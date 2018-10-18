import { Group as KonvaGroup, Node, Shape } from 'konva';
import React from 'react';
import { Group, Rect } from 'react-konva';

import { SpecId } from '../../commons/ids';
import { getDataFromBarGlyphs, isBarGlyphGroupLeaf } from '../../commons/series/bars/commons';
import { BarGlyphGroup } from '../../commons/series/bars/rendering';
import { Datum } from '../../commons/series/specs';
import { Theme } from '../../commons/themes/theme';
import { LeftTooltip, RightTooltip } from '../../state/chart_state';
interface KonvaEventObject<E> {
  target: Shape;
  evt: E;
  currentTarget: Node;
  cancelBubble: boolean;
}
interface BarSeriesDataProps {
  specId: SpecId;
  animated?: boolean;
  tooltipLevel: number;
  glyphs: BarGlyphGroup[];
  chartTheme: Theme;
  onElementOver?: (specId: SpecId, datum: Datum[], position: LeftTooltip | RightTooltip) => void;
  onElementOut?: () => void;
}
interface BarSeriesDataState {
  uuid: string | undefined;
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
      uuid: undefined,
      groupKey: undefined,
    };
    this.barSeriesRef = React.createRef();
  }
  public render() {
    const { animated, glyphs } = this.props;
    if (animated) {
      return this.renderAnimatedBars();
    } else {
      return <Group ref={this.barSeriesRef} key={'aaa'}>{this.renderGlyphs(glyphs, '')}</Group>;
    }
  }

  private onMouseOver = (uuid: string, data: Datum[]) => (event: KonvaEventObject<MouseEvent>) => {
    document.body.style.cursor = 'pointer';
    const stageWidth = event.target.getStage().getWidth();
    const targetPosition = event.target.getClientRect();
    if (
      targetPosition === undefined ||
      targetPosition.x === undefined ||
      targetPosition.width === undefined ||
      targetPosition.y === undefined
    ) {
      return;
    }
    if (targetPosition.x && targetPosition.x < stageWidth / 2) {
      const position: LeftTooltip = {
        top: targetPosition.y,
        left: targetPosition.x + targetPosition.width,
      };
      if (this.props.onElementOver) {
        this.props.onElementOver(this.props.specId, data, position);
      }
    } else {
      const position: RightTooltip = {
        top: targetPosition.y,
        right: stageWidth - targetPosition.x,
      };
      if (this.props.onElementOver) {
        this.props.onElementOver(this.props.specId, data, position);
      }
    }
    // console.log(`mouse over ${JSON.stringify(getDataFromBarGlyphs(data), null, 2)}`);
    this.setState(() => ({
      uuid,
    }));
  }
  private onMouseOut = () => {
    // console.log('mouse out');
    document.body.style.cursor = 'default';
    if (this.props.onElementOut) {
      this.props.onElementOut();
    }
    this.setState(() => ({
      uuid: undefined,
    }));
  }
  private renderGlyphs = (glyphs: BarGlyphGroup[], uuidPath: string): JSX.Element[] => {
    const { tooltipLevel } = this.props;
    if (isBarGlyphGroupLeaf(glyphs)) {
      return [<Group key={'group-0'}>{this.renderBars(glyphs, uuidPath)}</Group>];
    }
    return glyphs.map((glyph, i) => {
      let onMouseOverFn;
      const groupKey = [uuidPath, glyph.level, glyph.accessor, glyph.levelValue].join('-');
      if (tooltipLevel === glyph.level && glyph.elements) {
        const data = getDataFromBarGlyphs(glyph.elements);
        onMouseOverFn = this.onMouseOver(groupKey, data);
      }
      return (
        <Group key={groupKey} x={glyph.x} y={glyph.y}>
          {tooltipLevel === glyph.level && (
            <Rect
              x={0}
              y={0}
              width={glyph.width}
              height={glyph.height}
              fill={'lightgray'}
              // opacity={this.state.uuid === groupKey ? 0.4 : 0}

              onMouseOver={onMouseOverFn}
              onMouseOut={tooltipLevel === glyph.level ? this.onMouseOut : undefined}
            />
          )}

          {glyph.elements && this.renderGlyphs(glyph.elements, groupKey)}
        </Group>
      );
    });
  }
  private renderBars = (glyphs: BarGlyphGroup[], uuidPath: string) => {
    const { tooltipLevel } = this.props;
    return glyphs.map((glyph, i) => {
      const { x, y, width, height, fill, level, data } = glyph;
      const hasTooltip = tooltipLevel === level;
      const groupKey = [uuidPath, glyph.level, glyph.accessor, glyph.levelValue, i].join('-');
      return (
        <Rect
          key={groupKey}
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          strokeWidth={0}
          opacity={0.5}
          listening={hasTooltip}
          // opacity={this.state.uuid === undefined || groupKey.indexOf(this.state.uuid) === 0 ? 1 : hideOpacity}
          perfectDrawEnabled={false}
          onMouseOver={hasTooltip ? this.onMouseOver(groupKey, [data]) : undefined}
          onMouseOut={hasTooltip ? this.onMouseOut : undefined}
        />
      );
    });
  }
  private renderAnimatedBars = () => {
    return null;
  }
}

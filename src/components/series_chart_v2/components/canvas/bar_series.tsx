import { Group as KonvaGroup, Node, Shape } from 'konva';
import React from 'react';
import { Group, Rect } from 'react-konva';
import { animated, Spring } from 'react-spring/dist/konva';

import { getDataFromBarGlyphs, isBarGlyphGroupLeaf } from '../../commons/series/bars/commons';
import { BarGlyphGroup } from '../../commons/series/bars/rendering';
import { Datum, Rotation } from '../../commons/series/specs';
import { Theme } from '../../commons/themes/theme';
import { SpecId } from '../../commons/utils/ids';
import { TooltipPosition } from '../../state/chart_state';
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
  barMaxHeight: number;
  rotation: Rotation;
  debug: boolean;
  onElementOver?: (specId: SpecId, datum: Datum[], position: TooltipPosition) => void;
  onElementOut?: () => void;
}
interface BarSeriesDataState {
  uuid: string | undefined;
  groupKey: string | undefined;
}
export class BarSeries extends React.Component<BarSeriesDataProps, BarSeriesDataState> {
  public static defaultProps: Partial<BarSeriesDataProps> = {
    animated: false,
    debug: false,
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
    const { glyphs } = this.props;
    return <Group ref={this.barSeriesRef} key={'aaa'}>{this.renderGlyphs(glyphs, '')}</Group>;
  }
  private isLeftTooltip(x: number, stageWidth: number) {
    return x < stageWidth / 2;
  }
  private isTopTooltip(y: number, height: number, stageHeight: number) {
    return y + height < stageHeight / 2;
  }
  private onMouseOver = (uuid: string, data: Datum[], rotation: Rotation) => (event: KonvaEventObject<MouseEvent>) => {
    if (!this.props.onElementOver) {
      return;
    }
    document.body.style.cursor = 'pointer';
    const stageWidth = event.target.getStage().getWidth();
    const stageHeight = event.target.getStage().getHeight();
    const layer = event.target.getLayer();

    const targetPosition = event.target.getClientRect();
    if (!targetPosition) {
      return;
    }
    const { x, y, width, height } = targetPosition;
    if (x === undefined || width === undefined || y === undefined || height === undefined) {
      return;
    }
    const tooltipPosition: TooltipPosition = {};
    // compute common rotation positions
    switch (rotation) {
      case 0:
      case 180:
        if (this.isLeftTooltip(x, stageWidth)) {
          tooltipPosition.left = x + width;
        } else {
          tooltipPosition.right = stageWidth - x;
        }
        break;
      case -90:
      case 90:
        if (this.isTopTooltip(y, height, layer.getHeight())) {
          tooltipPosition.top = y + height;
        } else {
          tooltipPosition.bottom = stageHeight - y;
        }
        break;
    }
    // compute specific rotation values
    switch (rotation) {
      case 0:
        tooltipPosition.top = y;
        break;
      case 180:
        tooltipPosition.bottom = (stageHeight - y) - height;
        break;
      case -90:
        tooltipPosition.left = layer.getPosition().x;
        break;
      case 90:
        tooltipPosition.right = stageWidth - layer.getPosition().x;
        break;
    }
    this.props.onElementOver(this.props.specId, data, tooltipPosition);

    this.setState(() => ({
      uuid,
    }));
  }
  private onMouseOut = () => {
    document.body.style.cursor = 'default';
    if (this.props.onElementOut) {
      this.props.onElementOut();
    }
    this.setState(() => ({
      uuid: undefined,
    }));
  }
  private renderGlyphs = (glyphs: BarGlyphGroup[], uuidPath: string): JSX.Element[] => {
    const { tooltipLevel, debug, rotation } = this.props;
    if (isBarGlyphGroupLeaf(glyphs)) {
      return [<Group key={'group-0'}>{this.renderBars(glyphs, uuidPath)}</Group>];
    }
    return glyphs.map((glyph, i) => {
      let onMouseOverFn;
      const groupKey = [uuidPath, glyph.level, glyph.accessor, glyph.levelValue].join('-');
      if (tooltipLevel === glyph.level && glyph.elements) {
        const data = getDataFromBarGlyphs(glyph.elements);
        onMouseOverFn = this.onMouseOver(groupKey, data, rotation);
      }
      const interactionAreaOpacity = (debug || this.state.uuid === groupKey) ? 0.4 : 0;
      return (
        <Group key={groupKey} x={glyph.x} y={glyph.y}>
          {tooltipLevel === glyph.level && (
            <Rect
              x={0}
              y={0}
              width={glyph.width}
              height={glyph.height}
              fill={debug ? 'lightcoral' : 'lightgray'}
              opacity={interactionAreaOpacity}
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
    const { tooltipLevel, rotation, debug, barMaxHeight } = this.props;
    return glyphs.map((glyph, i) => {
      const { x, y, width, height, fill, level, data } = glyph;
      const hasTooltip = tooltipLevel === level;
      const groupKey = [uuidPath, glyph.level, glyph.accessor, glyph.levelValue, i].join('-');
      if (this.props.animated) {
        const isHover = this.state.uuid !== undefined && groupKey.indexOf(this.state.uuid) === 0;
        const opacity = (this.state.uuid === undefined || isHover) ? 1 : 0.5;
        const interactionAreaOpacity = ( debug || isHover ) ? 0.4 : 0;
        return (
          <Group key={groupKey}>
            {
              hasTooltip && <Rect
                key="interactionRect"
                x={x}
                y={0}
                width={glyph.width}
                height={barMaxHeight}
                fill={debug ? 'lightcoral' : 'lightgray'}
                opacity={interactionAreaOpacity}
                perfectDrawEnabled={false}
                onMouseOver={hasTooltip ? this.onMouseOver(groupKey, [data], rotation) : undefined}
                onMouseOut={hasTooltip ? this.onMouseOut : undefined}
              />
            }
            <Spring
              key={`spring-bars-${i}`}
              native
              from={{ opacity: 1, y: y + height, height: 0 }}
              to={{ opacity, y, height }}
              >
                {(props: {opacity: number, y: number, height: number}) => (
                    <animated.Rect
                      key="animatedRect"
                      x={x}
                      y={props.y}
                      width={width}
                      height={props.height}
                      fill={fill}
                      strokeWidth={0}
                      listening={false}
                      opacity={props.opacity}
                      perfectDrawEnabled={false}
                    />
                )}
            </Spring>
          </Group>
        );
      } else {
        return <Rect
          key={groupKey}
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          strokeWidth={0}
          listening={hasTooltip}
          opacity={this.state.uuid === undefined || groupKey.indexOf(this.state.uuid) === 0 ? 1 : 0.5}
          perfectDrawEnabled={false}
          onMouseOver={hasTooltip ? this.onMouseOver(groupKey, [data], rotation) : undefined}
          onMouseOut={hasTooltip ? this.onMouseOut : undefined}
        />;
      }
    });
  }
}

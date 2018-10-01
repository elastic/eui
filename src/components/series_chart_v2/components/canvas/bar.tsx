import { Rect as KonvaRect } from 'konva';
import React from 'react';
import { Rect } from 'react-konva';
import { BarGlyph } from '../../commons/series/bars/rendering';
import { Datum } from '../../commons/series/specs';

interface BarSeriesDataProps {
  glyph: BarGlyph;
  opaque: false;
  onMouseOver?: (data: Datum[]) => {};
  onMouseOut?: () => {};
}

interface BarSeriesDataState {
  opaque: boolean;
}

export class Bar extends React.Component<BarSeriesDataProps, BarSeriesDataState> {
  private readonly rectRef: React.RefObject<KonvaRect> = React.createRef();
  constructor(props: BarSeriesDataProps) {
    super(props);
    this.state = {
      opaque: false,
    };
  }
  public componentWillUpdate() {
    this.rectRef.current!.to({
      scaleX: Math.random() + 0.8,
      scaleY: Math.random() + 0.8,
      duration: 0.2,
    });
  }
  public render() {
    const { glyph: { x, y, width, height, fill }, opaque } = this.props;

    return (
      <Rect
        ref={this.rectRef}
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        strokeWidth={0}
        listening={false}
        opacity={opaque ? 0.3 : 1}
        perfectDrawEnabled={false}
      />
    );
  }
}

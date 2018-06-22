import React from 'react';
import PropTypes from 'prop-types';
import { ScaleUtils, AbstractSeries } from 'react-vis';
import { EuiXYChartUtils } from './utils/chart_utils';
const { HORIZONTAL, VERTICAL, BOTH } = EuiXYChartUtils.ORIENTATION

const DEFAULT_AREAS = {
  drawArea: {
    x0: 0,
    x1: 0,
    y0: 0,
    y1: 0,
  },
  rectArea: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }
};

export class EuiSelectionBrush extends AbstractSeries {
  state = {
    drawing: false,
    ...DEFAULT_AREAS,
  };

  _getDrawArea(offsetX, offsetY, isStartingPoint) {
    const { orientation, marginTop, marginLeft, innerHeight, innerWidth } = this.props;
    const yLocation = offsetY - marginTop;
    const xLocation = offsetX - marginLeft;
    let x0;
    let y0;
    if (isStartingPoint) {
      x0 = orientation === VERTICAL ? 0 : xLocation;
      y0 = orientation === HORIZONTAL ? 0 : yLocation;
    } else {
      x0 = this.state.drawArea.x0;
      y0 = this.state.drawArea.y0;
    }
    const x1 = orientation === VERTICAL ? innerWidth : xLocation;
    const y1 = orientation === HORIZONTAL ? innerHeight : yLocation;
    return {
      drawArea: {
        x0,
        x1,
        y0,
        y1,
      },
      rectArea: {
        x: x0 < x1 ? x0 : x1,
        y: y0 < y1 ? y0 : y1,
        width: x0 < x1 ? (x1 - x0) : (x0 - x1),
        height: y0 < y1 ? (y1 - y0) : (y0 - y1),
      }
    };
  }

  onParentMouseDown(e) {
    const { onSelectStart } = this.props;
    const { offsetX, offsetY } = e.nativeEvent;
    const drawAndRectAreas = this._getDrawArea(offsetX, offsetY, true);
    this.setState(() => ({
      drawing: true,
      ...drawAndRectAreas,
    }));

    if (onSelectStart) {
      onSelectStart(e);
    }
  }

  onParentMouseMove(e) {
    const { onSelect } = this.props;
    const { drawing } = this.state;
    const { offsetX, offsetY } = e.nativeEvent;

    if (drawing) {
      const drawAndRectAreas = this._getDrawArea(offsetX, offsetY);
      this.setState(() => ({ ...drawAndRectAreas }));

      if (onSelect) {
        onSelect(e);
      }
    }
  }

  stopDrawing = () => {
    // Quickly short-circuit if the user isn't drawing in our component
    if (!this.state.drawing) {
      return;
    }

    const { onBrushEnd } = this.props;
    const { x0, y0, x1, y1 } = this.state.drawArea;
    const xScale = ScaleUtils.getAttributeScale(this.props, 'x');
    const yScale = ScaleUtils.getAttributeScale(this.props, 'y');

    // Clear the draw area
    this.setState(() => ({
      drawing: false,
      ...DEFAULT_AREAS,
    }));
    // Don't invoke the callback if the selected area was < 5px.
    // This is a click not a select
    if (Math.abs(x0 - x1) < 5 || Math.abs(y0 - y1) < 5) {
      return;
    }

    // Compute the corresponding domain drawn
    const domainArea = {
      startX: xScale.invert(x0 < x1 ? x0 : x1),
      endX: xScale.invert(x0 < x1 ? x1 : x0),
      startY: yScale.invert(y0 < y1 ? y1 : y0),
      endY: yScale.invert(y0 < y1 ? y0 : y1),
    };

    if (onBrushEnd) {
      onBrushEnd(domainArea);
    }
  }

  render() {
    const { marginLeft, marginTop, innerWidth, innerHeight, color, opacity } = this.props;
    const { rectArea: { x, y, width, height } } = this.state;

    return (
      <g
        transform={`translate(${marginLeft}, ${marginTop})`}
        className="selection-brush-container"
        onMouseUp={this.stopDrawing}
        onMouseLeave={this.stopDrawing}
      >
        <rect
          className="mouse-target"
          fill="black"
          opacity="0"
          x={0}
          y={0}
          width={innerWidth}
          height={innerHeight}
        />
        <rect
          className="selection-brush"
          pointerEvents="none"
          opacity={opacity}
          fill={color}
          x={x}
          y={y}
          width={width}
          height={height}
        />
      </g>
    );
  }
}

EuiSelectionBrush.displayName = 'EuiSelectionBrush';

EuiSelectionBrush.propTypes = {
  /** Specify the brush orientation */
  orientation: PropTypes.oneOf([ HORIZONTAL, VERTICAL, BOTH ]),
  /** Callback on brush end event with { begin, end } object returned. */
  onBrushEnd: PropTypes.func.isRequired,
  color: PropTypes.string,
  opacity: PropTypes.number,
};

EuiSelectionBrush.defaultProps = {
  orientation: HORIZONTAL,
  color: 'rgb(0,0, 0)',
  opacity: 0.2,
}

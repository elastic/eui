import React from 'react';
import PropTypes from 'prop-types';
import { ScaleUtils, AbstractSeries } from 'react-vis';
import { ORIENTATION, SCALE } from './utils/chart_utils';
const { HORIZONTAL, VERTICAL, BOTH } = ORIENTATION;

const DEFAULT_AREAS = {
  areaSize: 0,
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
  },
};

export class EuiSelectionBrush extends AbstractSeries {
  state = {
    drawing: false,
    ...DEFAULT_AREAS,
  };

  onParentMouseDown(e) {
    this._startDrawing(e);
  }

  onParentMouseMove(e) {
    this._brushing(e);
  }

  onParentMouseUp() {
    this._stopDrawing();
  }

  onParentMouseLeave() {
    this._stopDrawing();
  }

  _getDrawArea(offsetX, offsetY, isStartingPoint) {
    const {
      orientation,
      marginTop,
      marginLeft,
      innerHeight,
      innerWidth,
    } = this.props;
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
    const areaSize = Math.abs(x0 - x1) * Math.abs(y0 - y1);
    return {
      areaSize,
      drawArea: {
        x0,
        x1,
        y0,
        y1,
      },
      rectArea: {
        x: x0 < x1 ? x0 : x1,
        y: y0 < y1 ? y0 : y1,
        width: x0 < x1 ? x1 - x0 : x0 - x1,
        height: y0 < y1 ? y1 - y0 : y0 - y1,
      },
    };
  }

  _getScaledValue(scale, scaleType, value0, value1) {
    switch (scaleType) {
      case SCALE.ORDINAL:
        return [0, 0];
      default:
        return [
          scale.invert(value0 < value1 ? value0 : value1),
          scale.invert(value0 < value1 ? value1 : value0),
        ];
        break;
    }
  }

  _startDrawing = e => {
    const { onBrushStart } = this.props;
    const { offsetX, offsetY } = e.nativeEvent;
    const drawAndRectAreas = this._getDrawArea(offsetX, offsetY, true);
    this.setState(() => ({
      drawing: true,
      ...drawAndRectAreas,
    }));

    if (onBrushStart) {
      onBrushStart(drawAndRectAreas);
    }
  };

  _brushing = e => {
    const { onBrushing } = this.props;
    const { drawing } = this.state;
    const { offsetX, offsetY } = e.nativeEvent;
    if (drawing) {
      const drawAndRectAreas = this._getDrawArea(offsetX, offsetY);
      this.setState(() => ({
        ...drawAndRectAreas,
      }));

      if (onBrushing) {
        onBrushing(drawAndRectAreas);
      }
    } else {
      this.setState(() => ({
        drawing: false,
        ...DEFAULT_AREAS,
      }));
    }
  };

  _stopDrawing = () => {
    // Quickly short-circuit if the user isn't drawing in our component
    const { drawing } = this.state;
    if (!drawing) {
      return;
    }

    // Clear the draw area
    this.setState(() => ({
      drawing: false,
      ...DEFAULT_AREAS,
    }));

    // Don't invoke the callback if the selected area was < 25 square px.
    // This is a click not a select
    const { areaSize } = this.state;
    if (areaSize < 25) {
      return;
    }
    const { drawArea } = this.state;
    const { x0, y0, x1, y1 } = drawArea;
    const { xType, yType, onBrushEnd } = this.props;
    const xScale = ScaleUtils.getAttributeScale(this.props, 'x');
    const yScale = ScaleUtils.getAttributeScale(this.props, 'y');

    const xValues = this._getScaledValue(xScale, xType, x0, x1);
    const yValues = this._getScaledValue(yScale, yType, y0, y1);

    // Compute the corresponding domain drawn
    const domainArea = {
      startX: xValues[0],
      endX: xValues[1],
      startY: yValues[1],
      endY: yValues[0],
    };

    if (onBrushEnd) {
      onBrushEnd({
        domainArea,
        drawArea,
      });
    }
  };

  render() {
    const { marginLeft, marginTop, color, opacity } = this.props;
    const {
      rectArea: { x, y, width, height },
    } = this.state;
    return (
      <g
        transform={`translate(${marginLeft}, ${marginTop})`}
        style={{
          pointerEvents: 'none',
        }}>
        <rect
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
  orientation: PropTypes.oneOf([HORIZONTAL, VERTICAL, BOTH]),
  /** Callback on brush start event. */
  onBrushStart: PropTypes.func,
  /** Callback on every mouse move event. */
  onBrushing: PropTypes.func,
  /** Callback on brush end event. */
  onBrushEnd: PropTypes.func.isRequired,
  /** The color of the brush rectangle */
  color: PropTypes.string,
  /** The opacity of the brush rectangle*/
  opacity: PropTypes.number,
};

EuiSelectionBrush.defaultProps = {
  orientation: HORIZONTAL,
  color: 'black',
  opacity: 0.2,
};

import React, { PureComponent } from 'react';
import { XYPlot, makeVisFlexible, AbstractSeries } from 'react-vis';

import PropTypes from 'prop-types';
import { EuiSelectionBrush } from './brush';
import { EuiDefaultAxis } from './axis/default_axis';
import { EuiCrosshairX } from './crosshairs/crosshair_x';
import { EuiCrosshairY } from './crosshairs/crosshair_y';
import { VISUALIZATION_COLORS } from '../../services';
import StatusText from './status-text';
import { getSeriesChildren } from './utils/series_utils';
import { EuiXYChartUtils } from './utils/chart_utils';
const { HORIZONTAL, VERTICAL, BOTH } = EuiXYChartUtils.ORIENTATION;
const { LINEAR, ORDINAL, CATEGORY, TIME, TIME_UTC, LOG, LITERAL } = EuiXYChartUtils.SCALE_TYPE;

class XYExtendedPlot extends XYPlot {
  /**
   * Trigger onMouseLeave handler if it was passed in props.
   * @param {Event} event Native event.
   * @private
   */
  _mouseLeaveHandler(event) {
    const { onMouseLeave, children } = this.props;
    if (onMouseLeave) {
      super.onMouseLeave(event);
    }
    const seriesChildren = getSeriesChildren(children);
    seriesChildren.forEach((child, index) => {
      const component = this.refs[`series${index}`];
      if (component && component.onParentMouseLeave) {
        component.onParentMouseLeave(event);
      }
    });
  }

  /**
   * Trigger onMouseUp handler if it was passed in props.
   * @param {Event} event Native event.
   * @private
   */
  _mouseUpHandler = (event) => {
    const { onMouseUp, children } = this.props;
    if (onMouseUp) {
      super.onMouseUp(event);
    }
    const seriesChildren = getSeriesChildren(children);
    seriesChildren.forEach((child, index) => {
      const component = this.refs[`series${index}`];
      if (component && component.onParentMouseUp) {
        component.onParentMouseUp(event);
      }
    });
  }

  render() {
    const {
      className,
      dontCheckIfEmpty,
      style,
      width,
      height,
      errorText,
    } = this.props;

    if (!dontCheckIfEmpty && this._isPlotEmpty()) {
      return (
        <StatusText text={errorText} width={width} height={height} />
      );
    }
    const components = this._getClonedChildComponents();

    return (
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
        className={`rv-xy-plot ${className}`}
      >
        <svg
          className="rv-xy-plot__inner"
          width={width}
          height={height}
          style={style}
          onClick={this._clickHandler}
          onDoubleClick={this._doubleClickHandler}
          onMouseDown={this._mouseDownHandler}
          onMouseMove={this._mouseMoveHandler}
          onMouseLeave={this._mouseLeaveHandler}
          onMouseEnter={this._mouseEnterHandler}
          onMouseUp={this._mouseUpHandler}
          onTouchStart={this._mouseDownHandler}
          onTouchMove={this._touchMoveHandler}
          onTouchEnd={this._touchEndHandler}
          onTouchCancel={this._touchCancelHandler}
          onWheel={this._wheelHandler}
        >
          {components.filter(c => c && c.type.requiresSVG)}
        </svg>
        {this.renderCanvasComponents(components, this.props)}
        {components.filter(c => c && !c.type.requiresSVG && !c.type.isCanvas)}
      </div>
    );
  }
}

class XYChart extends PureComponent {
  state = {
    mouseOver: false,
  };
  colorIterator = 0;
  _xyPlotRef = React.createRef();

  _renderChildren = (child, i) => {
    const { prototype } = child.type;
    // Avoid applying chart props to non series children
    if (!(prototype instanceof AbstractSeries)) {
      return child;
    }

    const props = {
      id: `chart-${i}`,
    };

    if (!child.props.color) {
      props.color = VISUALIZATION_COLORS[this.colorIterator];

      this.colorIterator++;
      if (this.colorIterator > VISUALIZATION_COLORS.length - 1) this.colorIterator = 0;
    }

    return React.cloneElement(child, props);
  };

  render() {
    const {
      width,
      height,
      xType,
      yType,
      stackBy,
      errorText,
      children,
      xDomain,
      yDomain,
      yPadding,
      xPadding,
      animateData,
      showDefaultAxis,
      showCrosshair,
      enableSelectionBrush,
      selectionBrushOrientation,
      onSelectionBrushEnd,
      orientation,
      crosshairValue,
      onCrosshairUpdate,
      ...rest
    } = this.props;

    this.colorIterator = 0;
    const Crosshair =
      orientation === EuiXYChartUtils.ORIENTATION.HORIZONTAL ? EuiCrosshairY : EuiCrosshairX;
    return (
      <div {...rest}>
        <XYExtendedPlot
          ref={this._xyPlotRef}
          errorText={errorText}
          width={width}
          animation={animateData}
          height={height}
          margin={2}
          xType={xType}
          yType={yType}
          xDomain={xDomain}
          yDomain={yDomain}
          stackBy={stackBy}
          yPadding={yPadding}
          xPadding={xPadding}
        >
          {React.Children.map(children, this._renderChildren)}
          {showDefaultAxis && <EuiDefaultAxis orientation={orientation} />}
          {showCrosshair && (
            <Crosshair crosshairValue={crosshairValue} onCrosshairUpdate={onCrosshairUpdate} />
          )}

          {enableSelectionBrush && (
            <EuiSelectionBrush
              onBrushEnd={onSelectionBrushEnd}
              orientation={selectionBrushOrientation}
            />
          )}
        </XYExtendedPlot>
      </div>
    );
  }
}
XYChart.displayName = 'EuiXYChart';

XYChart.propTypes = {
  /** The initial width of the chart. */
  width: PropTypes.number.isRequired,
  /** The initial height of the chart. */
  height: PropTypes.number.isRequired,
  /** The orientation of the chart. */
  orientation: PropTypes.oneOf([HORIZONTAL, VERTICAL]),
  /** If the chart animates on data changes. */
  animateData: PropTypes.bool,
  /** TODO */
  stackBy: PropTypes.string,
  /** The main x axis scale type. See https://github.com/uber/react-vis/blob/master/docs/scales-and-data.md */
  xType: PropTypes.oneOf([LINEAR, ORDINAL, CATEGORY, TIME, TIME_UTC, LOG, LITERAL]),
  /** The main y axis scale type. See https://github.com/uber/react-vis/blob/master/docs/scales-and-data.md*/
  xType: PropTypes.oneOf([LINEAR, ORDINAL, CATEGORY, TIME, TIME_UTC, LOG, LITERAL]),
  /** Manually specify the domain of x axis. */
  xDomain: PropTypes.array,
  /** Manually specify the domain of y axis. */
  yDomain: PropTypes.array,
  /** The horizontal padding between the chart borders and chart elements. */
  xPadding: PropTypes.number,
  /** The vertical padding between the chart borders and chart elements. */
  yPadding: PropTypes.number,
  /** Add a text to show an error on the chart */
  errorText: PropTypes.string,
  /** Shows the crosshair tooltip on mouse move.*/
  showCrosshair: PropTypes.bool,
  /**  Specify an X or Y axis value to display a crosshair. */
  crosshairValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Callback when the crosshair position is updated. */
  onCrosshairUpdate: PropTypes.func,
  /** Show the default X and Y axis. */
  showDefaultAxis: PropTypes.bool,
  /** Enable the brush tool */
  enableSelectionBrush: PropTypes.bool,
  /** Specify the brush orientation */
  selectionBrushOrientation: PropTypes.oneOf([HORIZONTAL, VERTICAL, BOTH]),
  /** Callback on brush end event with { begin, end } object returned. */
  onSelectionBrushEnd: PropTypes.func,
};

XYChart.defaultProps = {
  animateData: true,
  xType: 'linear',
  yType: 'linear',
  yPadding: 0,
  xPadding: 0,
  orientation: VERTICAL,
  showCrosshair: true,
  showDefaultAxis: true,
  enableSelectionBrush: false,
  selectionBrushOrientation: HORIZONTAL,
  onSelectionBrushEnd: () => ({}),
};

export const EuiXYChart = makeVisFlexible(XYChart);

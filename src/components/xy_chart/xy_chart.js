import React, { PureComponent, Fragment } from 'react';
import { XYPlot, AbstractSeries, makeVisFlexible  } from 'react-vis';

import PropTypes from 'prop-types';
import { EuiEmptyPrompt } from '../empty_prompt';
import { EuiSelectionBrush } from './selection_brush';
import { EuiDefaultAxis } from './axis/default_axis';
import { EuiCrosshairX } from './crosshairs/crosshair_x';
import { EuiCrosshairY } from './crosshairs/crosshair_y';
import { VISUALIZATION_COLORS } from '../../services';
import { getSeriesChildren } from './utils/series_utils';
import { ORIENTATION, SCALE } from './utils/chart_utils';
const { HORIZONTAL, VERTICAL, BOTH } = ORIENTATION;
const { LINEAR, ORDINAL, CATEGORY, TIME, TIME_UTC, LOG, LITERAL } = SCALE;

const DEFAULT_MARGINS = {
  left: 40,
  right: 10,
  top: 10,
  bottom: 40
};

/**
 * The extended version of the react-vis XYPlot with the mouseLeave and mouseUp handlers.
 * TODO: send a PR to react-vis for incorporate these two changes directly into XYPlot class.
 */
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
    } = this.props;

    if (!dontCheckIfEmpty && this._isPlotEmpty()) {
      return (
        <div
          className={`rv-xy-plot ${className}`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            ...this.props.style
          }}
        />
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


/**
 * The root component of any XY chart.
 * It renders an react-vis XYPlot including default axis and a valid crosshair.
 * You can also enable the Selection Brush.
 */
class XYChart extends PureComponent {
  state = {
    mouseOver: false,
  };
  colorIterator = 0;
  _xyPlotRef = React.createRef();


  /**
   * Checks if the plot is empty, looking at existing series and data props.
   */
  _isEmptyPlot(children) {
    return React.Children
      .toArray(children)
      .filter(this._isAbstractSeries)
      .filter(child => {
        return child.props.data && child.props.data.length > 0
      })
      .length === 0
  }

  /**
   * Checks if a react child is an AbstractSeries
   */
  _isAbstractSeries(child) {
    const { prototype } = child.type;
    // Avoid applying chart props to non series children
    return prototype instanceof AbstractSeries
  }


  /**
   * Render children adding a valid EUI visualization color if the color prop is not specified.
   */
  _renderChildren (children) {
    let colorIterator = 0;

    return  React.Children.map(children, (child, i) => {
      // Avoid applying color props to non series children
      if (!this._isAbstractSeries(child)) {
        return child;
      }

      const props = {
        id: `chart-${i}`,
      };
      if (!child.props.color) {
        props.color = VISUALIZATION_COLORS[colorIterator % VISUALIZATION_COLORS.length];
        colorIterator++;
      }
      props._orientation = this.props.orientation;

      return React.cloneElement(child, props);
    });
  }

  render() {
    const {
      children,
      width,
      height,
      xType,
      yType,
      stackBy,
      statusText,
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

    if (this._isEmptyPlot(children)) {
      return (
        <EuiEmptyPrompt
          iconType="stats"
          title={<h2>Chart not available</h2>}
          body={
            <Fragment>
              <p>{ statusText }</p>
            </Fragment>
          }
        />
      )
    }

    const Crosshair = orientation === HORIZONTAL ? EuiCrosshairY : EuiCrosshairX;

    return (
      <div {...rest}>
        <XYExtendedPlot
          ref={this._xyPlotRef}
          dontCheckIfEmpty
          width={width}
          animation={animateData}
          height={height}
          margin={DEFAULT_MARGINS}
          xType={xType}
          yType={yType}
          xDomain={xDomain}
          yDomain={yDomain}
          stackBy={stackBy}
          yPadding={yPadding}
          xPadding={xPadding}
        >
          {this._renderChildren(children)}
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
  /** The orientation of the chart. Used by grids and crosshair. */
  orientation: PropTypes.oneOf([HORIZONTAL, VERTICAL]),
  /** If the chart animates on data changes. */
  animateData: PropTypes.bool,
  /** TODO */
  stackBy: PropTypes.string,
  /** The main x axis scale type. See https://github.com/uber/react-vis/blob/master/docs/scales-and-data.md */
  xType: PropTypes.oneOf([LINEAR, ORDINAL, CATEGORY, TIME, TIME_UTC, LOG, LITERAL]),
  /** The main y axis scale type. See https://github.com/uber/react-vis/blob/master/docs/scales-and-data.md*/
  yType: PropTypes.oneOf([LINEAR, ORDINAL, CATEGORY, TIME, TIME_UTC, LOG, LITERAL]),
  /** Manually specify the domain of x axis. */
  xDomain: PropTypes.array,
  /** Manually specify the domain of y axis. */
  yDomain: PropTypes.array,
  /** The horizontal padding between the chart borders and chart elements. */
  xPadding: PropTypes.number,
  /** The vertical padding between the chart borders and chart elements. */
  yPadding: PropTypes.number,
  /** Add an additional status text above the graph status message*/
  statusText: PropTypes.string,
  /** Shows the crosshair tooltip on mouse move.*/
  showCrosshair: PropTypes.bool,
  /** Specify the axis value where to display crosshair based on chart orientation value. */
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
};

export const EuiXYChart = makeVisFlexible(XYChart);

import React, { PureComponent } from 'react';
import { XYPlot, makeVisFlexible, AbstractSeries } from 'react-vis';

import PropTypes from 'prop-types';
import { EuiHighlight } from './highlight';
import { EuiDefaultAxis } from './axis/default_axis';
import { EuiCrosshairX } from './crosshairs/crosshair_x';
import { EuiCrosshairY } from './crosshairs/crosshair_y';
import { VISUALIZATION_COLORS } from '../../services';
import StatusText from './status-text';
import { getSeriesChildren } from './utils/series_utils';
import { EuiXYChartUtils } from './utils/chart_utils';
const { HORIZONTAL, VERTICAL } = EuiXYChartUtils.ORIENTATION

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
  // canShowCrosshair = () => {
  //   const { crosshairValue, showCrosshair } = this.props;
  //   const { mouseOver } = this.state;
  //   return showCrosshair && ( mouseOver || crosshairValue !== undefined)
  // }

  render() {
    const {
      width,
      height,
      xType,
      yType,
      stackBy,
      errorText,
      onSelectEnd,
      children,
      xDomain,
      yDomain,
      yPadding,
      xPadding,
      animation,
      showDefaultAxis,
      showCrosshair,
      orientation,
      crosshairValue,
      onCrosshairUpdate,
      ...rest
    } = this.props;

    if (!children || errorText) {
      return <StatusText text={errorText} width={width} height={height} />;
    }

    this.colorIterator = 0;
    const Crosshair =
      orientation === EuiXYChartUtils.ORIENTATION.HORIZONTAL ? EuiCrosshairY : EuiCrosshairX;
    return (
      <div {...rest}>
        <XYExtendedPlot
          ref={this._xyPlotRef}
          dontCheckIfEmpty
          onMouseMove={this._onMouseMove}
          onMouseLeave={this._onMouseLeave}
          width={width}
          animation={animation}
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

          {onSelectEnd && <EuiHighlight onSelectEnd={onSelectEnd} />}
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
  orientation: PropTypes.oneOf([ HORIZONTAL, VERTICAL ]),
  /** If the chart animates on data changes. */
  animation:  PropTypes.bool,
  /** TODO */
  stackBy: PropTypes.string,
  /** The main x axis scale type. */
  xType: PropTypes.string,
  /** The main y axis scale type. */
  yType: PropTypes.string,
  /** Manually specify the domain of x axis. */
  xDomain: PropTypes.array,
  /** Manually specify the domain of y axis. */
  yDomain: PropTypes.array,
  /** The horizontal padding between the chart borders and chart elements. */
  xPadding: PropTypes.number,
  /** The vertical padding between the chart borders and chart elements. */
  yPadding: PropTypes.number,
  /** TODO */
  onHover: PropTypes.func,
  /** Activate the brush tool and callback on brush end event. */
  onSelectEnd: PropTypes.func,
  /** TODO */
  truncateLegends: PropTypes.bool,
  /** TODO */
  errorText: PropTypes.string,
  /** Shows the crosshair tooltip on mouse move.*/
  showCrosshair: PropTypes.bool,
  /**  Specify an X or Y axis value to display a crosshair. */
  crosshairValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Callback when the crosshair position is updated. */
  onCrosshairUpdate: PropTypes.func,
  /** Show the default X and Y axis. */
  showDefaultAxis: PropTypes.bool,
};

XYChart.defaultProps = {
  animation: true,
  xType: 'linear',
  yType: 'linear',
  yPadding: 0,
  xPadding: 0,
  orientation: EuiXYChartUtils.ORIENTATION.VERTICAL,
  showCrosshair: true,
  showDefaultAxis: true,
};

export const EuiXYChart = makeVisFlexible(XYChart);

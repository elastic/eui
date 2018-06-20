import React, { PureComponent } from 'react';
import { XYPlot, makeWidthFlexible, AbstractSeries } from 'react-vis';

import PropTypes from 'prop-types';
import Highlight from './highlight';
import { EuiDefaultAxis } from './axis/default_axis';
import { EuiCrosshairX } from './crosshairs/crosshair_x';
import { EuiCrosshairY } from './crosshairs/crosshair_y';
import { VISUALIZATION_COLORS } from '../../services';
import StatusText from './status-text';
import { getSeriesChildren } from './utils/series_utils';
import { ORIENTATION } from './utils/chart_utils';

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
  }
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
      animation, // eslint-disable-line no-unused-vars
      showDefaultAxis,
      showCrosshair,
      orientation,
      crosshairValue,
      onCrosshairUpdate, // eslint-disable-line no-unused-vars
      truncateLegends, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;


    if (!children || errorText) {
      return <StatusText text={errorText} width={width} height={height} />;
    }

    this.colorIterator = 0;
    const Crosshair = orientation === ORIENTATION.HORIZONTAL
      ? EuiCrosshairY
      : EuiCrosshairX
    return (
      <div {...rest}>
        <XYExtendedPlot
          ref={this._xyPlotRef}
          dontCheckIfEmpty
          onMouseMove={this._onMouseMove}
          onMouseLeave={this._onMouseLeave}
          width={width}
          animation={true}
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
          {
            showDefaultAxis && <EuiDefaultAxis orientation={orientation} />
          }
          { showCrosshair && (
            <Crosshair
              crosshairValue={crosshairValue}
              onCrosshairUpdate={onCrosshairUpdate}
            />
          )}

          {onSelectEnd && <Highlight onSelectEnd={onSelectEnd} />}
        </XYExtendedPlot>
      </div>
    );
  }
}

XYChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  orientation: PropTypes.string,
  stackBy: PropTypes.string,
  xType: PropTypes.string,
  yType: PropTypes.string,
  xDomain: PropTypes.array,
  yDomain: PropTypes.array,
  xPadding: PropTypes.number,
  yPadding: PropTypes.number,
  onHover: PropTypes.func,
  onSelectEnd: PropTypes.func,
  truncateLegends: PropTypes.bool,
  errorText: PropTypes.string,
  showCrosshair: PropTypes.bool,
  crosshairValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onCrosshairUpdate: PropTypes.func,
  showDefaultAxis: PropTypes.bool,
};

XYChart.defaultProps = {
  xType: 'linear',
  yType: 'linear',
  yPadding: 0,
  xPadding: 0,
  truncateLegends: false,
  showCrosshair: true,
  orientation: ORIENTATION.VERTICAL,
  showDefaultAxis: true,

};

export const EuiXYChart = makeWidthFlexible(XYChart);

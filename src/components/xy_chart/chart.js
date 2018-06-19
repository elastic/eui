import React, { PureComponent } from 'react';
import { XYPlot, makeWidthFlexible, AbstractSeries } from 'react-vis';

import PropTypes from 'prop-types';
import Highlight from './highlight';
import { EuiCrosshairX } from './crosshairs/crosshair_x';
import { EuiCrosshairY } from './crosshairs/crosshair_y';
import { VISUALIZATION_COLORS } from '../../services';
import StatusText from './status-text';
import { getSeriesChildren } from './utils/series_utils';
import { EuiXYChartUtils } from './utils/chart_utils';

class XYExtendedPlot extends XYPlot {
  /**
   * Trigger onMouseLeave handler if it was passed in props.
   * @param {Event} event Native event.
   * @private
   */
  _mouseLeaveHandler(event) {
    const { onMouseLeave, children } = this.props;
    console.log('parent mouse leaving')
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
  //   const { crosshairValues, showCrosshair } = this.props;
  //   const { mouseOver } = this.state;
  //   return showCrosshair && ( mouseOver || crosshairValues !== undefined)
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
      showCrosshair,
      crosshairOrientation,
      crosshairValues,
      onCrosshairUpdate, // eslint-disable-line no-unused-vars
      truncateLegends, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;


    if (!children || errorText) {
      return <StatusText text={errorText} width={width} height={height} />;
    }

    this.colorIterator = 0;
    const Crosshair = crosshairOrientation === EuiXYChartUtils.ORIENTATION.HORIZONTAL
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

          { showCrosshair && (
            <Crosshair
              crosshairValues={crosshairValues}
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
  stackBy: PropTypes.string,
  xType: PropTypes.string,
  yType: PropTypes.string,
  onHover: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onSelectEnd: PropTypes.func,
  hoverIndex: PropTypes.number,
  xTicks: PropTypes.array,
  yTicks: PropTypes.array, // [[0, "zero"], [1.2, "one mark"], [2.4, "two marks"]]
  truncateLegends: PropTypes.bool,
  // showAxis: PropTypes.bool,
  xAxisLocation: PropTypes.string,
  yAxisLocation: PropTypes.string,
  showCrosshair: PropTypes.bool,
  errorText: PropTypes.string,
  crosshairValues: PropTypes.number,
  onCrosshairUpdate: PropTypes.func,
  xDomain: PropTypes.array,
  yDomain: PropTypes.array,
  xPadding: PropTypes.number,
  yPadding: PropTypes.number,
};

XYChart.defaultProps = {
  truncateLegends: false,
  // showAxis: true,
  showCrosshair: true,
  crosshairOrientation: EuiXYChartUtils.ORIENTATION.VERTICAL,
  yPadding: 0,
  xPadding: 0,
  xType: 'linear',
  yType: 'linear',
};

export const EuiXYChart = makeWidthFlexible(XYChart);

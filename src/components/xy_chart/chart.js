import React, { PureComponent } from 'react';
import { XYPlot, makeWidthFlexible, AbstractSeries } from 'react-vis';
import PropTypes from 'prop-types';
import Highlight from './highlight';
import { EuiCrosshair } from './crosshair';
import { VISUALIZATION_COLORS } from '../../services';
import StatusText from './status-text';

export class XYChart extends PureComponent {
  state = {
    mouseOver: false,
  };
  colorIterator = 0;
  _xyPlotRef = React.createRef();

  _onMouseLeave = () => {
    // TODO we need to find a better way to trigger a mouse leave event
    // for the crosshair
    this.setState({ mouseOver: false });
  }

  _onMouseMove = (e) => {
    e.preventDefault();
    this.setState({ mouseOver: true });
  }

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

  render() {
    const {
      width,
      height,
      xType,
      yType,
      stackBy,
      errorText,
      showTooltips,
      onSelectEnd,
      children,
      xDomain,
      yDomain,
      yPadding,
      xPadding,
      animation, // eslint-disable-line no-unused-vars
      onCrosshairUpdate, // eslint-disable-line no-unused-vars
      truncateLegends, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;


    if (!children || errorText) {
      return <StatusText text={errorText} width={width} height={height} />;
    }

    this.colorIterator = 0;

    return (
      <div {...rest}>
        <XYPlot
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

          {showTooltips && this.state.mouseOver && (
            <EuiCrosshair />
          )}

          {onSelectEnd && <Highlight onSelectEnd={onSelectEnd} />}
        </XYPlot>
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
  showTooltips: PropTypes.bool,
  errorText: PropTypes.string,
  crosshairX: PropTypes.number,
  onCrosshairUpdate: PropTypes.func,
  xDomain: PropTypes.array,
  yDomain: PropTypes.array,
  xPadding: PropTypes.number,
  yPadding: PropTypes.number,
};

XYChart.defaultProps = {
  truncateLegends: false,
  // showAxis: true,
  showTooltips: true,
  yPadding: 0,
  xPadding: 0,
  xType: 'linear',
  yType: 'linear',
};

export default makeWidthFlexible(XYChart);

import React, { PureComponent } from 'react';
import { XYPlot, makeWidthFlexible, XAxis, YAxis, HorizontalGridLines, Crosshair } from 'react-vis';
import PropTypes from 'prop-types';
import { getPlotValues } from './utils';
import Highlight from './highlight';
import { VISUALIZATION_COLORS } from '../../services/colors/visualization_colors';
import StatusText from './status-text';

export class InnerCustomPlot extends PureComponent {
  constructor(props) {
    super(props);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onNearestX = this._onNearestX.bind(this);
    this._getAllSeriesDataAtIndex = this._getAllSeriesDataAtIndex.bind(this);
    this._itemsFormat = this._itemsFormat.bind(this);
    this.seriesItems = {};
    this.classNameID = Math.random()
      .toString(36)
      .substring(7);
  }
  state = {
    crosshairValues: []
  };

  _onMouseLeave() {
    this.setState({ crosshairValues: [], lastCrosshairIndex: null });
  }

  _onNearestX = (value, { index, event, innerX }) => {
    if (this.state.lastCrosshairIndex === index) return;

    const svg = document.getElementsByClassName(this.classNameID)[0].firstChild;
    const rect = svg.getBoundingClientRect();
    const mouseX = event.pageX - rect.left;
    const closer = this._closestX(mouseX, innerX, this.state.lastIndexsX);

    if (closer === innerX) {
      this.setState({
        crosshairValues: this._getAllSeriesDataAtIndex(index),
        lastCrosshairIndex: index,
        lastIndexsX: innerX
      });
    }
  };

  _closestX(mouseX, innerX, lastIndexsX) {
    if (!lastIndexsX) return innerX;

    const arr = [innerX, lastIndexsX];
    let curr = arr[0];
    let diff = Math.abs(mouseX - curr);
    for (let val = 0; val < arr.length; val++) {
      const newdiff = Math.abs(mouseX - arr[val]);
      if (newdiff < diff) {
        diff = newdiff;
        curr = arr[val];
      }
    }
    return curr;
  }

  _registerSeriesDataCallback = (name, fn) => {
    if (name) this.seriesItems[name] = fn;
  };

  _getAllSeriesDataAtIndex = index => {
    return Object.keys(this.seriesItems).map(name => {
      return this.seriesItems[name](index);
    });
  };

  _itemsFormat(values) {
    return values.map((v, i) => {
      if (v) {
        return {
          value: v.y,
          title: Object.keys(this.seriesItems)[i] || 'Other'
        };
      }
    });
  }

  _getTickLabels(ticks) {
    return ticks.map(v => {
      return v[1];
    });
  }

  _getTicks(ticks) {
    return ticks.map(v => {
      return v[0];
    });
  }

  render() {
    const {
      width,
      height,
      errorText,
      xAxisLocation,
      yAxisLocation,
      showYAxis,
      showXAxis,
      yTicks,
      xTicks,
      onSelectEnd,
      children
    } = this.props;
    const plotValues = getPlotValues(this._getAllSeriesDataAtIndex(), width);
    let colorIterator = 0;

    if (!children) {
      return <StatusText text={errorText || 'No data returned to draw this graph.'} width={width} height={height} />;
    }

    return (
      <XYPlot
        className={this.classNameID}
        dontCheckIfEmpty
        onMouseLeave={this._onMouseLeave}
        width={width}
        animation={true}
        height={height}
        margin={2}
      >
        <HorizontalGridLines tickValues={this._getTicks(yTicks)} style={{ strokeDasharray: '5 5' }} />
        {showXAxis && (
          <XAxis
            orientation={xAxisLocation === 'top' ? 'top' : 'bottom'}
            tickSize={1}
            tickValues={this._getTicks(xTicks)}
            tickFormat={v => this._getTickLabels(xTicks)[v] || v}
          />
        )}
        {showYAxis && (
          <YAxis
            tickSize={1}
            orientation={yAxisLocation === 'right' ? 'right' : 'left'}
            tickValues={this._getTicks(yTicks)}
            tickFormat={v => this._getTickLabels(yTicks)[v] || v}
          />
        )}
        {React.Children.map(children, (child, i) => {
          const props = {
            registerSeriesDataCallback: this._registerSeriesDataCallback,
            onNearestX: this._onNearestX,
            id: `chart-${i}`
          };

          if (plotValues) {
            plotValues.xDomain = plotValues.x.domain();
            plotValues.yDomain = plotValues.y.domain();
          }

          if (!child.props.color) {
            props.color = VISUALIZATION_COLORS[colorIterator];

            colorIterator++;
            if (colorIterator > VISUALIZATION_COLORS.length - 1) colorIterator = 0;
          }

          return React.cloneElement(child, props);
        })}
        {children && (
          <Crosshair
            values={this.state.crosshairValues}
            style={{ line: { background: 'rgb(218, 218, 218)' } }}
            titleFormat={() => null}
            itemsFormat={this._itemsFormat}
          />
        )}
        {children && onSelectEnd && <Highlight onSelectEnd={onSelectEnd} />}
      </XYPlot>
    );
  }
}

InnerCustomPlot.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onHover: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onSelectEnd: PropTypes.func,
  hoverIndex: PropTypes.number,
  xTicks: PropTypes.array,
  yTicks: PropTypes.array, // [[0, "zero"], [1.2, "one mark"], [2.4, "two marks"]]
  truncateLegends: PropTypes.bool,
  showYAxis: PropTypes.bool,
  showYAxis: PropTypes.bool,
  xAxisLocation: PropTypes.string,
  yAxisLocation: PropTypes.string,
  errorText: PropTypes.string
};

InnerCustomPlot.defaultProps = {
  truncateLegends: false,
  showYAxis: true,
  showXAxis: true
};

export default makeWidthFlexible(InnerCustomPlot);

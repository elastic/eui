import React, { PureComponent } from 'react';
import { XYPlot, makeWidthFlexible, XAxis, YAxis, HorizontalGridLines, Crosshair } from 'react-vis';
import PropTypes from 'prop-types';
import { getPlotValues } from './utils';

// TODO series need these options
//     clickable: boolean
//     hoverable: boolean
//     highlightColor: color or number

// TODO Document API

// TODO chart needs these options for axis
// show: null or true/false
// position: "bottom" or "top" or "left" or "right"
// mode: null or "time" ("time" requires jquery.flot.time.js plugin)
// timezone: null, "browser" or timezone (only makes sense for mode: "time")

// color: null or color spec
// tickColor: null or color spec
// font: null or font spec object

// min: null or number
// max: null or number
// autoscaleMargin: null or number

// transform: null or fn: number -> number
// inverseTransform: null or fn: number -> number

// ticks: null or number or ticks array or (fn: axis -> ticks array)
// tickSize: number or array
// minTickSize: number or array
// tickFormatter: (fn: number, object -> string) or string
// tickDecimals: null or number

// labelWidth: null or number
// labelHeight: null or number
// reserveSpace: null or true

// tickLength: null or number

// alignTicksWithAxis: null or number

// Legend component with these options
// labelFormatter: null or (fn: string, series object -> string)
// labelBoxBorderColor: color
// noColumns: number
// position: "ne" or "nw" or "se" or "sw"
// margin: number of pixels or [x margin, y margin]
// backgroundColor: null or color
// backgroundOpacity: number between 0 and 1
// sorted: null/false, true, "ascending", "descending", "reverse", or a comparator

// TODO add aditional helper util functions

export class InnerCustomPlot extends PureComponent {
  constructor(props) {
    super(props);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onNearestX = this._onNearestX.bind(this);
    this._getAllSeriesDataAtIndex = this._getAllSeriesDataAtIndex.bind(this);
    this._itemsFormat = this._itemsFormat.bind(this);
    this.seriesItems = {};
  }
  state = {
    crosshairValues: []
  };

  _onMouseLeave() {
    this.setState({ crosshairValues: [], lastCrosshairIndex: null });
  }

  _onNearestX = (value, { index }) => {
    if (this.state.lastCrosshairIndex === index) return;

    this.setState({
      crosshairValues: this._getAllSeriesDataAtIndex(index),
      lastCrosshairIndex: index
    });
  };

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
    const { width, height, yTicks, xTicks, children } = this.props;
    const plotValues = getPlotValues(this._getAllSeriesDataAtIndex(), width);

    return (

      <XYPlot
        dontCheckIfEmpty
        onMouseLeave={this._onMouseLeave}
        width={width}
        animation={true}
        height={height}
        margin={2}
      >
        <HorizontalGridLines tickValues={this._getTicks(yTicks)} style={{ strokeDasharray: '5 5' }} />
        <XAxis tickSize={1} tickValues={this._getTicks(xTicks)} tickFormat={v => this._getTickLabels(xTicks)[v] || v} />
        <YAxis  tickSize={1} tickValues={this._getTicks(yTicks)} tickFormat={v => this._getTickLabels(yTicks)[v] || v} />
        {React.Children.map(children, (child, i) => {
          const props = {
            registerSeriesDataCallback: this._registerSeriesDataCallback,
            onNearestX: this._onNearestX,
            id: `chart-${i}`
          };

          if(plotValues) {
            plotValues.xDomain = plotValues.x.domain();
            plotValues.yDomain = plotValues.y.domain();
          }

          return  React.cloneElement(child, props);
        })}
        <Crosshair values={this.state.crosshairValues} titleFormat={() => null} itemsFormat={this._itemsFormat} />
      </XYPlot>

    );
  }
}

InnerCustomPlot.propTypes = {
  width: PropTypes.number.isRequired,
  onHover: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onSelectionEnd: PropTypes.func.isRequired,
  hoverIndex: PropTypes.number,
  xTicks: PropTypes.array, // [0, 1.2, 2.4]
  yTicks: PropTypes.array, // OR [[0, "zero"], [1.2, "one mark"], [2.4, "two marks"]]
  truncateLegends: PropTypes.bool
};

InnerCustomPlot.defaultProps = {
  truncateLegends: false
};

export default makeWidthFlexible(InnerCustomPlot);

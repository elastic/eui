import React, { PureComponent } from 'react';
import { XYPlot, makeWidthFlexible, XAxis, YAxis, HorizontalGridLines, Crosshair } from 'react-vis';
import PropTypes from 'prop-types';
import { getPlotValues } from './utils';
import Highlight from './highlight';
import { VISUALIZATION_COLORS } from '../../services';
import StatusText from './status-text';

export class XYChart extends PureComponent {
  constructor(props) {
    super(props);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._getAllSeriesDataAtIndex = this._getAllSeriesDataAtIndex.bind(this);
    this._itemsFormat = this._itemsFormat.bind(this);
    this._getAllPotentialDataTicks = this._getAllPotentialDataTicks.bind(this);
    this.seriesItems = {};
  }
  state = {
    crosshairValues: [],
  };

  colorIterator = 0;

  _setXYPlotRef = ref => (this._xyPlotRef = ref);

  _onMouseLeave() {
    this.setState({ crosshairValues: [], lastCrosshairIndex: null });
  }


  _getAllPotentialDataTicks = (xDomain) => {
    const innerChartWidth = this._xyPlotRef._getDefaultScaleProps(this._xyPlotRef.props).xRange[1]
    const maxChartXValue = (xDomain[1] - xDomain[0]) + 1;

    return (e) => {
      const mouseX = e.clientX - e.currentTarget.getBoundingClientRect().left;
      const xBucketWidth = innerChartWidth / maxChartXValue;
      const bucketIndex = Math.floor(mouseX / xBucketWidth)

      if (bucketIndex !== this.state.lastCrosshairIndex) {
        this.setState({
          crosshairValues: this._getAllSeriesDataAtIndex(bucketIndex),
          lastCrosshairIndex: bucketIndex,
        });
      }
      
    }
  }

  _registerSeriesDataCallback = (name, fn) => {
    if (name) this.seriesItems[name] = fn;
  };

  _getAllSeriesDataAtIndex = xBucket => {
    const data = Object.keys(this.seriesItems).map(name => {
      return this.seriesItems[name](xBucket);
    });

    return data;
  };

  _itemsFormat(values) {
    return values.map((v, i) => {
      if (v) {
        return {
          value: v.y,
          title: Object.keys(this.seriesItems)[i] || 'Other',
        };
      }
    });
  }

  _getTickLabels(ticks) {
    if (!ticks) return;

    return ticks.map(v => {
      return v[1];
    });
  }

  _getTicks(ticks) {
    if (!ticks) return;

    {
      return ticks.map(v => {
        return v[0];
      });
    }
  }

  _renderChildren = (child, i) => {
    const props = {
      registerSeriesDataCallback: this._registerSeriesDataCallback,
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
      mode,
      errorText,
      xAxisLocation,
      yAxisLocation,
      showAxis,
      yTicks,
      xTicks,
      showTooltips,
      onSelectEnd,
      children,
    } = this.props;
    const plotValues = getPlotValues(this._getAllSeriesDataAtIndex(), width);
    if (plotValues) {
      plotValues.xDomain = plotValues.x.domain();
      plotValues.yDomain = plotValues.y.domain();
    }

    if (!children || errorText) {
      return <StatusText text={errorText} width={width} height={height} />;
    }

    this.colorIterator = 0;

    return (
      <XYPlot
        ref={this._setXYPlotRef}
        dontCheckIfEmpty
        xType={mode}
        onMouseMove={plotValues ? this._getAllPotentialDataTicks(plotValues.xDomain) : undefined}
        onMouseLeave={this._onMouseLeave}
        width={width}
        animation={true}
        height={height}
        margin={2}
      >
        
        {showAxis && [
          <HorizontalGridLines
            key="lines"
            tickValues={this._getTicks(yTicks)}
            style={{ strokeDasharray: '5 5' }}
          />, 
          <XAxis
            key="x"
            orientation={xAxisLocation === 'top' ? 'top' : 'bottom'}
            tickSize={1}
            tickValues={this._getTicks(xTicks)}
            tickFormat={xTicks ? v => this._getTickLabels(xTicks)[v] || v : undefined}
          />,
          <YAxis
            key="Y"
            tickSize={1}
            orientation={yAxisLocation === 'right' ? 'right' : 'left'}
            tickValues={this._getTicks(yTicks)}
            tickFormat={yTicks ? v => this._getTickLabels(yTicks)[v] || v : undefined}
          />
        ]}

        {React.Children.map(children, this._renderChildren)}

        {showTooltips && (
          <Crosshair
            values={this.state.crosshairValues}
            style={{ line: { background: 'rgb(218, 218, 218)' } }}
            titleFormat={() => null}
            itemsFormat={this._itemsFormat}
          />
        )}
        
        {onSelectEnd && <Highlight onSelectEnd={onSelectEnd} />}
      </XYPlot>
    );
  }
}

XYChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onHover: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onSelectEnd: PropTypes.func,
  hoverIndex: PropTypes.number,
  xTicks: PropTypes.array,
  yTicks: PropTypes.array, // [[0, "zero"], [1.2, "one mark"], [2.4, "two marks"]]
  truncateLegends: PropTypes.bool,
  showAxis: PropTypes.bool,
  xAxisLocation: PropTypes.string,
  yAxisLocation: PropTypes.string,
  mode: PropTypes.string,
  showTooltips: PropTypes.bool,
  errorText: PropTypes.string,
};

XYChart.defaultProps = {
  truncateLegends: false,
  showAxis: true,
  showTooltips: true,
  mode: 'linear',
};

export default makeWidthFlexible(XYChart);

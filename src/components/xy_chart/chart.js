import React, { PureComponent } from 'react';
import { XYPlot, makeWidthFlexible, XAxis, YAxis, HorizontalGridLines, Crosshair } from 'react-vis';
import PropTypes from 'prop-types';
import { getPlotValues } from './utils';
import Highlight from './highlight';
import { VISUALIZATION_COLORS } from '../../services';
import StatusText from './status-text';

const NO_DATA_VALUE = '~~NODATATODISPLAY~~';

export class XYChart extends PureComponent {
  state = {
    crosshairValues: [],
  };
  seriesItems = [];
  colorIterator = 0;
  _setXYPlotRef = ref => (this._xyPlotRef = ref);

  _onMouseLeave = () => {
    this.setState({ crosshairValues: [], lastCrosshairIndex: null });
  }

  _updateCrosshairValues = (e) => {
    // Calculate the range of the X axis
    const chartData = this._xyPlotRef.state.data.filter(d => d !== undefined)
    const plotValues = getPlotValues(chartData, this.props.width);
    const xDomain = plotValues.x.domain();
    const maxChartXValue = (xDomain[1] - xDomain[0]) + 1;

    const innerChartWidth = this._xyPlotRef._getDefaultScaleProps(this._xyPlotRef.props).xRange[1]

    const mouseX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const xAxisesBucketWidth = innerChartWidth / maxChartXValue;
    const bucketX = Math.floor(mouseX / xAxisesBucketWidth)

    if (bucketX !== this.state.lastCrosshairX) {
      if(this.props.onCrosshairUpdate) this.props.onCrosshairUpdate(bucketX)
      if(!this.props.crosshairX) {
        this.setState({
          crosshairValues: this._getAllSeriesFromDataAtIndex(chartData, bucketX),
          lastCrosshairX: bucketX,
        });
      }
      
    }  
  }

  _getAllSeriesFromDataAtIndex = (chartData, xBucket) => {
    const chartDataForXValue = chartData.map(series => series.filter(seriesData => {
      return seriesData.x === xBucket
    })[0])

    if(chartDataForXValue.length === 0) {
      chartDataForXValue.push({ x: xBucket, y: NO_DATA_VALUE })
    }
  
    return chartDataForXValue;
  };

  _itemsFormat = (values) => {
    return values.map((v, i) => {
      if (v) {
        if(v.y === NO_DATA_VALUE) {
          return {
            title: 'No Data',
          };
        }
        return {
          value: v.y,
          title: this.seriesItems[i] || 'Other',
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
      id: `chart-${i}`,
    };

    this.seriesItems.push(child.props.name);

    if (!child.props.color) {
      props.color = VISUALIZATION_COLORS[this.colorIterator];

      this.colorIterator++;
      if (this.colorIterator > VISUALIZATION_COLORS.length - 1) this.colorIterator = 0;
    }

    return React.cloneElement(child, props);
  }

  _getCrosshairValues = (crosshairX) => {
    if(!crosshairX) return this.state.crosshairValues

    const chartData = this._xyPlotRef.state.data.filter(d => d !== undefined)
    return this._getAllSeriesFromDataAtIndex(chartData, crosshairX)
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
      crosshairX,
      showTooltips,
      onSelectEnd,
      children,
    } = this.props;
    

    if (!children || errorText) {
      return <StatusText text={errorText} width={width} height={height} />;
    }

    this.colorIterator = 0;

    return (
      <XYPlot
        ref={this._setXYPlotRef}
        dontCheckIfEmpty
        xType={mode}
        onMouseMove={this._updateCrosshairValues}
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
            values={this._getCrosshairValues(crosshairX)}
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
  crosshairX: PropTypes.number
};

XYChart.defaultProps = {
  truncateLegends: false,
  showAxis: true,
  showTooltips: true,
  mode: 'linear',
};

export default makeWidthFlexible(XYChart);

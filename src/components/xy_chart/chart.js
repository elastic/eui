import React, { PureComponent } from 'react';
import { XYPlot, makeWidthFlexible, Crosshair, AbstractSeries } from 'react-vis';
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
  lastCrosshairX = 0;
  _xyPlotRef = React.createRef();;

  _onMouseLeave = () => {
    this.setState({ crosshairValues: [], lastCrosshairIndex: null });
  }

  _onMouseMove = (e) => {
    e.persist();
    this._updateCrosshairValues({
      boundingClientRect: e.currentTarget.getBoundingClientRect(),
      clientX: e.clientX
    });
  }

  _updateCrosshairValues = ({ boundingClientRect, clientX }) => {
    // Calculate the range of the X axis
    const chartData = this._xyPlotRef.current.state.data.filter(d => d !== undefined)
    const plotValues = getPlotValues(chartData, this.props.width);
    const xDomain = plotValues.x.domain();
    const maxChartXValue = (xDomain[1] - xDomain[0]) + 1;

    const innerChartWidth = this._xyPlotRef.current._getDefaultScaleProps(this._xyPlotRef.current.props).xRange[1]

    const mouseX = clientX - boundingClientRect.left;
    const xAxisesBucketWidth = innerChartWidth / maxChartXValue;
    const bucketX = Math.floor(mouseX / xAxisesBucketWidth)

    if (bucketX !== this.lastCrosshairX) {
      if(this.props.onCrosshairUpdate) this.props.onCrosshairUpdate(bucketX)
      if(!this.props.crosshairX) {
        this.lastCrosshairX = bucketX;

        const crosshairValues = this._getAllSeriesFromDataAtIndex(chartData, bucketX)

        this.setState({
          crosshairValues
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

  _renderChildren = (child, i) => {
    const { prototype } = child.type;
    // Avoid applying chart props to non series children
    if (!(prototype instanceof AbstractSeries)) {
      return child;
    }

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

    const chartData = this._xyPlotRef.current.state.data.filter(d => d !== undefined)
    return this._getAllSeriesFromDataAtIndex(chartData, crosshairX)
  }


  render() {
    const {
      width,
      height,
      xType,
      yType,
      stackBy,
      errorText,
      crosshairX,
      showTooltips,
      onSelectEnd,
      children,
      xDomain,
      yDomain,
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
        >

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
};

XYChart.defaultProps = {
  truncateLegends: false,
  // showAxis: true,
  showTooltips: true,
};

export default makeWidthFlexible(XYChart);

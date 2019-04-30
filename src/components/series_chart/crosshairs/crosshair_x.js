import React from 'react';
import PropTypes from 'prop-types';
import { AbstractSeries, Crosshair } from 'react-vis';
import { SCALE } from '../utils/chart_utils';
import moment from 'moment';
/**
 * The Crosshair used by the XYChart as main tooltip mechanism along X axis (vertical).
 */
export class EuiCrosshairX extends AbstractSeries {
  state = {
    values: [],
  };

  static get requiresSVG() {
    return false;
  }

  static get isCanvas() {
    return false;
  }

  static getDerivedStateFromProps(props) {
    const { crosshairValue, _allData } = props;

    if (crosshairValue !== undefined) {
      return {
        values: EuiCrosshairX._computeDataFromXValue(_allData, crosshairValue),
      };
    }
    return null;
  }

  static _computeDataFromXValue(dataSeries, crosshairValue) {
    const filteredAndFlattenDataByX = dataSeries
      .filter(series => series) // get only cleaned data series
      .map((series, seriesIndex) => {
        return series
          .filter(dataPoint => dataPoint.x === crosshairValue)
          .map(dataPoint => ({
            ...dataPoint,
            originalValues: { ...dataPoint },
            seriesIndex,
          }));
      })
      .reduce((acc, val) => acc.concat(val), []);
    return filteredAndFlattenDataByX;
  }

  onParentMouseMove(event) {
    this._handleNearestX(event);
  }

  onParentMouseLeave() {
    if (this.props.onCrosshairUpdate) {
      this.props.onCrosshairUpdate(null);
    }
    this.setState({
      values: [],
    });
  }

  _formatXValue = x => {
    const { xType, xCrosshairFormat } = this.props;
    if (xType === SCALE.TIME || xType === SCALE.TIME_UTC) {
      return xCrosshairFormat
        ? moment(x).format(xCrosshairFormat)
        : new Date(x).toISOString();
    } else {
      return x;
    }
  };

  _titleFormat = (dataPoints = []) => {
    if (dataPoints.length > 0) {
      const [firstDataPoint] = dataPoints;
      const { originalValues } = firstDataPoint;
      const value =
        typeof originalValues.x0 === 'number'
          ? `${this._formatXValue(originalValues.x0)} to ${this._formatXValue(
              originalValues.x
            )}`
          : this._formatXValue(originalValues.x);
      return {
        title: 'X Value',
        value,
      };
    }
  };

  _itemsFormat = dataPoints => {
    const { seriesNames } = this.props;

    return dataPoints.map(d => {
      return {
        title: seriesNames[d.seriesIndex],
        value: d.y,
      };
    });
  };

  _handleNearestX(event) {
    const cleanedDataSeries = this.props._allData.filter(
      dataSeries => dataSeries
    );
    if (cleanedDataSeries.length === 0) {
      return;
    }
    const containerCoordiante = super._getXYCoordinateInContainer(event);
    this._findNearestXData(cleanedDataSeries, containerCoordiante.x);
  }

  /**
   * _findNearestXData - Find the nearest set of data in all existing series.
   *
   * @param  {type} dataSeries an array of dataseries
   * @param  {type} mouseXContainerCoords the x coordinate of the mouse on the chart container
   * @protected
   */
  _findNearestXData(dataSeries, mouseXContainerCoords) {
    const xScaleFn = super._getAttributeFunctor('x');
    // keeping a global min distance to filter only elements with the same distance
    let globalMinDistance = Number.POSITIVE_INFINITY;

    const nearestXData = dataSeries
      .map((data, seriesIndex) => {
        let minDistance = Number.POSITIVE_INFINITY;
        let value = null;
        // TODO to increase the performance, it's better to use a search algorithm like bisect
        // starting from the assumption that we will always have the same length for
        // for each series and we can assume that the scale x index can reflect more or less
        // the position of the mouse inside the array.
        data.forEach(item => {
          let itemXCoords;
          const xCoord = xScaleFn(item);
          // check the right item coordinate if we use x0 and x value (e.g. on histograms)
          if (typeof item.x0 === 'number') {
            // we need to compute the scaled x0 using the xScale attribute functor
            // we don't have access of the x0 attribute functor
            const x0Coord = xScaleFn({ x: item.x0 });
            itemXCoords = (xCoord - x0Coord) / 2 + x0Coord;
          } else {
            itemXCoords = xCoord;
          }
          const newDistance = Math.abs(mouseXContainerCoords - itemXCoords);
          if (newDistance < minDistance) {
            minDistance = newDistance;
            value = item;
          }
          globalMinDistance = Math.min(globalMinDistance, minDistance);
        });

        if (!value) {
          return;
        }

        return {
          minDistance,
          value,
          seriesIndex,
        };
      })
      .filter(d => d);

    // filter and map nearest X data per dataseries to get only the nearet onces
    const values = nearestXData
      .filter(value => value.minDistance === globalMinDistance)
      .map(value => {
        // check if we are on histograms and we need to show the right x and y values
        const d = value.value;
        const x = typeof d.x0 === 'number' ? (d.x - d.x0) / 2 + d.x0 : d.x;
        const y = typeof d.y0 === 'number' ? d.y - d.y0 : d.y;
        return { x, y, originalValues: d, seriesIndex: value.seriesIndex };
      });
    const { onCrosshairUpdate } = this.props;
    if (onCrosshairUpdate) {
      onCrosshairUpdate(values[0].x);
    }

    this.setState(() => ({
      values,
    }));
  }

  render() {
    const { values } = this.state;
    return (
      <Crosshair
        values={values}
        style={{ line: { background: 'rgb(218, 218, 218)' } }}
        itemsFormat={this._itemsFormat}
        titleFormat={this._titleFormat}
        {...this.props}
      />
    );
  }
}

EuiCrosshairX.displayName = 'EuiCrosshairX';

EuiCrosshairX.propTypes = {
  /**
   * The crosshair value used to display this crosshair (doesn't depend on mouse position)
   */
  crosshairValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The ordered array of series names
   */
  seriesNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  xCrosshairFormat: PropTypes.string,
};
EuiCrosshairX.defaultProps = {};

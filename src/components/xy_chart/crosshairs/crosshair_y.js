import React from 'react';
import { AbstractSeries } from 'react-vis';
import { CrosshairY } from './react_vis_crosshair_y';

/**
 * The Crosshair used by the XYChart as main tooltip mechanism along X axis.
 */
export class EuiCrosshairY extends AbstractSeries {
  state = {
    crosshairValues: [],
  }

  static get requiresSVG() {
    return false;
  }

  static get isCanvas() {
    return false;
  }

  static getDerivedStateFromProps(props) {
    const { crosshairY, _allData } = props;

    if (crosshairY !== undefined) {
      return {
        crosshairValues: EuiCrosshairY._computeDataFromYValue(_allData, crosshairY),
      };
    }
    return null;
  }

  static _computeDataFromYValue(dataSeries, crosshairY) {
    const filteredAndFlattenDataByY = dataSeries
      .filter(series => series) // get only cleaned data series
      .map(series => {
        return series
          .filter(dataPoint => dataPoint.y === crosshairY)
          .map(dataPoint => ({ ...dataPoint, originalValues: { ...dataPoint } }));
      })
      .reduce((acc, val) => acc.concat(val), []);
    return filteredAndFlattenDataByY;
  }

  onParentMouseMove(event) {
    this._handleNearestY(event);
  }

  onParentMouseLeave() {
    if (this.props.onCrosshairUpdate) {
      this.props.onCrosshairUpdate(null);
    }
    this.setState({
      crosshairValues: []
    })
  }

  _titleFormat = (dataPoints = []) => {
    if (dataPoints.length > 0) {
      const [ firstDataPoint ] = dataPoints
      const { originalValues } = firstDataPoint
      const value = (typeof originalValues.y0 === 'number')
        ? `${originalValues.y0} to ${originalValues.y}`
        : originalValues.y;
      return {
        title: 'Y Value',
        value,
      }
    }
  }

  _itemsFormat = (dataPoints) => {
    return dataPoints.map((d, i) => {
      return {
        title: `series ${i}`, // TODO specify series title or default one
        value: d.x,
      };
    });
  }

  _handleNearestY(event) {
    const cleanedDataSeries = this.props._allData.filter(dataSeries => dataSeries);
    if (cleanedDataSeries.length === 0) {
      return;
    }
    const containerCoordiante = super._getXYCoordinateInContainer(event);
    this._findNearestYData(cleanedDataSeries, containerCoordiante.y);
  }

  /**
   * _findNearestYData - Find the nearest set of data in all existing series.
   *
   * @param  {type} dataSeries an array of dataseries
   * @param  {type} mouseYContainerCoords the y coordinate of the mouse on the chart container
   * @protected
   */
  _findNearestYData(dataSeries, mouseYContainerCoords) {
    const yScaleFn = super._getAttributeFunctor('y');
    // keeping a global min distance to filter only elements with the same distance
    let globalMinDistance = Number.POSITIVE_INFINITY;

    const nearestYData = dataSeries
      .map(data => {
        let minDistance = Number.POSITIVE_INFINITY;
        let value = null;
        data.forEach((item) => {
          let itemYCoords;
          const yCoord = yScaleFn(item);
          // check the right item coordinate if we use x0 and x value (e.g. on histograms)
          if (typeof item.y0 === 'number') {
            // we need to compute the scaled y0 using the xScale attribute functor
            // we don't have access of the y0 attribute functor
            const y0Coord = yScaleFn({ y: item.y0 });
            itemYCoords = (yCoord - y0Coord) / 2 + y0Coord;
          } else {
            itemYCoords = yCoord;
          }
          const newDistance = Math.abs(mouseYContainerCoords - itemYCoords);
          if (newDistance < minDistance) {
            minDistance = newDistance;
            value = item;
          }
          globalMinDistance = Math.min(globalMinDistance, minDistance)
        });

        if (!value) {
          return;
        }

        return {
          minDistance,
          value,
        };
      })
      .filter(d => d);
    // filter and map nearest X data per dataseries to get only the nearet onces
    const crosshairValues = nearestYData
      .filter(value => value.minDistance === globalMinDistance)
      .map(value => {
        // check if we are on histograms and we need to show the right x and y values
        const d = value.value;
        const y = typeof d.y0 === 'number'
          ? (d.y - d.y0) / 2 + d.y0
          : d.y;
        const x = typeof d.x0 === 'number'
          ? (d.x - d.x0)
          : d.x;
        return { x, y, originalValues: d };
      });

    if (this.props.onCrosshairUpdate) {
      this.props.onCrosshairUpdate(crosshairValues[0].y);
    }

    this.setState({
      crosshairValues,
    });
  }

  render() {
    const { crosshairValues } = this.state
    return (
      <CrosshairY
        values={crosshairValues}
        style={{ line: { background: 'rgb(218, 218, 218)' } }}
        itemsFormat={this._itemsFormat}
        titleFormat={this._titleFormat}
        {...this.props}
      />
    )
  }
}

EuiCrosshairY.displayName = 'EuiCrosshairY';

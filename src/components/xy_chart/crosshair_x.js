import React from 'react';
import { AbstractSeries, Crosshair } from 'react-vis';

export class EuiCrosshairX extends AbstractSeries {
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
    const { crosshairX, _allData } = props;

    if (crosshairX !== undefined) {
      return {
        crosshairValues: EuiCrosshairX._computeDataFromXValue(_allData, crosshairX),
      };
    }
    return null;
  }

  static _computeDataFromXValue(dataSeries, crosshairX) {
    const filteredAndFlattenDataByX = dataSeries
      .filter(series => series) // get only cleaned data series
      .map(series => {
        return series
          .filter(dataPoint => dataPoint.x === crosshairX)
          .map(dataPoint => ({ ...dataPoint, originalValues: { ...dataPoint } }));
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
      crosshairValues: []
    })
  }

  _titleFormat = (dataPoints = []) => {
    if (dataPoints.length > 0) {
      const [ firstDataPoint ] = dataPoints
      const { originalValues } = firstDataPoint
      const value = (typeof originalValues.x0 === 'number')
        ? `${originalValues.x0} to ${originalValues.x}`
        : originalValues.x;
      return {
        title: 'X Value',
        value,
      }
    }
  }

  _itemsFormat = (dataPoints) => {
    return dataPoints.map((d, i) => {
      return {
        title: `series ${i}`, // TODO specify series title or default one
        value: d.y,
      };
    });
  }

  _handleNearestX(event) {
    const cleanedDataSeries = this.props._allData.filter(dataSeries => dataSeries);
    if (cleanedDataSeries.length === 0) {
      return;
    }
    const containerCoordiante = super._getXYCoordinateInContainer(event);
    this._findNearestXData(cleanedDataSeries, containerCoordiante.x);
  }

  _findNearestXData(dataSeries, mouseXContainerCoords) {
    const xScaleFn = super._getAttributeFunctor('x');
    // keeping a global min distance to filter only elements with the same distance
    let globalMinDistance = Number.POSITIVE_INFINITY;

    const nearestXData = dataSeries
      .map(data => {
        let minDistance = Number.POSITIVE_INFINITY;
        let value = null;
        data.forEach((item) => {
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
    const crosshairValues = nearestXData
      .filter(value => value.minDistance === globalMinDistance)
      .map(value => {
        // check if we are on histograms and we need to show the right x and y values
        const d = value.value;
        const x = typeof d.x0 === 'number'
          ? (d.x - d.x0) / 2 + d.x0
          : d.x;
        const y = typeof d.y0 === 'number'
          ? (d.y - d.y0)
          : d.y;
        return { x, y, originalValues: d };
      });

    if (this.props.onCrosshairUpdate) {
      this.props.onCrosshairUpdate(crosshairValues[0].x);
    }

    this.setState({
      crosshairValues,
    });
  }

  render() {
    const { crosshairValues } = this.state
    return (
      <Crosshair
        values={crosshairValues}
        style={{ line: { background: 'rgb(218, 218, 218)' } }}
        itemsFormat={this._itemsFormat}
        titleFormat={this._titleFormat}
        {...this.props}
      />
    )
  }
}

import React from 'react';
import { AbstractSeries, Crosshair } from 'react-vis';

export class EuiCrosshair extends AbstractSeries {
  state = {
    crosshairValues: [],
  }

  static get requiresSVG() {
    return false;
  }

  static get isCanvas() {
    return false;
  }

  onParentMouseMove(event) {
    this._handleNearestX(event);
  }

  onParentMouseMove(event) {
    this._handleNearestX(event);
  }

  _handleNearestX(event) {
    const chartData = this.props._allData.filter(d => d)
    if (chartData.length === 0) {
      return
    }
    const coordinate = super._getXYCoordinateInContainer(event);
    const xScaleFn = super._getAttributeFunctor('x');

    const crosshairValues = chartData
      .map(data => {
        let minDistance = Number.POSITIVE_INFINITY;
        let value = null;
        data.forEach((item) => {
          const currentCoordinate = xScaleFn(item);
          const newDistance = Math.abs(coordinate.x - currentCoordinate);
          if (newDistance < minDistance) {
            minDistance = newDistance;
            value = item;
          }
        });
        if (!value) {
          return;
        }
        return {
          ...value,
        }
      })
      .filter(d => d);

    this.setState({
      crosshairValues,
    });
  }

  render() {

    return (
      <Crosshair
        values={this.state.crosshairValues}
        style={{ line: { background: 'rgb(218, 218, 218)' } }}
        {...this.props}
      />
    )
  }
}

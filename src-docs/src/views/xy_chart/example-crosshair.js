import React from 'react';

import {
  EuiXYChart,
  EuiVerticalBarSeries,
  EuiDefaultAxis,
} from '../../../../src/components';

// eslint-disable-next-line
export class ExampleCrosshair extends React.Component {
  state = {
    crosshairX: 2,
  }
  _updateCrosshairLocation = (crosshairX) => {
    console.log('update crosshair x');
    this.setState({ crosshairX });
  }
  render() {
    return (
      <div>
        <EuiXYChart
          onCrosshairUpdate={this._updateCrosshairLocation}
          crosshairX={this.state.crosshairX}
          width={600}
          height={200}
        >
          <EuiVerticalBarSeries
            name="Users"
            data={[{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 5, y: 2 }]}
            color={'#db1374'}
          />
          <EuiDefaultAxis />
        </EuiXYChart>
        <br /><br />
        <EuiXYChart
          onCrosshairUpdate={this._updateCrosshairLocation}
          crosshairX={this.state.crosshairX}
          width={600}
          height={200}
        >
          <EuiVerticalBarSeries
            name="Users"
            data={[{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 5, y: 2 }]}
            color={'#db1374'}
          />
          <EuiDefaultAxis />
        </EuiXYChart>
      </div>
    );
  }
}

import React from 'react';

import { EuiSpacer } from '../../../../src/components';
import { EuiSeriesChart, EuiBarSeries } from '../../../../src/experimental';

// eslint-disable-next-line
export class ExampleCrosshair extends React.Component {
  state = {
    crosshairValue: 2,
  };
  _updateCrosshairLocation = crosshairValue => {
    this.setState({ crosshairValue });
  };
  render() {
    return (
      <div>
        <EuiSeriesChart
          onCrosshairUpdate={this._updateCrosshairLocation}
          crosshairValue={this.state.crosshairValue}
          width={600}
          height={200}>
          <EuiBarSeries
            name="Users"
            data={[
              { x: 0, y: 1 },
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 1 },
              { x: 5, y: 2 },
            ]}
          />
        </EuiSeriesChart>
        <EuiSpacer size="xl" />
        <EuiSeriesChart
          onCrosshairUpdate={this._updateCrosshairLocation}
          crosshairValue={this.state.crosshairValue}
          width={600}
          height={200}>
          <EuiBarSeries
            name="Users"
            data={[
              { x: 0, y: 1 },
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 1 },
              { x: 5, y: 2 },
            ]}
          />
        </EuiSeriesChart>
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import { VerticalGridLines } from 'react-vis';

/**
 * Vertical grid lines aligned with x axis ticks
 */
export class EuiVerticalGrid extends PureComponent {
  render() {
    return <VerticalGridLines {...this.props} />;
  }
}

EuiVerticalGrid.displayName = 'EuiVerticalGrid';

EuiVerticalGrid.requiresSVG = true;

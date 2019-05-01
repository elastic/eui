import React, { PureComponent } from 'react';
import { HorizontalGridLines } from 'react-vis';

/**
 * Horizontal grid lines aligned with y axis ticks
 */
export class EuiHorizontalGrid extends PureComponent {
  render() {
    return <HorizontalGridLines {...this.props} />;
  }
}

EuiHorizontalGrid.displayName = 'EuiHorizontalGrid';

EuiHorizontalGrid.requiresSVG = true;

import React, { PureComponent } from 'react';
import { VerticalGridLines } from 'react-vis';

/**
 * Vertical grid lines aligned with x axis ticks
 */
export class EuiVerticalGrid extends PureComponent {
  render() {
    const style = {
      strokeDasharray: '5 5',
      strokeOpacity: 0.3,
    };
    return (
      <VerticalGridLines
        style={style}
        {...this.props}
      />
    )

  }
}

EuiVerticalGrid.displayName = 'EuiVerticalGrid';

EuiVerticalGrid.requiresSVG = true;

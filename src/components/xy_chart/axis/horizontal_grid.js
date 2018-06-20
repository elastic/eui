import React, { PureComponent } from 'react';
import { HorizontalGridLines } from 'react-vis';

export class EuiHorizontalGrid extends PureComponent {
  render() {
    const style = {
      strokeDasharray: '5 5',
      strokeOpacity: 0.3,
    };
    return (
      <HorizontalGridLines
        style={style}
        {...this.props}
      />
    )

  }
}

EuiHorizontalGrid.displayName = 'EuiHorizontalGrid';

EuiHorizontalGrid.requiresSVG = true;

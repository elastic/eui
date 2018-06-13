import React, { PureComponent } from 'react';
import { VerticalGridLines } from 'react-vis';

export default class EuiVerticalGrid extends PureComponent {
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

EuiVerticalGrid.requiresSVG = true;

import React, { Component } from 'react';

import { EuiColorPicker } from './color_picker';
import { EuiRangeThumb } from '../form/range/range_thumb';

export class EuiColorStopThumb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
      color: this.props.color,
    };
  }

  handleChange = value => {
    this.setState({ color: value });
  };

  render() {
    const { stop, color, id, ...rest } = this.props;

    const button = (
      <button
        style={{
          width: 16,
          height: 16,
        }}
      />
    );

    return (
      <EuiRangeThumb
        style={{
          background: this.state.color,
          pointerEvents: 'auto',
          cusror: 'pointer',
          left: `${stop}%`,
        }}>
        <EuiColorPicker
          onChange={this.handleChange}
          color={this.state.color}
          button={button}
        />
      </EuiRangeThumb>
    );
  }
}

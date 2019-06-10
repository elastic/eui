import React, { Component } from 'react';

import { EuiColorStops, EuiFormRow } from '../../../../src/components';

export class ColorStops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorStops: [
        {
          stop: 0,
          color: '#ff0000',
        },
        {
          stop: 25,
          color: '#FFFF00',
        },
        {
          stop: 35,
          color: '#008000',
        },
      ],
    };
  }

  handleChange = ({ colorStops }) => {
    this.setState({ colorStops });
  };

  render() {
    return (
      <EuiFormRow label="Color stops">
        <EuiColorStops
          onChange={this.handleChange}
          colorStops={this.state.colorStops}
        />
      </EuiFormRow>
    );
  }
}

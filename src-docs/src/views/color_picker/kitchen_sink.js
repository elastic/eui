import React, { Component } from 'react';

import { EuiColorPicker } from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

export class KitchenSink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
    };
  }

  handleChange = value => {
    this.setState({ color: value });
  };

  render() {
    return (
      /* DisplayToggles wrapper for Docs only */
      <DisplayToggles canLoading={false}>
        <EuiColorPicker color={this.state.color} onChange={this.handleChange} />
      </DisplayToggles>
    );
  }
}

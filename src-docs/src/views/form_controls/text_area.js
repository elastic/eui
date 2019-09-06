import React, { Component } from 'react';

import { EuiTextArea } from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      /* DisplayToggles wrapper for Docs only */
      <DisplayToggles canLoading={false}>
        <EuiTextArea
          placeholder="Placeholder text"
          aria-label="Use aria labels when no actual label is in use"
          value={this.state.value}
          onChange={this.onChange}
        />
      </DisplayToggles>
    );
  }
}

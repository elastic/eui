import React, { Component } from 'react';

import { EuiFieldPassword } from '../../../../src/components';
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
      <DisplayToggles>
        <EuiFieldPassword
          placeholder="Placeholder text"
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
        />
      </DisplayToggles>
    );
  }
}

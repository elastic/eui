import React, { Component } from 'react';

import { EuiFieldSearch, EuiSwitch } from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClearable: true,
      value: '',
    };
  }

  onChange = e => {
    this.setState({
      value: e === '' ? '' : e.target.value,
    });
  };

  render() {
    return (
      /* DisplayToggles wrapper for Docs only */
      <DisplayToggles
        extras={[
          <EuiSwitch
            compressed
            label={'clearable'}
            checked={this.state.isClearable}
            onChange={e => {
              this.setState({ isClearable: e.target.checked });
            }}
          />,
        ]}>
        <EuiFieldSearch
          placeholder="Search this"
          value={this.state.value}
          onChange={this.onChange}
          isClearable={this.state.isClearable}
          aria-label="Use aria labels when no actual label is in use"
        />
      </DisplayToggles>
    );
  }
}

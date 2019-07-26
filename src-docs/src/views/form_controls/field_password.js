import React, { Component, Fragment } from 'react';

import { EuiFieldPassword, EuiSpacer } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'password',
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiFieldPassword
          compressed
          placeholder="Placeholder text"
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldPassword
          placeholder="Disabled"
          value={this.state.value}
          onChange={this.onChange}
          disabled
          compressed
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldPassword
          placeholder="Loading"
          value={this.state.value}
          onChange={this.onChange}
          isLoading
          compressed
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldPassword
          placeholder="Loading and disabled"
          value={this.state.value}
          onChange={this.onChange}
          isLoading
          disabled
          compressed
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldPassword
          placeholder="Compressed"
          value={this.state.value}
          onChange={this.onChange}
          compressed
          readOnly
        />

        <EuiSpacer size="m" />

        <EuiFieldPassword
          placeholder="Compressed and loading"
          value={this.state.value}
          onChange={this.onChange}
          isInvalid
          fullWidth
          compressed
        />
      </Fragment>
    );
  }
}

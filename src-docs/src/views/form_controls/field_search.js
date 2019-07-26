import React, { Component, Fragment } from 'react';

import { EuiFieldSearch, EuiSpacer } from '../../../../src/components';

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
      <Fragment>
        <EuiFieldSearch
          compressed
          placeholder="Placeholder text"
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldSearch
          compressed
          placeholder="Disabled"
          value={this.state.value}
          onChange={this.onChange}
          disabled
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldSearch
          compressed
          placeholder="Loading"
          value={this.state.value}
          onChange={this.onChange}
          isLoading
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldSearch
          compressed
          placeholder="Loading and disabled"
          value={this.state.value}
          onChange={this.onChange}
          isLoading
          disabled
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldSearch
          compressed
          placeholder="Read-only"
          value={this.state.value}
          onChange={this.onChange}
          readOnly
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldSearch
          placeholder="Compressed"
          value={this.state.value}
          onChange={this.onChange}
          compressed
          isInvalid
          fullWidth
        />
      </Fragment>
    );
  }
}

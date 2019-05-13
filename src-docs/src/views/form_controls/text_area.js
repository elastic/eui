import React, { Component, Fragment } from 'react';

import { EuiTextArea, EuiSpacer } from '../../../../src/components';

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
        <EuiTextArea
          placeholder="Placeholder text"
          aria-label="Use aria labels when no actual label is in use"
          value={this.state.value}
          onChange={this.onChange}
        />

        <EuiSpacer size="m" />

        <EuiTextArea
          placeholder="Disabled"
          aria-label="Use aria labels when no actual label is in use"
          value={this.state.value}
          onChange={this.onChange}
          disabled
        />

        <EuiSpacer size="m" />

        <EuiTextArea
          placeholder="Read-only"
          aria-label="Use aria labels when no actual label is in use"
          value={this.state.value}
          onChange={this.onChange}
          readOnly
        />

        <EuiSpacer size="m" />

        <EuiTextArea
          placeholder="compressed has three rows"
          value={this.state.value}
          onChange={this.onChange}
          compressed
        />
      </Fragment>
    );
  }
}

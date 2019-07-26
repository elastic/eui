import React, { Component, Fragment } from 'react';

import { EuiFieldNumber, EuiSpacer, EuiText } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      rangeValue: undefined,
    };
  }

  onChange = e => {
    const sanitizedValue = parseInt(e.target.value, 10);
    this.setState({
      value: isNaN(sanitizedValue) ? '' : sanitizedValue,
    });
  };

  onRangeChange = value => {
    this.setState({
      rangeValue: value,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiFieldNumber
          compressed
          placeholder="Placeholder text"
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldNumber
          compressed
          placeholder="Disabled"
          value={this.state.value}
          onChange={this.onChange}
          disabled
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldNumber
          compressed
          placeholder="Loading"
          value={this.state.value}
          onChange={this.onChange}
          isLoading
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldNumber
          compressed
          placeholder="Loading and disabled"
          value={this.state.value}
          onChange={this.onChange}
          disabled
          isLoading
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldNumber
          compressed
          placeholder="Read-only"
          value={this.state.value}
          onChange={this.onChange}
          readOnly
          aria-label="Use aria labels when no actual label is in use"
        />

        <EuiSpacer size="m" />

        <EuiFieldNumber
          placeholder="Compressed"
          value={this.state.value}
          onChange={this.onChange}
          compressed
          isInvalid
          fullWidth
        />

        <EuiSpacer size="m" />

        <EuiFieldNumber
          compressed
          style={{ textAlign: 'right' }}
          append={
            <EuiText size="xs">
              <strong>%</strong>
            </EuiText>
          }
          placeholder="0 - 100"
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
        />
      </Fragment>
    );
  }
}

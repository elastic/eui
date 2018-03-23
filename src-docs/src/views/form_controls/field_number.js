import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiFieldNumber,
  EuiSpacer,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  onChange = e => {
    const sanitizedValue = parseInt(e.target.value, 10);
    this.setState({
      value: isNaN(sanitizedValue) ? '' : sanitizedValue,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiFieldNumber
          placeholder="Placeholder text"
          value={this.state.value}
          onChange={this.onChange}
        />

        <EuiSpacer size="m" />

        <EuiFieldNumber
          placeholder="Disabled"
          value={this.state.value}
          onChange={this.onChange}
          disabled
        />

        <EuiSpacer size="m" />

        <EuiFieldNumber
          placeholder="Loading"
          value={this.state.value}
          onChange={this.onChange}
          isLoading
        />

        <EuiSpacer size="m" />

        <EuiFieldNumber
          placeholder="Loading and disabled"
          value={this.state.value}
          onChange={this.onChange}
          disabled
          isLoading
        />

        <EuiSpacer size="m" />

        <EuiFieldNumber
          placeholder="Read-only"
          value={this.state.value}
          onChange={this.onChange}
          readOnly
        />
      </Fragment>
    );
  }
}

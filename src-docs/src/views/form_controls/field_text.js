import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiFieldText,
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
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiFieldText
          placeholder="Placeholder text"
          value={this.state.value}
          onChange={this.onChange}
        />

        <EuiSpacer size="m" />

        <EuiFieldText
          placeholder="Disabled"
          value={this.state.value}
          onChange={this.onChange}
          disabled
        />

        <EuiSpacer size="m" />

        <EuiFieldText
          placeholder="Loading"
          value={this.state.value}
          onChange={this.onChange}
          isLoading
        />

        <EuiSpacer size="m" />

        <EuiFieldText
          placeholder="Loading and disabled"
          value={this.state.value}
          onChange={this.onChange}
          isLoading
          disabled
        />

        <EuiSpacer size="m" />

        <EuiFieldText
          placeholder="Read-only"
          value={this.state.value}
          onChange={this.onChange}
          readOnly
        />
      </Fragment>
    );
  }
}

import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiFieldPassword,
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
        <EuiFieldPassword
          placeholder="Placeholder text"
          value={this.state.value}
          onChange={this.onChange}
        />

        <EuiSpacer size="m" />

        <EuiFieldPassword
          placeholder="Disabled"
          value={this.state.value}
          onChange={this.onChange}
          disabled
        />

        <EuiSpacer size="m" />

        <EuiFieldPassword
          placeholder="Loading"
          value={this.state.value}
          onChange={this.onChange}
          isLoading
        />

        <EuiSpacer size="m" />

        <EuiFieldPassword
          placeholder="Loading and disabled"
          value={this.state.value}
          onChange={this.onChange}
          isLoading
          disabled
        />
      </Fragment>
    );
  }
}

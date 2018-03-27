import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiFieldSearch,
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
        <EuiFieldSearch
          placeholder="Placeholder text"
          value={this.state.value}
          onChange={this.onChange}
        />

        <EuiSpacer size="m" />

        <EuiFieldSearch
          placeholder="Disabled"
          value={this.state.value}
          onChange={this.onChange}
          disabled
        />

        <EuiSpacer size="m" />

        <EuiFieldSearch
          placeholder="Loading"
          value={this.state.value}
          onChange={this.onChange}
          isLoading
        />

        <EuiSpacer size="m" />

        <EuiFieldSearch
          placeholder="Loading and disabled"
          value={this.state.value}
          onChange={this.onChange}
          isLoading
          disabled
        />

        <EuiSpacer size="m" />

        <EuiFieldSearch
          placeholder="Read-only"
          value={this.state.value}
          onChange={this.onChange}
          readOnly
        />
      </Fragment>
    );
  }
}

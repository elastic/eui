import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiSuperSelect,
  EuiHealth,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [
      {
        value: 'warning',
        inputDisplay: (
          <EuiHealth color="subdued">
            Warning
          </EuiHealth>
        ),
      },
      {
        value: 'minor',
        inputDisplay: (
          <EuiHealth color="warning">
            Minor
          </EuiHealth>
        ),
      },
      {
        value: 'critical',
        inputDisplay: (
          <EuiHealth color="danger">
            Critical
          </EuiHealth>
        ),
      },
    ];

    this.state = {
      value: this.options[1].value,
    };
  }

  onChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiSuperSelect
          options={this.options}
          valueOfSelected={this.state.value}
          onChange={this.onChange}
          aria-label="Health levels"
        />
      </Fragment>
    );
  }
}

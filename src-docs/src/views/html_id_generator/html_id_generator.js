import React, { Component, Fragment } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiCode,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: htmlIdGenerator()(),
    };
  }

  reGenerate = () => {
    this.setState({ value: htmlIdGenerator()() });
  };

  render() {
    const { value } = this.state;
    return (
      <Fragment>
        <EuiFlexGroup
          justifyContent="flexStart"
          gutterSize="m"
          alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiCode>{value}</EuiCode>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={this.reGenerate}>Regenerate</EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </Fragment>
    );
  }
}

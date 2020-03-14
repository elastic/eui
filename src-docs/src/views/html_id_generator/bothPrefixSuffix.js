import React, { Component, Fragment } from 'react';

import {
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiButton,
  EuiCode,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export class PrefixSufix extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prefix: '',
      suffix: '',
      id1: htmlIdGenerator('')(''),
    };
  }

  onPrefixChange = e => {
    const prefix = e.target.value;
    this.setState({
      prefix,
    });
  };

  onSuffixChange = e => {
    const suffix = e.target.value;
    this.setState({
      suffix,
    });
  };

  reGenerate = () => {
    const { prefix, suffix } = this.state;
    this.setState({
      id1: htmlIdGenerator(prefix)(suffix),
    });
  };

  render() {
    const { prefix, suffix, id1 } = this.state;
    return (
      <Fragment>
        <EuiFlexGroup
          justifyContent="flexStart"
          gutterSize="m"
          alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiFieldSearch
              value={prefix}
              onChange={this.onPrefixChange}
              placeholder="Prefix"
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFieldSearch
              value={suffix}
              onChange={this.onSuffixChange}
              placeholder="Suffix"
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={this.reGenerate}>Generate</EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        <EuiSpacer size="m" />
        <EuiCode>{id1} </EuiCode>
      </Fragment>
    );
  }
}

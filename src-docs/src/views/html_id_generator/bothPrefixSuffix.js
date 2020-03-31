import React, { Component, Fragment } from 'react';

import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiCode,
  EuiFormRow,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export class PrefixSufix extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prefix: 'Some',
      suffix: 'Id',
      id1: htmlIdGenerator('Some')('Id'),
    };
  }

  onPrefixChange = e => {
    const prefix = e.target.value;
    const { suffix } = this.state;

    this.setState({
      prefix,
      id1: htmlIdGenerator(prefix)(suffix),
    });
  };

  onSuffixChange = e => {
    const suffix = e.target.value;
    const { prefix } = this.state;

    this.setState({
      suffix,
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
            <EuiFormRow label="Prefix">
              <EuiFieldText
                value={prefix}
                onChange={this.onPrefixChange}
                placeholder="Enter prefix"
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFormRow label="Suffix">
              <EuiFieldText
                value={suffix}
                onChange={this.onSuffixChange}
                placeholder="Enter suffix"
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="xl" />
        <EuiCode>{id1} </EuiCode>
      </Fragment>
    );
  }
}

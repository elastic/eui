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

export class HtmlIdGeneratorSuffix extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suffix: 'Id',
      id1: htmlIdGenerator()('Id'),
    };
  }

  onSuffixChange = e => {
    const suffix = e.target.value;
    this.setState({
      suffix,
      id1: htmlIdGenerator()(suffix),
    });
  };

  render() {
    const { suffix, id1 } = this.state;
    return (
      <Fragment>
        <EuiFlexGroup
          justifyContent="flexStart"
          gutterSize="m"
          alignItems="center">
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

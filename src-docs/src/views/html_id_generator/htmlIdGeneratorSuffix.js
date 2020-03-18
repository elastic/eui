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
      id2: htmlIdGenerator()('Id'),
    };
  }

  onSuffixChange = e => {
    const suffix = e.target.value;
    this.setState({
      suffix,
      id1: htmlIdGenerator()(suffix),
      id2: htmlIdGenerator()(suffix),
    });
  };

  render() {
    const { suffix, id1, id2 } = this.state;
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
        <EuiSpacer size="m" />
        <EuiSpacer size="m" />
        <EuiCode>{id1} </EuiCode>
        <EuiSpacer size="m" />
        <EuiSpacer size="m" />
        <EuiCode>{id2} </EuiCode>
      </Fragment>
    );
  }
}

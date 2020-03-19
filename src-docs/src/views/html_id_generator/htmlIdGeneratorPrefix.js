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

export class HtmlIdGeneratorPrefix extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prefix: 'Id',
      id1: htmlIdGenerator('Id')(),
    };
  }

  onSearchChange = e => {
    const prefix = e.target.value;
    this.setState({
      prefix,
      id1: htmlIdGenerator(prefix)(),
    });
  };

  render() {
    const { prefix, id1 } = this.state;
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
                onChange={this.onSearchChange}
                placeholder="Enter prefix"
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

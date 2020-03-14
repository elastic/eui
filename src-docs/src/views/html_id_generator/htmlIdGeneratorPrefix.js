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

export class HtmlIdGeneratorPrefix extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prefix: '',
      id1: htmlIdGenerator('')(),
      id2: htmlIdGenerator('')(),
      id3: htmlIdGenerator('')(),
    };
  }

  onSearchChange = e => {
    const prefix = e.target.value;
    this.setState({
      prefix,
    });
  };

  reGenerate = () => {
    const { prefix } = this.state;
    this.setState({
      id1: htmlIdGenerator(prefix)(),
      id2: htmlIdGenerator(prefix)(),
      id3: htmlIdGenerator(prefix)(),
    });
  };

  render() {
    const { prefix, id1, id2, id3 } = this.state;
    return (
      <Fragment>
        <EuiFlexGroup
          justifyContent="flexStart"
          gutterSize="m"
          alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiFieldSearch value={prefix} onChange={this.onSearchChange} />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={this.reGenerate}>Generate</EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        <EuiSpacer size="m" />
        <EuiCode>{id1} </EuiCode>
        <EuiSpacer size="m" />
        <EuiSpacer size="m" />
        <EuiCode>{id2} </EuiCode>
        <EuiSpacer size="m" />
        <EuiSpacer size="m" />
        <EuiCode>{id3} </EuiCode>
      </Fragment>
    );
  }
}

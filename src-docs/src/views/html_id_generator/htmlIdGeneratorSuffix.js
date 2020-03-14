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

export class HtmlIdGeneratorSuffix extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suffix: '',
      id1: htmlIdGenerator()(''),
      id2: htmlIdGenerator()(''),
    };
  }

  onSuffixChange = e => {
    const suffix = e.target.value;
    this.setState({
      suffix,
    });
  };

  reGenerate = () => {
    const { suffix } = this.state;
    this.setState({
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
        <EuiSpacer size="m" />
        <EuiSpacer size="m" />
        <EuiCode>{id2} </EuiCode>
      </Fragment>
    );
  }
}

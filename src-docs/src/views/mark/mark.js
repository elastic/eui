import React, { Component, Fragment } from 'react';

import { EuiMark, EuiFieldSearch, EuiSpacer } from '../../../../src/components';

export class Mark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: 'jumped over',
    };
  }

  onSearchChange = e => {
    const searchValue = e.target.value;
    this.setState({
      searchValue,
    });
  };

  render() {
    const { searchValue } = this.state;

    return (
      <Fragment>
        <EuiFieldSearch value={searchValue} onChange={this.onSearchChange} />

        <EuiSpacer size="m" />

        <EuiMark search={searchValue}>
          The quick brown fox jumped over the lazy dog
        </EuiMark>
      </Fragment>
    );
  }
}

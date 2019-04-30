import React, { Component, Fragment } from 'react';

import {
  EuiHighlight,
  EuiFieldSearch,
  EuiSpacer,
} from '../../../../src/components';

export class Highlight extends Component {
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

        <EuiHighlight search={searchValue}>
          The quick brown fox jumped over the lazy dog
        </EuiHighlight>
      </Fragment>
    );
  }
}

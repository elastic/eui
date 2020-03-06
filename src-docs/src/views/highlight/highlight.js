import React, { Component, Fragment } from 'react';

import {
  EuiHighlight,
  EuiFieldSearch,
  EuiSpacer,
  EuiSwitch,
} from '../../../../src/components';

export class Highlight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: 'jumped over',
      isHighlightAll: false,
    };
  }

  onSearchChange = e => {
    const searchValue = e.target.value;
    this.setState({
      searchValue,
    });
  };

  setHighlightAll = e => {
    this.setState({ isHighlightAll: e.target.checked });
  };

  render() {
    const { searchValue, isHighlightAll } = this.state;
    return (
      <Fragment>
        <EuiFieldSearch value={searchValue} onChange={this.onSearchChange} />

        <EuiSpacer size="m" />
        <EuiSwitch
          label="Highlight all"
          checked={isHighlightAll}
          onChange={e => this.setHighlightAll(e)}
        />
        <EuiSpacer size="m" />
        <EuiHighlight search={searchValue} highlightAll={isHighlightAll}>
          The quick brown fox jumped over the lazy dog
        </EuiHighlight>
      </Fragment>
    );
  }
}

import React, { Component } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPagination,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 0,
    };

    this.PAGE_COUNT = 10;
  }

  goToPage = pageNumber => {
    this.setState({
      activePage: pageNumber,
    });
  };

  render() {
    return (
      <EuiFlexGroup justifyContent="spaceAround">
        <EuiFlexItem grow={false}>
          <EuiPagination
            pageCount={this.PAGE_COUNT}
            activePage={this.state.activePage}
            onPageClick={this.goToPage}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}

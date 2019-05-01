import React, { Component } from 'react';

import { EuiPagination } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 0,
    };

    this.PAGE_COUNT = 4;
  }

  goToPage = pageNumber => {
    this.setState({
      activePage: pageNumber,
    });
  };

  render() {
    return (
      <EuiPagination
        pageCount={this.PAGE_COUNT}
        activePage={this.state.activePage}
        onPageClick={this.goToPage}
      />
    );
  }
}

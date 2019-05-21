import React, { Component } from 'react';

import {
  EuiButtonEmpty,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPagination,
  EuiPopover,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
      activePage: 0,
    };

    this.PAGE_COUNT = 10;
  }

  onButtonClick() {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  goToPage = pageNumber => {
    this.setState({
      activePage: pageNumber,
    });
  };

  render() {
    const button = (
      <EuiButtonEmpty
        size="s"
        color="text"
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick.bind(this)}>
        Rows per page: 50
      </EuiButtonEmpty>
    );

    const items = [
      <EuiContextMenuItem
        key="10 rows"
        icon="empty"
        onClick={() => {
          this.closePopover();
          window.alert('10 rows');
        }}>
        10 rows
      </EuiContextMenuItem>,
      <EuiContextMenuItem
        key="20 rows"
        icon="empty"
        onClick={() => {
          this.closePopover();
          window.alert('20 rows');
        }}>
        20 rows
      </EuiContextMenuItem>,
      <EuiContextMenuItem
        key="50 rows"
        icon="check"
        onClick={() => {
          this.closePopover();
          window.alert('50 rows');
        }}>
        50 rows
      </EuiContextMenuItem>,
      <EuiContextMenuItem
        key="100 rows"
        icon="empty"
        onClick={() => {
          this.closePopover();
          window.alert('100 rows');
        }}>
        100 rows
      </EuiContextMenuItem>,
    ];

    return (
      <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiPopover
            id="customizablePagination"
            button={button}
            isOpen={this.state.isPopoverOpen}
            closePopover={this.closePopover.bind(this)}
            panelPaddingSize="none">
            <EuiContextMenuPanel items={items} />
          </EuiPopover>
        </EuiFlexItem>

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

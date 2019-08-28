import React, { Component } from 'react';

import {
  EuiButtonEmpty,
  EuiContextMenuPanel,
  EuiContextMenuItem,
  EuiPopover,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
    };
  }

  onButtonClick = () => {
    this.setState(prevState => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  render() {
    const button = (
      <EuiButtonEmpty
        size="s"
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick}>
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
      <EuiPopover
        id="singlePanel"
        button={button}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}
        panelPaddingSize="none"
        anchorPosition="downLeft">
        <EuiContextMenuPanel items={items} />
      </EuiPopover>
    );
  }
}

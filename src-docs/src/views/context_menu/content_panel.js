import React, { Component } from 'react';

import {
  EuiButton,
  EuiContextMenuPanel,
  EuiPopover,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.interval = undefined;

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
      <EuiButton
        size="s"
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick}>
        Click to show some content
      </EuiButton>
    );

    return (
      <EuiPopover
        id="contentPanel"
        button={button}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}
        panelPaddingSize="s"
        anchorPosition="downLeft">
        <EuiContextMenuPanel>
          This context menu doesn&#39;t render items, it passes a child instead.
        </EuiContextMenuPanel>
      </EuiPopover>
    );
  }
}

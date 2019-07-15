import React, { Component } from 'react';

import { EuiButton, EuiPopover } from '../../../../src/components';

export default class PopoverContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
    };
  }

  onButtonClick = () => {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  setPanelRef = node => (this.panel = node);

  render() {
    const button = (
      <EuiButton onClick={this.onButtonClick} fullWidth>
        This button is expanded
      </EuiButton>
    );

    return (
      <EuiPopover
        button={button}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}
        display="block">
        <div>This is a popover</div>
      </EuiPopover>
    );
  }
}

import React, { Component } from 'react';

import { EuiPopover, EuiButton } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
    };
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

  render() {
    return (
      <EuiPopover
        id="popoverPanelClassName"
        ownFocus
        button={
          <EuiButton
            iconType="arrowDown"
            iconSide="right"
            onClick={this.onButtonClick.bind(this)}>
            Turn padding off and apply a custom class
          </EuiButton>
        }
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover.bind(this)}
        panelClassName="yourClassNameHere"
        panelPaddingSize="none">
        This should have no padding, and if you inspect, also a custom class.
      </EuiPopover>
    );
  }
}

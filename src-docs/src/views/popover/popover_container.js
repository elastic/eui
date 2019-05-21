import React, { Component } from 'react';

import {
  EuiButton,
  EuiCode,
  EuiPanel,
  EuiPopover,
  EuiSpacer,
} from '../../../../src/components';

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
      <EuiButton
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick}
        style={{ position: 'relative', left: 50 }}>
        Show constrained popover
      </EuiButton>
    );

    return (
      <EuiPanel panelRef={this.setPanelRef}>
        <EuiPopover
          id="popover"
          button={button}
          isOpen={this.state.isPopoverOpen}
          closePopover={this.closePopover}
          container={this.panel}>
          <div>
            Popover is positioned <EuiCode>downCenter</EuiCode> but constrained
            to fit within the panel.
          </div>
        </EuiPopover>

        {/* create adequate room for the popover */}
        <EuiSpacer size="xxl" />
        <EuiSpacer size="xxl" />
      </EuiPanel>
    );
  }
}

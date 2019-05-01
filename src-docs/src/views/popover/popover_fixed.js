import React, { Component } from 'react';

import { EuiButton, EuiPopover } from '../../../../src/components';

export default class PopoverContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExampleShown: false,
      isPopoverOpen: false,
    };
  }

  toggleExample = () =>
    this.setState(({ isExampleShown }) => ({
      isExampleShown: !isExampleShown,
    }));

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
        style={{ background: 'white' }}>
        Show fixed popover
      </EuiButton>
    );

    return (
      <React.Fragment>
        <EuiButton onClick={this.toggleExample}>Toggle Example</EuiButton>
        {this.state.isExampleShown && (
          <EuiPopover
            button={button}
            isOpen={this.state.isPopoverOpen}
            closePopover={this.closePopover}
            style={{ position: 'fixed', bottom: 50, right: 50 }}
            repositionOnScroll={true}>
            <div>This popover scrolls with the button element!</div>
          </EuiPopover>
        )}
      </React.Fragment>
    );
  }
}

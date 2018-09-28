import React, { Component } from 'react';
import { EuiPopover, EuiButton, EuiSpacer } from '../../../../src/components';

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

  open = () => {
    this.setState({ isPopoverOpen: true });
  };

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  render() {
    const button = (
      <EuiButton iconType="arrowDown" iconSide="right" onClick={this.onButtonClick.bind(this)}>
        Show popover
      </EuiButton>
    );

    return (
      <div>
        <div>
          <EuiPopover
            id="popover"
            button={button}
            isOpen={this.state.isPopoverOpen}
            closePopover={this.closePopover.bind(this)}
          >
            <h1>This one!</h1>
            <div style={{ width: '300px' }}>
              Popover content that&rsquo;s wider than the default width
            </div>
          </EuiPopover>
        </div>
        <EuiSpacer size="l" />
        <a onClick={this.open}>Secondary popover trigger</a>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { EuiPopover, EuiButton, EuiSpacer, EuiButtonEmpty } from '../../../../src/components';

export default class SecondaryTrigger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
    };
  }

  openPopover = () => {
    this.setState({ isPopoverOpen: true });
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  }

  render() {
    const button = (
      <EuiButton iconType="arrowDown" iconSide="right" onClick={this.openPopover}>
        Open this popover
      </EuiButton>
    );

    return (
      <div>
        <div>
          <EuiPopover
            id="popover"
            button={button}
            isOpen={this.state.isPopoverOpen}
            closePopover={this.closePopover}
          >
            <div>
              Some regular popover content
            </div>
          </EuiPopover>
        </div>
        <EuiSpacer size="l" />
        <EuiSpacer size="l" />
        <EuiSpacer size="l" />
        <EuiButtonEmpty onClick={this.openPopover}>Secondary popover trigger</EuiButtonEmpty>
      </div>
    );
  }
}
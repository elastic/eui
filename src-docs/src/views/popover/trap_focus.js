import React, { Component } from 'react';

import {
  EuiButton,
  EuiFormRow,
  EuiPopover,
  EuiSpacer,
  EuiSwitch,
} from '../../../../src/components';

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
    const button = (
      <EuiButton
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick.bind(this)}>
        Show popover
      </EuiButton>
    );

    return (
      <EuiPopover
        ownFocus
        button={button}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover.bind(this)}
        initialFocus="[id=asdf2]">
        <EuiFormRow
          label="Generate a public snapshot?"
          id="asdf"
          hasChildLabel={false}>
          <EuiSwitch
            name="switch"
            label="Snapshot data"
            checked={true}
            onChange={() => {}}
          />
        </EuiFormRow>

        <EuiFormRow label="Include the following in the embed" id="asdf2">
          <EuiSwitch
            name="switch"
            label="Current time range"
            checked={true}
            onChange={() => {}}
          />
        </EuiFormRow>

        <EuiSpacer />

        <EuiButton fill>Copy IFRAME code</EuiButton>
      </EuiPopover>
    );
  }
}

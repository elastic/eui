import React, {
  Component,
} from 'react';

import {
  EuiButton,
  EuiFormRow,
  EuiPopover,
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
        onClick={this.onButtonClick.bind(this)}
      >
        Show popover
      </EuiButton>
    );

    return (
      <EuiPopover
        id="trapFocus"
        ownFocus
        button={button}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover.bind(this)}
      >
        <EuiFormRow
          label="Generate a public snapshot?"
        >
          <EuiSwitch
            name="switch"
            id="asdf"
            label="Snapshot data"
          />
        </EuiFormRow>

        <EuiFormRow
          label="Include the following in the embed"
        >
          <EuiSwitch
            name="switch"
            id="asdf2"
            label="Current time range"
          />
        </EuiFormRow>

        <EuiButton fill>Copy IFRAME code</EuiButton>
      </EuiPopover>
    );
  }
}

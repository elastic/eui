import React, { Component } from 'react';

import { EuiTour } from '../../../../src/components/tour';
import { EuiButton } from '../../../../src/components/button';

const steps = [
  {
    name: "Step 1",
    body: `<p>Some instructions</p>`,
    attachedToId: "myButtonId1",
    isActive: true,
  },
  {
    name: "Step 2",
    body: `<p>More instructions</p>`,
    attachedToId: "myButtonId2",
    isActive: false,
  },
];

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTourPopoverOpen: true,
    };
  }

  onButtonClick() {
    this.setState({
      isTourPopoverOpen: !this.state.isTourPopoverOpen,
    });
  }

  closeTourPopover() {
    this.setState({
      isTourPopoverOpen: false,
    });
  }

  render() {
    const body = (
      <p>Welcome to EuiTour! First things first, click this button.</p>
    );

    const button = (
      <EuiButton
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick.bind(this)}>
        Do this first
      </EuiButton>
    );

    return (
      <EuiTour
        // TODO button will become something like attachedToId to use elements other than buttons as the anchor
        button={button}
        children={body}
        closePopover={this.closeTourPopover.bind(this)}
        isOpen={this.state.isTourPopoverOpen}
        minWidth={360}
        subtitle="Demo tour"
        title="Step 1" />
    )
  }
};

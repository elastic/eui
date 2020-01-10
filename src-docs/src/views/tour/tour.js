import React, { Component } from 'react';

import { EuiTour } from '../../../../src/components/tour';

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
  render() {
    const body = (
      <p>Welcome to EuiTour! First things first, click this button.</p>
    );

    return (
      <EuiTour
        children={body}
        minWidth={360}
        subtitle="Demo tour"
        title="Step 1" />
    )
  }
};

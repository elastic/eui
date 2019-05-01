/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';

import { render, unmountComponentAtNode } from 'react-dom';

import { EuiWrappingPopover } from '../../../../src/components';

class PopoverApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
    };
  }

  componentDidMount() {
    this.props.anchor.addEventListener('click', this.onButtonClick);
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

  render() {
    return (
      <EuiWrappingPopover
        id="popover"
        button={this.props.anchor}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}>
        <div>Normal JSX content populates the popover.</div>
      </EuiWrappingPopover>
    );
  }
}

export default class extends Component {
  componentDidMount() {
    const thisAnchor = document.querySelector('#popoverAnchorButton');

    // `container` can be created here or use an existing DOM element
    // the popover DOM is positioned independently of where the container exists
    this.container = document.createElement('div');
    document.body.appendChild(this.container);

    render(<PopoverApp anchor={thisAnchor} />, this.container);
  }

  componentWillUnmount() {
    unmountComponentAtNode(this.container);
  }

  render() {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: `
<button id="popoverAnchorButton" class="euiButton euiButton--primary">
  <span class="euiButton__content">This is an HTML button</span>
</button>
      `,
        }}
      />
    );
  }
}

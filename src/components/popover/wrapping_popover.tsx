import React, { Component } from 'react';
import { EuiPopover, Props as EuiPopoverProps } from './popover';
import { EuiPortal } from '../portal';

interface Props extends EuiPopoverProps {
  button: HTMLElement;
}

/**
 * Injects the EuiPopover next to the button via EuiPortal
 * then the button element is moved into the popover dom.
 * On unmount, the button is moved back to its original location.
 */
export class EuiWrappingPopover extends Component<Props> {
  private portal: HTMLElement | null = null;
  private anchor: HTMLElement | null = null;

  componentDidMount() {
    if (this.anchor) {
      this.anchor.insertAdjacentElement('beforebegin', this.props.button);
    }
  }

  componentWillUnmount() {
    if (this.props.button.parentNode) {
      if (this.portal) {
        this.portal.insertAdjacentElement('beforebegin', this.props.button);
      }
    }
  }

  setPortalRef = (node: HTMLElement | null) => {
    this.portal = node;
  };

  setAnchorRef = (node: HTMLElement | null) => {
    this.anchor = node;
  };

  render() {
    const { button, ...rest } = this.props;

    return (
      <EuiPortal
        portalRef={this.setPortalRef}
        insert={{ sibling: this.props.button, position: 'after' }}>
        <EuiPopover
          {...rest}
          button={
            <div
              ref={this.setAnchorRef}
              className="euiWrappingPopover__anchor"
            />
          }
        />
      </EuiPortal>
    );
  }
}

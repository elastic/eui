import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { EuiPopover } from './popover';
import { EuiPortal } from '../portal';

/**
 * Injects the EuiPopover next to the button via EuiPortal
 * then the button element is moved into the popover dom.
 * On unmount, the button is moved back to its original location.
 */
export class EuiWrappingPopover extends Component {
  constructor(...args) {
    super(...args);

    this.portal = null;
    this.contentParent = this.props.button.parentNode;
  }

  componentDidMount() {
    const thisDomNode = findDOMNode(this);
    const placeholderAnchor = thisDomNode.querySelector('.euiWrappingPopover__anchor');

    placeholderAnchor.insertAdjacentElement(
      'beforebegin',
      this.props.button
    );
  }

  componentWillUnmount() {
    if (this.props.button.parentNode) {
      this.portal.insertAdjacentElement(
        'beforebegin',
        this.props.button
      );
    }
  }

  setPortalRef = node => {
    this.portal = node;
  };

  render() {
    const {
      button, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;
    return (
      <EuiPortal
        portalRef={this.setPortalRef}
        insert={{ sibling: this.props.button, position: 'after' }}
      >
        <EuiPopover
          {...rest}
          button={<div className="euiWrappingPopover__anchor"/>}
        />
      </EuiPortal>
    );
  }
}

EuiWrappingPopover.propTypes = {
  button: PropTypes.instanceOf(HTMLElement),
};

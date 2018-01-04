/**
 * NOTE: We can't test this component because Enzyme doesn't support rendering
 * into portals.
 */

import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

export class EuiOverlayMask extends Component {
  constructor(props) {
    super(props);

    const {
      className,
      children, // eslint-disable-line no-unused-vars
      onClick,
      ...rest
    } = this.props;

    this.overlayMaskNode = document.createElement('div');
    this.overlayMaskNode.className = classNames(
      'euiOverlayMask',
      className
    );
    if (onClick) {
      this.overlayMaskNode.addEventListener('click', onClick);
    }
    Object.keys(rest).forEach((key) => {
      if (typeof rest[key] !== 'string') {
        throw new Error(`Unhandled property type. EuiOverlayMask property ${key} is not a string.`);
      }
      this.overlayMaskNode.setAttribute(key, rest[key]);
    });
  }

  componentDidMount() {
    document.body.classList.add('euiBody-hasOverlayMask');
    document.body.appendChild(this.overlayMaskNode);
  }

  componentWillUnmount() {
    document.body.classList.remove('euiBody-hasOverlayMask');

    if (this.props.onClick) {
      this.overlayMaskNode.removeEventListener('click', this.props.onClick);
    }
    document.body.removeChild(this.overlayMaskNode);
    this.overlayMaskNode = null;
  }

  render() {
    return createPortal(
      this.props.children,
      this.overlayMaskNode
    );
  }
}

EuiOverlayMask.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

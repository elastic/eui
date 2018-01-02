import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import classnames from 'classnames';

export class EuiOverlayMask extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.classList.add('euiBody-hasOverlayMask');
  }

  componentWillUnmount() {
    document.body.classList.remove('euiBody-hasOverlayMask');

    if (this.overlayMaskNode) {
      document.body.removeChild(this.overlayMaskNode);
    }
    this.overlayMaskNode = null;
  }

  render() {
    const {
      className,
      children,
      ...rest
    } = this.props;

    if (!this.overlayMaskNode) {
      this.overlayMaskNode = document.createElement('div');
      this.overlayMaskNode.className = classnames(
        'euiOverlayMask',
        className
      );
      Object.keys(rest).forEach((key) => {
        this.overlayMaskNode.setAttribute(key, rest[key]);
      });
      document.body.appendChild(this.overlayMaskNode);
    }

    return createPortal(
      children,
      this.overlayMaskNode
    );
  }
}

EuiOverlayMask.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

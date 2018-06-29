/**
 * NOTE: We can't test this component because Enzyme doesn't support rendering
 * into portals.
 */

import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

export class EuiPortal extends Component {
  constructor(props) {
    super(props);

    const {
      children, // eslint-disable-line no-unused-vars
    } = this.props;

    this.portalNode = document.createElement('div');
    document.body.appendChild(this.portalNode);
  }

  componentWillUnmount() {
    document.body.removeChild(this.portalNode);
    this.portalNode = null;
  }

  render() {
    return createPortal(
      this.props.children,
      this.portalNode
    );
  }
}

EuiPortal.propTypes = {
  children: PropTypes.node,
};

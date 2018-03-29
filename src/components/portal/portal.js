/**
 * NOTE: We can't test this component because Enzyme doesn't support rendering
 * into portals.
 *
 * NOTE: You **cannot** immediately return a EuiPortal from within the render method! This is
 * because the portalNode doesn't exist until **after** it's mounted. In its current form, EuiPortal
 * can only be used by components which are hidden or otherwise not rendered initially, like
 * dropdowns and modals. If we want to support components wrapped in EuiPortal being visible
 * immediately we can update EuiPortal to accept a DOM node as a prop, which should solve the problem.
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
  }

  componentDidMount() {
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

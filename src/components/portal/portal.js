/**
 * NOTE: We can't test this component because Enzyme doesn't support rendering
 * into portals.
 */

import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

export const insertPositions = {
  'after': 'afterend',
  'before': 'beforebegin',
};

export const INSERT_POSITIONS = Object.keys(insertPositions);

export class EuiPortal extends Component {
  constructor(props) {
    super(props);

    const {
      children, // eslint-disable-line no-unused-vars
      insert,
    } = this.props;

    this.portalNode = document.createElement('div');

    if (insert == null) {
      // no insertion defined, append to body
      document.body.appendChild(this.portalNode);
    } else {
      // inserting before or after an element
      insert.sibling.insertAdjacentElement(
        insertPositions[insert.position],
        this.portalNode
      );
    }
  }

  componentDidMount() {
    this.updatePortalRef();
  }

  componentWillUnmount() {
    this.portalNode.parentNode.removeChild(this.portalNode);
    this.portalNode = null;
    this.updatePortalRef();
  }

  updatePortalRef() {
    if (this.props.portalRef) {
      this.props.portalRef(this.portalNode);
    }
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
  /** `{sibling: HTMLElement, position: 'before'|'after'}` */
  insert: PropTypes.shape({
    sibling: PropTypes.instanceOf(HTMLElement).isRequired,
    position: PropTypes.oneOf(INSERT_POSITIONS).isRequired,
  }),
  portalRef: PropTypes.func,
};

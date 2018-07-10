/**
 * NOTE: We can't test this component because Enzyme doesn't support rendering
 * into portals.
 */

import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal, findDOMNode } from 'react-dom';

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
      findDOMNode(insert.sibling).insertAdjacentElement(
        insertPositions[insert.position],
        this.portalNode
      );
    }
  }

  componentWillUnmount() {
    this.portalNode.parentNode.removeChild(this.portalNode);
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
  insert: PropTypes.shape({
    sibling: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.instanceOf(HTMLElement)
    ]).isRequired,
    position: PropTypes.oneOf(INSERT_POSITIONS)
  })
};

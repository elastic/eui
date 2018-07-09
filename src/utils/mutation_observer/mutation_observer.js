import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

/**
 * EuiMutationObserver watches its children with the MutationObserver API
 * There are a couple constraints which inform how this component works
 *
 * 1. React refs cannot be added to functional components
 * 2. findDOMNode will only return the first element from an array of children
 *    or from a fragment.
 *
 * Because of #1, we can't blindly attach refs to children and expect them to work in all cases
 * Because of #2, we can't observe all children for mutations, only the first
 *
 * When only one child is passed its found by findDOMNode and the mutation observer is attached
 * When children is an array the render function maps over them wrapping each child
 *   with another EuiMutationObserver, e.g.:
 *
 *   <Observer>
 *     <div>First</div>
 *     <div>Second</div>
 *   </Observer>
 *
 *   becomes
 *
 *   <Observer>
 *     <Observer><div>First</div></Observer>
 *     <Observer><div>Second</div></Observer>
 *   </Observer>
 *
 *   each descendant-Observer has only one child and can independently watch for mutations,
 *   triggering the parent's onMutation callback when an event is observed
 */
class EuiMutationObserver extends Component {
  constructor(...args) {
    super(...args);
    this.childNode = null;
    this.observer = null;
  }

  componentDidMount() {
    this.updateChildNode();
  }

  updateChildNode() {
    if (Array.isArray(this.props.children) === false) {
      const currentNode = findDOMNode(this);
      if (this.childNode !== currentNode) {
        // if there's an existing observer disconnect it
        if (this.observer != null) {
          this.observer.disconnect();
          this.observer = null;
        }

        this.childNode = currentNode;
        if (this.childNode != null) {
          this.observer = new MutationObserver(this.onMutation);
          this.observer.observe(this.childNode, this.props.observerOptions);
        }
      }
    }
  }

  componentDidUpdate() {
    // in case the child element was changed
    this.updateChildNode();
  }

  onMutation = (...args) => {
    this.props.onMutation(...args);
  }

  render() {
    const { children, ...rest } = this.props;
    if (Array.isArray(children)) {
      return React.Children.map(
        children,
        child => (
          <EuiMutationObserver {...rest}>
            {child}
          </EuiMutationObserver>
        )
      );
    } else {
      return children;
    }
  }
}

EuiMutationObserver.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  observerOptions: PropTypes.shape({ // matches a [MutationObserverInit](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit)
    attributeFilter: PropTypes.arrayOf(PropTypes.string),
    attributeOldValue: PropTypes.bool,
    attributes: PropTypes.bool,
    characterData: PropTypes.bool,
    characterDataOldValue: PropTypes.bool,
    childList: PropTypes.bool,
    subtree: PropTypes.bool,
  }).isRequired,
  onMutation: PropTypes.func.isRequired,
};

export { EuiMutationObserver };

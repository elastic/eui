import { Component, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

class EuiMutationObserver extends Component {
  constructor(...args) {
    super(...args);
    this.childrenRef = null;
    this.observer = null;
  }

  onMutation = (...args) => {
    console.log('::onMutation');
    this.props.onMutation(...args);
  }

  updateRef = ref => {
    if (this.props.children.ref) {
      this.props.children.ref(ref);
    }

    if (this.observer != null) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (ref != null) {
      const node = findDOMNode(ref);
      this.observer = new MutationObserver(this.onMutation);
      this.observer.observe(node, this.props.observerOptions);
    }
  }

  render() {
    const children = cloneElement(
      this.props.children,
      {
        ...this.props.children.props,
        ref: this.updateRef,
      }
    );
    return children;
  }
}

EuiMutationObserver.propTypes = {
  children: PropTypes.element.isRequired,
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

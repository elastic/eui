import { Component } from 'react';
import PropTypes from 'prop-types';

class EuiMutationObserver extends Component {
  constructor(...args) {
    super(...args);
    this.childNode = null;
    this.observer = null;
  }

  componentDidMount() {
    if (this.childNode == null) {
      throw new Error('EuiMutationObserver did not receive a ref');
    }
  }

  updateChildNode = ref => {
    if (this.childNode === ref) return; // node hasn't changed

    this.childNode = ref;

    // if there's an existing observer disconnect it
    if (this.observer != null) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.childNode != null) {
      this.observer = new MutationObserver(this.onMutation);
      this.observer.observe(this.childNode, this.props.observerOptions);
    }
  }

  onMutation = (...args) => {
    this.props.onMutation(...args);
  }

  render() {
    return this.props.children(this.updateChildNode);
  }
}

EuiMutationObserver.propTypes = {
  children: PropTypes.func.isRequired,
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

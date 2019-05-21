import { Component } from 'react';
import PropTypes from 'prop-types';

class EuiObserver extends Component {
  constructor(...args) {
    super(...args);
    this.name = 'EuiObserver';
    this.childNode = null;
    this.observer = null;
  }

  componentDidMount() {
    if (this.childNode == null) {
      throw new Error(`${this.name} did not receive a ref`);
    }
  }

  componentWillUnmount() {
    if (this.observer != null) {
      this.observer.disconnect();
    }
  }

  updateChildNode = ref => {
    if (this.childNode === ref) return; // node hasn't changed

    // if there's an existing observer disconnect it
    if (this.observer != null) {
      this.observer.disconnect();
      this.observer = null;
    }

    this.childNode = ref;

    if (this.childNode != null) {
      this.beginObserve();
    }
  };

  beginObserve = () => {
    throw new Error('EuiObserver has no default observation method');
  };

  render() {
    return this.props.children(this.updateChildNode);
  }
}

EuiObserver.propTypes = {
  children: PropTypes.func.isRequired,
};

export { EuiObserver };

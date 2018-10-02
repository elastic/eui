import {
  cloneElement,
  Component,
} from 'react';
import PropTypes from 'prop-types';

export class EuiValidatableControl extends Component {
  static propTypes = {
    children: PropTypes.node,
    isInvalid: PropTypes.bool,
  }

  updateValidity() {
    if (this.control == null || typeof this.control.setCustomValidity !== 'function') {
      return; // jsdom doesn't polyfill this for the server-side
    }

    if (this.props.isInvalid) {
      this.control.setCustomValidity('Invalid');
    } else {
      this.control.setCustomValidity('');
    }
  }

  componentDidMount() {
    this.updateValidity();
  }

  componentDidUpdate() {
    this.updateValidity();
  }

  setRef = node => {
    this.control = node;

    // Call the original ref, if any
    const { ref } = this.props.children;
    if (typeof ref === 'function') {
      ref(node);
    }
  }

  render() {
    return cloneElement(
      this.props.children,
      {
        ref: this.setRef,
      }
    );
  }
}

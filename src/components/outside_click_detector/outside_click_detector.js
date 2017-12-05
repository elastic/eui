import {
  Children,
  cloneElement,
  Component,
} from 'react';
import PropTypes from 'prop-types';

export class EuiOutsideClickDetector extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onOutsideClick: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
  }

  onClickOutside = event => {
    const {
      isDisabled,
      onOutsideClick,
    } = this.props;

    if (isDisabled) {
      return;
    }

    if (!this.wrapperRef) {
      return;
    }

    if (this.wrapperRef === event.target) {
      return;
    }

    if (this.wrapperRef.contains(event.target)) {
      return;
    }

    onOutsideClick();
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside);
  }

  render() {
    const props = ({ ...this.props.children.props, ...{
      ref: node => {
        this.wrapperRef = node;
        if (this.props.children.ref) {
          this.props.children.ref(node);
        }
      },
    } });

    const child = Children.only(this.props.children);
    return cloneElement(child, props);
  }
}

import {
  Children,
  cloneElement,
  Component,
} from 'react';
import PropTypes from 'prop-types';
import { htmlIdGenerator } from '../../services/accessibility';

export class EuiOutsideClickDetector extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onOutsideClick: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
  }

  constructor(...args) {
    super(...args);

    // the id is used to identify which EuiOutsideClickDetector
    // is the source of a click event; as the click event bubbles
    // up and reaches the click detector's child component the
    // id value is stamped on the event. This id is inspected
    // in the document's click handler, and if the id doesn't
    // exist or doesn't match this detector's id, then trigger
    // the outsideClick callback.
    //
    // Taking this approach instead of checking if the event's
    // target element exists in this component's DOM sub-tree is
    // necessary for handling clicks originating from children
    // rendered through React's portals (EuiPortal). The id tracking
    // works because React guarantees the event bubbles through the
    // virtual DOM and executes EuiClickDetector's onClick handler,
    // stamping the id even though the event originates outside
    // this component's reified DOM tree.
    this.id = htmlIdGenerator()();
  }

  onClickOutside = event => {
    const {
      isDisabled,
      onOutsideClick,
    } = this.props;

    if (isDisabled) {
      return;
    }

    if (event.euiGeneratedBy && event.euiGeneratedBy.includes(this.id)) {
      return;
    }

    onOutsideClick(event);
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside);
  }

  onChildClick = event => {
    // to support nested click detectors, build an array
    // of detector ids that have been encountered
    if (event.nativeEvent.hasOwnProperty('euiGeneratedBy')) {
      event.nativeEvent.euiGeneratedBy.push(this.id);
    } else {
      event.nativeEvent.euiGeneratedBy = [this.id];
    }
    if (this.props.onClick) this.props.onClick(event);
  }

  render() {
    const props = ({ ...this.props.children.props, ...{
      onClick: this.onChildClick,
    } });

    const child = Children.only(this.props.children);
    return cloneElement(child, props);
  }
}

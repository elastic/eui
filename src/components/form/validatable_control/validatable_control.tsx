import { Children, cloneElement, Component, ReactElement } from 'react';
import { CommonProps } from '../../common';

export interface HTMLConstraintValidityElement extends Element {
  setCustomValidity: (error: string) => void;
}

export interface ReactElementWithRef extends ReactElement {
  ref?: (element: HTMLConstraintValidityElement) => void;
}

export interface EuiValidatableControlProps {
  isInvalid?: boolean;
  children: ReactElementWithRef;
}

export class EuiValidatableControl extends Component<
  CommonProps & EuiValidatableControlProps
> {
  private control?: HTMLConstraintValidityElement;

  updateValidity() {
    if (
      this.control == null ||
      typeof this.control.setCustomValidity !== 'function'
    ) {
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

  setRef = (element: HTMLConstraintValidityElement) => {
    this.control = element;

    // Call the original ref, if any
    const { ref } = this.props.children;
    if (typeof ref === 'function') {
      ref(element);
    }
  };

  render() {
    const child = Children.only(this.props.children);
    return cloneElement(child, {
      ref: this.setRef,
    });
  }
}

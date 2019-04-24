import {
  Children,
  cloneElement,
  Component,
  ReactElement,
  ReactNode,
} from 'react';
import { CommonProps } from '../../common';

export type HTMLConstraintValidityElement =
  | HTMLButtonElement
  | HTMLFieldSetElement
  | HTMLInputElement
  | HTMLObjectElement
  | HTMLOutputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | Element & { setCustomValidity?: any };

export type EuiNodeWithRef = ReactNode & {
  ref?: (node: ReactNode) => void;
};

export interface EuiValidatableControlProps {
  isInvalid?: boolean;
  children?: EuiNodeWithRef;
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

  setRef = (node: HTMLConstraintValidityElement) => {
    this.control = node;

    // Call the original ref, if any
    const { ref } = this.props.children as EuiNodeWithRef;
    if (typeof ref === 'function') {
      ref(node);
    }
  };

  render() {
    const child = Children.only(this.props.children);
    return cloneElement(child as ReactElement<any>, {
      ref: this.setRef,
    });
  }
}

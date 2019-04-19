/**
 * NOTE: We can't test this component because Enzyme doesn't support rendering
 * into portals.
 */

import { Component, HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { CommonProps } from '../common';

export interface EuiOverlayMaskProps {
  onClick?: () => void;
}

export type Props = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  EuiOverlayMaskProps;

export class EuiOverlayMask extends Component<Props> {
  private overlayMaskNode?: HTMLDivElement;

  constructor(props: Props) {
    super(props);

    const { className, children, onClick, ...rest } = this.props;

    this.overlayMaskNode = document.createElement('div');
    this.overlayMaskNode.className = classNames('euiOverlayMask', className);
    if (onClick) {
      this.overlayMaskNode.addEventListener('click', onClick);
    }
    interface RestType {
      [key: string]: any;
    }
    Object.keys(rest).forEach((key: string) => {
      if (typeof (rest as RestType)[key] !== 'string') {
        throw new Error(
          `Unhandled property type. EuiOverlayMask property ${key} is not a string.`
        );
      }
      this.overlayMaskNode!.setAttribute(key, (rest as RestType)[key]);
    });

    document.body.appendChild(this.overlayMaskNode);
  }

  componentDidMount() {
    document.body.classList.add('euiBody-hasOverlayMask');
  }

  componentWillUnmount() {
    document.body.classList.remove('euiBody-hasOverlayMask');

    if (this.props.onClick) {
      this.overlayMaskNode!.removeEventListener('click', this.props.onClick);
    }
    document.body.removeChild(this.overlayMaskNode!);
    this.overlayMaskNode = undefined;
  }

  render() {
    return createPortal(this.props.children, this.overlayMaskNode!);
  }
}

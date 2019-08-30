import React, {
  MouseEventHandler,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
  Ref,
} from 'react';
import classNames from 'classnames';
import { ExclusiveUnion } from '../common';
import { getSecureRelForTarget } from '../../services';

export interface EuiTabProps {
  isSelected?: boolean;
  disabled?: boolean;
}

type EuiTabPropsForAnchor = EuiTabProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    buttonRef?: Ref<HTMLAnchorElement>;
  };

type EuiTabPropsForButton = EuiTabProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    buttonRef?: Ref<HTMLButtonElement>;
  };

export type Props = ExclusiveUnion<EuiTabPropsForAnchor, EuiTabPropsForButton>;

export const EuiTab: FunctionComponent<Props> = ({
  isSelected,
  onClick,
  children,
  className,
  disabled,
  buttonRef,
  href,
  target,
  rel,
  ...rest
}) => {
  const classes = classNames('euiTab', className, {
    'euiTab-isSelected': isSelected,
    'euiTab-isDisabled': disabled,
    'euiTab-isLink': href && !disabled,
  });

  //  <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  //  this is a button and piggyback off its disabled styles.
  if (href && !disabled) {
    const secureRel = getSecureRelForTarget({ href, target, rel });

    return (
      <a
        className={classes}
        href={href}
        target={target}
        rel={secureRel}
        ref={buttonRef as Ref<HTMLAnchorElement>}
        {...rest as AnchorHTMLAttributes<HTMLAnchorElement>}>
        <span className="euiTab__content">{children}</span>
      </a>
    );
  }

  return (
    <button
      role="tab"
      aria-selected={!!isSelected}
      type="button"
      className={classes}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
      {...rest as ButtonHTMLAttributes<HTMLButtonElement>}>
      <span className="euiTab__content">{children}</span>
    </button>
  );
};

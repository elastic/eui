import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
} from 'react';
import classNames from 'classnames';
import { EuiIcon } from '../icon';
import { CommonProps, ExclusiveUnion, keysOf } from '../common';
import { getSecureRelForTarget } from '../../services';

export type EuiLinkType = 'button' | 'reset' | 'submit';
export type EuiLinkColor =
  | 'primary'
  | 'subdued'
  | 'secondary'
  | 'accent'
  | 'danger'
  | 'warning'
  | 'text'
  | 'ghost';

const colorsToClassNameMap: { [color in EuiLinkColor]: string } = {
  primary: 'euiLink--primary',
  subdued: 'euiLink--subdued',
  secondary: 'euiLink--secondary',
  accent: 'euiLink--accent',
  danger: 'euiLink--danger',
  warning: 'euiLink--warning',
  ghost: 'euiLink--ghost',
  text: 'euiLink--text',
};

export const COLORS = keysOf(colorsToClassNameMap);

export interface LinkButtonProps {
  type?: EuiLinkType;
  color?: EuiLinkColor;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Set to true to show an icon indicating that it is an external link.
   */
  external?: boolean;
}

export type EuiLinkButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> &
  LinkButtonProps;

export interface LinkAnchorProps {
  type?: EuiLinkType;
  color?: EuiLinkColor;
}

export type EuiLinkAnchorProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkAnchorProps;

export type EuiLinkProps = ExclusiveUnion<
  EuiLinkButtonProps,
  EuiLinkAnchorProps
>;

const EuiLink = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  EuiLinkProps
>(
  (
    {
      children,
      color = 'primary',
      className,
      href,
      external,
      target,
      rel,
      type = 'button',
      onClick,
      ...rest
    },
    ref
  ) => {
    const classes = classNames(
      'euiLink',
      colorsToClassNameMap[color],
      className
    );

    if (href === undefined) {
      const buttonProps = {
        className: classes,
        type,
        onClick,
        ...rest,
      };

      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          {...buttonProps as EuiLinkButtonProps}>
          {children}
          {external ? <EuiIcon type="popout" /> : undefined}
        </button>
      );
    }

    const secureRel = getSecureRelForTarget({ href, target, rel });

    const anchorProps = {
      className: classes,
      href,
      target,
      rel: secureRel,
      onClick,
      ...rest,
    };

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...anchorProps as EuiLinkAnchorProps}>
        {children}
        {external ? <EuiIcon type="popout" /> : undefined}
      </a>
    );
  }
);

EuiLink.displayName = 'EuiLink';
export { EuiLink };

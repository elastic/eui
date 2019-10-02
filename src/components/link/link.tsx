import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
  forwardRef,
} from 'react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion, keysOf } from '../common';
import { getSecureRelForTarget } from '../../services';

type EuiLinkType = 'button' | 'reset' | 'submit';
type EuiLinkColor =
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

const EuiLink = forwardRef<HTMLAnchorElement | HTMLButtonElement, EuiLinkProps>(
  (
    {
      children,
      color = 'primary',
      className,
      href,
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
      </a>
    );
  }
);

EuiLink.displayName = 'EuiLink';
export { EuiLink };

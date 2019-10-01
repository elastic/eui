import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
  MouseEventHandler,
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

type EuiLinkButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> &
  LinkButtonProps;

export interface LinkAnchorProps {
  type?: EuiLinkType;
  color?: EuiLinkColor;
}

type EuiLinkAnchorProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkAnchorProps;

type Props = ExclusiveUnion<EuiLinkButtonProps, EuiLinkAnchorProps>;

export const EuiLink: FunctionComponent<Props> = ({
  children,
  color = 'primary',
  className,
  href,
  target,
  rel,
  type = 'button',
  onClick,
  ...rest
}) => {
  const classes = classNames('euiLink', colorsToClassNameMap[color], className);

  if (href === undefined) {
    const buttonProps = {
      className: classes,
      type,
      onClick,
      ...rest,
    };

    return <button {...buttonProps as EuiLinkButtonProps}>{children}</button>;
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

  return <a {...anchorProps as EuiLinkAnchorProps}>{children}</a>;
};

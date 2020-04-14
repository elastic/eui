import React, {
  FunctionComponent,
  AnchorHTMLAttributes,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { EuiIcon, IconType } from '../icon';
import { CommonProps } from '../common';
import { getSecureRelForTarget } from '../../services';

export type EuiHeaderLogoProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    rel?: string;
    target?: string;
    iconType?: IconType;
    iconTitle?: string;
    children?: ReactNode;
  };

export const EuiHeaderLogo: FunctionComponent<EuiHeaderLogoProps> = ({
  iconType = 'logoElastic',
  iconTitle = 'Elastic',
  href,
  rel,
  target,
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiHeaderLogo', className);
  const secureRel = getSecureRelForTarget({ href, rel, target });
  return (
    <a
      href={href}
      rel={secureRel}
      target={target}
      className={classes}
      {...rest}>
      <EuiIcon
        aria-label={iconTitle}
        className="euiHeaderLogo__icon"
        size="l"
        type={iconType}
      />

      {children && <span className="euiHeaderLogo__text">{children}</span>}
    </a>
  );
};

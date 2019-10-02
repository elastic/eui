import React, {
  FunctionComponent,
  AnchorHTMLAttributes,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { EuiIcon, IconType } from '../icon';
import { CommonProps } from '../common';

export type EuiHeaderLogoProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    iconType?: IconType;
    iconTitle?: string;
    children?: ReactNode;
  };

export const EuiHeaderLogo: FunctionComponent<EuiHeaderLogoProps> = ({
  iconType = 'logoElastic',
  iconTitle = 'Elastic',
  href,
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiHeaderLogo', className);

  return (
    <a href={href} className={classes} {...rest}>
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

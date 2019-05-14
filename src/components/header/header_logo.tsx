import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { EuiIcon, IconType } from '../icon';
import { CommonProps } from '../common';

export interface EuiHeaderLogoProps {
  href?: string;
  iconType?: IconType;
  children?: ReactNode;
}

export const EuiHeaderLogo: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLAnchorElement> & EuiHeaderLogoProps
> = ({ iconType = 'logoElastic', href, children, className, ...rest }) => {
  const classes = classNames('euiHeaderLogo', className);

  return (
    <a href={href} className={classes} {...rest}>
      <EuiIcon className="euiHeaderLogo__icon" size="l" type={iconType} />

      {children && <span className="euiHeaderLogo__text">{children}</span>}
    </a>
  );
};

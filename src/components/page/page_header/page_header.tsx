import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

export interface EuiPageHeaderProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * Set to false if you don't want the children to stack
   * at small screen sizes.
   */
  responsive?: boolean;
}

export const EuiPageHeader: FunctionComponent<EuiPageHeaderProps> = ({
  children,
  className,
  responsive = true,
  ...rest
}) => {
  const classes = classNames(
    'euiPageHeader',
    {
      'euiPageHeader--responsive': responsive,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

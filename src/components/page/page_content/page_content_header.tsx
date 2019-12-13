import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

export interface EuiPageContentHeaderProps extends CommonProps {
  /**
   * Set to false if you don't want the children to stack
   * at small screen sizes.
   */
  responsive?: boolean;
}

export const EuiPageContentHeader: FunctionComponent<
  EuiPageContentHeaderProps
> = ({ children, className, responsive = true, ...rest }) => {
  const classes = classNames(
    'euiPageContentHeader',
    {
      'euiPageContentHeader--responsive': responsive,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

import React, { SFC, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { EuiIcon } from '../icon';

export interface EuiLoadingKibanaProps {
  size: 'm' | 'l' | 'xl';
}

const sizeToClassNameMap = {
  m: 'euiLoadingKibana--medium',
  l: 'euiLoadingKibana--large',
  xl: 'euiLoadingKibana--xLarge',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const EuiLoadingKibana: SFC<
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiLoadingKibanaProps
> = ({ children, size, className, ...rest }) => {
  const classes = classNames(
    'euiLoadingKibana',
    sizeToClassNameMap[size],
    className
  );

  return (
    <div className={classes} {...rest}>
      <div className="euiLoadingKibana__icon">
        <EuiIcon type="logoKibana" size={size} />
      </div>
      {children}
    </div>
  );
};

EuiLoadingKibana.defaultProps = {
  size: 'm',
};

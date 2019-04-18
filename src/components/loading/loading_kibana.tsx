import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';
import { EuiIcon } from '../icon';

const sizeToClassNameMap = {
  m: 'euiLoadingKibana--medium',
  l: 'euiLoadingKibana--large',
  xl: 'euiLoadingKibana--xLarge',
};

export const SIZES = keysOf(sizeToClassNameMap);

export interface EuiLoadingKibanaProps {
  size?: keyof typeof sizeToClassNameMap;
}

export const EuiLoadingKibana: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiLoadingKibanaProps
> = ({ size = 'm', className, ...rest }) => {
  const classes = classNames(
    'euiLoadingKibana',
    sizeToClassNameMap[size],
    className
  );

  return (
    <span className={classes} {...rest}>
      <span className="euiLoadingKibana__icon">
        <EuiIcon type="logoKibana" size={size} />
      </span>
    </span>
  );
};

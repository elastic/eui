import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiIcon } from '..';

const sizeToClassNameMap = {
  medium: 'euiLoadingKibana--medium',
  large: 'euiLoadingKibana--large',
  xLarge: 'euiLoadingKibana--xLarge',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const EuiLoadingKibana = ({ children, size, className, ...rest }) => {
  const classes = classNames(
    'euiLoadingKibana',
    sizeToClassNameMap[size],
    className,
  );

  return (
    <div
      className={classes}
      {...rest}
    >
      <div className="euiLoadingKibana__icon">
        <EuiIcon type="logoKibana" size={size} />
      </div>
      {children}
    </div>
  );
};

EuiLoadingKibana.propTypes = {
  size: PropTypes.oneOf(SIZES),
};

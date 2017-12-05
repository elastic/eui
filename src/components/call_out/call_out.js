import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import {
  ICON_TYPES,
  EuiIcon,
} from '../icon';

import {
  EuiText,
} from '..';

const colorToClassNameMap = {
  primary: 'euiCallOut--primary',
  success: 'euiCallOut--success',
  warning: 'euiCallOut--warning',
  danger: 'euiCallOut--danger',
};

export const COLORS = Object.keys(colorToClassNameMap);

export const EuiCallOut = ({
  title,
  color,
  iconType,
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiCallOut', colorToClassNameMap[color], className);

  let headerIcon;

  if (iconType) {
    headerIcon = (
      <EuiIcon
        className="euiCallOutHeader__icon"
        type={iconType}
        size="m"
        aria-hidden="true"
      />
    );
  }

  let optionalChildren;
  if (children) {
    optionalChildren = (
      <EuiText size="s">
        {children}
      </EuiText>
    );
  }

  return (
    <div
      className={classes}
      {...rest}
    >
      <div className="euiCallOutHeader">
        {headerIcon}

        <span className="euiCallOutHeader__title">
          {title}
        </span>
      </div>

      {optionalChildren}
    </div>
  );
};

EuiCallOut.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.node,
  iconType: PropTypes.oneOf(ICON_TYPES),
  color: PropTypes.oneOf(COLORS),
};

EuiCallOut.defaultProps = {
  color: 'primary',
};

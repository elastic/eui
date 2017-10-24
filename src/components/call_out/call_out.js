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

const typeToClassNameMap = {
  info: 'kuiCallOut--info',
  success: 'kuiCallOut--success',
  warning: 'kuiCallOut--warning',
  danger: 'kuiCallOut--danger',
};

export const TYPES = Object.keys(typeToClassNameMap);

export const EuiCallOut = ({ title, type, iconType, children, className, ...rest }) => {
  const classes = classNames('kuiCallOut', typeToClassNameMap[type], className);

  let headerIcon;

  if (iconType) {
    headerIcon = (
      <EuiIcon
        className="kuiCallOutHeader__icon"
        type={iconType}
        size="medium"
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
      <div className="kuiCallOutHeader">
        {headerIcon}

        <span className="kuiCallOutHeader__title">
          {title}
        </span>
      </div>

      {optionalChildren}
    </div>
  );
};

EuiCallOut.propTypes = {
  title: PropTypes.node,
  iconType: PropTypes.oneOf(ICON_TYPES),
  type: PropTypes.oneOf(TYPES),
};

EuiCallOut.defaultProps = {
  type: 'info',
};

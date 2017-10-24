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
  info: 'euiToast--info',
  success: 'euiToast--success',
  warning: 'euiToast--warning',
  danger: 'euiToast--danger',
};

export const TYPES = Object.keys(typeToClassNameMap);

export const EuiToast = ({ title, type, iconType, onClose, children, className, ...rest }) => {
  const classes = classNames('euiToast', typeToClassNameMap[type], className);
  const headerClasses = classNames('euiToastHeader', {
    'euiToastHeader--withBody': children,
  });

  let headerIcon;

  if (iconType) {
    headerIcon = (
      <EuiIcon
        className="euiToastHeader__icon"
        type={iconType}
        size="medium"
        aria-hidden="true"
      />
    );
  }

  let closeButton;

  if (onClose) {
    closeButton = (
      <button
        className="euiToast__closeButton"
        aria-label="Dismiss toast"
        onClick={onClose}
      >
        <EuiIcon
          type="cross"
          size="medium"
          aria-hidden="true"
        />
      </button>
    );
  }

  let optionalBody;

  if (children) {
    optionalBody = (
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
      <div className={headerClasses}>
        {headerIcon}

        <span className="euiToastHeader__title">
          {title}
        </span>
      </div>

      {closeButton}
      {optionalBody}
    </div>
  );
};

EuiToast.propTypes = {
  title: PropTypes.node,
  iconType: PropTypes.oneOf(ICON_TYPES),
  type: PropTypes.oneOf(TYPES),
  onClose: PropTypes.func,
};

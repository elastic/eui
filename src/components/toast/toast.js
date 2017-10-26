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
  primary: 'euiToast--primary',
  success: 'euiToast--success',
  warning: 'euiToast--warning',
  danger: 'euiToast--danger',
};

export const COLORS = Object.keys(colorToClassNameMap);

export const EuiToast = ({ title, color, iconType, onClose, children, className, ...rest }) => {
  const classes = classNames('euiToast', colorToClassNameMap[color], className);
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
        type="button"
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
  color: PropTypes.oneOf(COLORS),
  onClose: PropTypes.func,
};

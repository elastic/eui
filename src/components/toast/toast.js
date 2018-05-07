import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiScreenReaderOnly } from '../accessibility';

import {
  ICON_TYPES,
  EuiIcon,
} from '../icon';

import {
  EuiText,
} from '../text';

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
        size="m"
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
        data-test-subj="toastCloseButton"
      >
        <EuiIcon
          type="cross"
          size="m"
          aria-hidden="true"
        />
      </button>
    );
  }

  let optionalBody;

  if (children) {
    optionalBody = (
      <EuiText size="s" className="euiToastBody">
        {children}
      </EuiText>
    );
  }

  return (
    <div
      className={classes}
      aria-live="polite"
      {...rest}
    >
      <EuiScreenReaderOnly>
        <p>A new notification appears</p>
      </EuiScreenReaderOnly>

      <div className={headerClasses} aria-label="Notification">
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
  children: PropTypes.node,
};

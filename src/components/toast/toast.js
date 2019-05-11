import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiScreenReaderOnly } from '../accessibility';
import { EuiI18n } from '../i18n';

import {
  IconPropType,
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
      <EuiI18n token="euiToast.dismissToast" default="Dismiss toast">
        {dismissToast => (
          <button
            type="button"
            className="euiToast__closeButton"
            aria-label={dismissToast}
            onClick={onClose}
            data-test-subj="toastCloseButton"
          >
            <EuiIcon
              type="cross"
              size="m"
              aria-hidden="true"
            />
          </button>
        )}
      </EuiI18n>
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
        <p><EuiI18n token="euiToast.newNotification" default="A new notification appears"/></p>
      </EuiScreenReaderOnly>

      <EuiI18n token="euiToast.notification" default="Notification">
        {notification => (
          <div
            className={headerClasses}
            aria-label={notification}
            data-test-subj="euiToastHeader"
          >
            {headerIcon}

            <span className="euiToastHeader__title">
              {title}
            </span>
          </div>
        )}
      </EuiI18n>

      {closeButton}
      {optionalBody}
    </div>
  );
};

EuiToast.propTypes = {
  title: PropTypes.node,
  iconType: IconPropType,
  color: PropTypes.oneOf(COLORS),
  onClose: PropTypes.func,
  children: PropTypes.node,
};

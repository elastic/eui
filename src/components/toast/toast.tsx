import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf, Omit } from '../common';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiI18n } from '../i18n';

import { IconType, EuiIcon } from '../icon';

import { EuiText } from '../text';

type ToastColor = 'primary' | 'success' | 'warning' | 'danger';

const colorToClassNameMap: { [color in ToastColor]: string } = {
  primary: 'euiToast--primary',
  success: 'euiToast--success',
  warning: 'euiToast--warning',
  danger: 'euiToast--danger',
};

export const COLORS = keysOf(colorToClassNameMap);

export interface EuiToastProps
  extends CommonProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  color?: ToastColor;
  iconType?: IconType;
  onClose?: () => void;
}

export const EuiToast: FunctionComponent<EuiToastProps> = ({
  title,
  color,
  iconType,
  onClose,
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiToast',
    color ? colorToClassNameMap[color] : null,
    className
  );
  const headerClasses = classNames('euiToastHeader', {
    'euiToastHeader--withBody': children,
  });

  let headerIcon: ReactElement;

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
        {(dismissToast: string) => (
          <button
            type="button"
            className="euiToast__closeButton"
            aria-label={dismissToast}
            onClick={onClose}
            data-test-subj="toastCloseButton">
            <EuiIcon type="cross" size="m" aria-hidden="true" />
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
    <div className={classes} aria-live="polite" {...rest}>
      <EuiScreenReaderOnly>
        <p>
          <EuiI18n
            token="euiToast.newNotification"
            default="A new notification appears"
          />
        </p>
      </EuiScreenReaderOnly>

      <EuiI18n token="euiToast.notification" default="Notification">
        {(notification: string) => (
          <div
            className={headerClasses}
            aria-label={notification}
            data-test-subj="euiToastHeader">
            {headerIcon}

            <span className="euiToastHeader__title">{title}</span>
          </div>
        )}
      </EuiI18n>

      {closeButton}
      {optionalBody}
    </div>
  );
};

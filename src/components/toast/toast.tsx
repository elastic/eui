/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import classNames from 'classnames';

import { useEuiTheme } from '../../services';
import { CommonProps } from '../common';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiButtonIcon } from '../button';
import { EuiI18n } from '../i18n';
import { IconType, EuiIcon } from '../icon';
import { EuiText } from '../text';

import {
  euiToastStyles,
  euiToastBodyStyles,
  euiToastHeaderStyles,
} from './toast.styles';

export const COLORS = ['primary', 'success', 'warning', 'danger'] as const;

type ToastColor = typeof COLORS[number];

export interface EuiToastProps
  extends CommonProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  color?: ToastColor;
  iconType?: IconType;
  onClose?: () => void;
  isAutoFocused?: boolean;
}

export const EuiToast: FunctionComponent<EuiToastProps> = ({
  title,
  color,
  iconType,
  onClose,
  children,
  className,
  isAutoFocused = false,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const baseStyles = euiToastStyles(euiTheme);
  const baseCss = [baseStyles.euiToast, color && baseStyles[color]];
  const bodyStyles = euiToastBodyStyles();
  const headerStyles = euiToastHeaderStyles(euiTheme);
  const headerCss = [
    headerStyles.euiToastHeader,
    children && headerStyles.withBody,
  ];

  const classes = classNames('euiToast', className);
  const focusableToast = useRef<HTMLDivElement>(null);
  let headerIcon: ReactElement;

  if (iconType) {
    headerIcon = (
      <EuiIcon
        css={headerStyles.euiToastHeader__icon}
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
          <EuiButtonIcon
            css={baseStyles.euiToast__closeButton}
            iconType="cross"
            color="text"
            size="xs"
            aria-label={dismissToast}
            onClick={onClose}
            data-test-subj="toastCloseButton"
          />
        )}
      </EuiI18n>
    );
  }

  let optionalBody;

  if (children) {
    optionalBody = (
      <EuiText
        css={bodyStyles.euiToastBody}
        size="s"
        data-test-subj="euiToastBody"
      >
        {children}
      </EuiText>
    );
  }

  useEffect(() => {
    if (isAutoFocused && focusableToast.current) {
      focusableToast.current.focus();
    }
  }, [isAutoFocused]);

  return (
    <div
      css={baseCss}
      className={classes}
      ref={isAutoFocused ? focusableToast : undefined}
      tabIndex={isAutoFocused ? -1 : undefined}
      {...rest}
    >
      <EuiScreenReaderOnly>
        <p>
          {isAutoFocused ? (
            <EuiI18n
              token="euiToast.newFocusableNotification"
              default="A new notification appears and has keyboard focus"
            />
          ) : (
            <EuiI18n
              token="euiToast.newNotification"
              default="A new notification appears"
            />
          )}
        </p>
      </EuiScreenReaderOnly>

      <EuiI18n token="euiToast.notification" default="Notification">
        {(notification: string) => (
          <div
            css={headerCss}
            aria-label={notification}
            data-test-subj="euiToastHeader"
          >
            {headerIcon}

            <span
              css={headerStyles.euiToastHeader__title}
              data-test-subj="euiToastHeader__title"
            >
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

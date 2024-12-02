/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiButtonIcon } from '../button';
import { EuiI18n } from '../i18n';
import { IconType, EuiIcon } from '../icon';
import { EuiText } from '../text';

import { euiToastStyles, euiToastHeaderStyles } from './toast.styles';

export const COLORS = ['primary', 'success', 'warning', 'danger'] as const;

type ToastColor = (typeof COLORS)[number];

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
  const baseStyles = useEuiMemoizedStyles(euiToastStyles);
  const baseCss = [baseStyles.euiToast, color && baseStyles.colors[color]];
  const headerStyles = useEuiMemoizedStyles(euiToastHeaderStyles);
  const headerCss = [
    headerStyles.euiToastHeader,
    children && headerStyles.withBody,
  ];

  const classes = classNames('euiToast', className);

  return (
    <div css={baseCss} className={classes} {...rest}>
      {/* Screen reader announcement */}
      <EuiScreenReaderOnly>
        <p>
          <EuiI18n
            token="euiToast.newNotification"
            default="A new notification appears"
          />
        </p>
      </EuiScreenReaderOnly>

      {/* Header */}
      <EuiI18n token="euiToast.notification" default="Notification">
        {(notification: string) => (
          <div
            css={headerCss}
            aria-label={notification}
            data-test-subj="euiToastHeader"
          >
            {iconType && (
              <EuiIcon
                css={headerStyles.euiToastHeader__icon}
                type={iconType}
                size="m"
                aria-hidden="true"
              />
            )}

            <span
              css={headerStyles.euiToastHeader__title}
              data-test-subj="euiToastHeader__title"
            >
              {title}
            </span>
          </div>
        )}
      </EuiI18n>

      {/* Close button */}
      {onClose && (
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
      )}

      {/* Body */}
      {children && (
        <EuiText size="s" data-test-subj="euiToastBody">
          {children}
        </EuiText>
      )}
    </div>
  );
};

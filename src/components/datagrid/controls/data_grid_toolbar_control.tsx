/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { css } from '@emotion/react';

import { EuiButtonEmpty, EuiButtonEmptyProps } from '../../button';
import { EuiNotificationBadge } from '../../badge';
import { useEuiI18n } from '../../i18n';

export type EuiDataGridToolbarControlProps = EuiButtonEmptyProps & {
  badgeContent?: number | string;
};

export const EuiDataGridToolbarControl: FunctionComponent<
  EuiDataGridToolbarControlProps
> = ({ children, className, badgeContent, textProps, ...rest }) => {
  const classes = classNames('euiDataGridToolbarControl', className);

  const badgeAriaLabel = useEuiI18n(
    'euiDataGridToolbarControl.badgeAriaLabel',
    'Active: {count}',
    { count: badgeContent }
  );

  return (
    <EuiButtonEmpty
      className={classes}
      size="xs"
      color="text"
      textProps={false}
      // Underline actual text, but not the badge
      css={css`
        &:focus,
        &:hover:not(:disabled) {
          text-decoration: none;

          .euiDataGridToolbarControl__text {
            text-decoration: underline;
          }
        }
      `}
      {...rest}
    >
      <span
        {...textProps}
        className={classNames(
          'euiDataGridToolbarControl__text',
          'eui-textTruncate',
          textProps && textProps.className
        )}
      >
        {children}
      </span>

      {Boolean(badgeContent) && (
        <EuiNotificationBadge
          className="euiDataGridToolbarControl__badge"
          css={css`
            cursor: inherit;
          `}
          color="subdued"
          aria-label={badgeAriaLabel}
          role="marquee" // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/marquee_role
        >
          {badgeContent}
        </EuiNotificationBadge>
      )}
    </EuiButtonEmpty>
  );
};

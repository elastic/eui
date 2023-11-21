/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import classNames from 'classnames';
import { EuiButtonEmpty } from '../../button';
import { EuiNotificationBadge } from '../../badge';
import { useEuiI18n } from '../../i18n';
import { EuiDataGridToolbarControlProps } from '../data_grid_types';

export const EuiDataGridToolbarControl = ({
  children,
  badgeContent,
  textProps,
  ...buttonProps
}: EuiDataGridToolbarControlProps) => {
  const badgeAriaLabel = useEuiI18n(
    'euiDataGridToolbarControl.badgeAriaLabel',
    'Active: {count}',
    { count: badgeContent }
  );

  const controlBtnClasses = classNames(
    'euiDataGrid__controlBtn',
    buttonProps.className
  );

  return (
    <EuiButtonEmpty
      size="xs"
      color="text"
      textProps={false}
      {...buttonProps}
      className={controlBtnClasses}
    >
      <span
        {...textProps}
        className={classNames(
          'eui-textTruncate',
          textProps && textProps.className
        )}
      >
        {children}
      </span>

      {Boolean(badgeContent) && (
        <EuiNotificationBadge
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

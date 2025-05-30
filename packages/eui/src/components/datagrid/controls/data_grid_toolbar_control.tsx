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
import { UseEuiTheme } from '@elastic/eui-theme-common';

import { useEuiTheme, useEuiThemeRefreshVariant } from '../../../services';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../../button';
import { EuiNotificationBadge } from '../../badge';
import { useEuiI18n } from '../../i18n';

export type EuiDataGridToolbarControlProps = EuiButtonEmptyProps & {
  badgeContent?: number | string;
};

export const EuiDataGridToolbarControl: FunctionComponent<
  EuiDataGridToolbarControlProps
> = ({ children, className, badgeContent, textProps, ...rest }) => {
  const euiThemeContext = useEuiTheme();
  const isRefreshVariant = useEuiThemeRefreshVariant('buttonVariant');
  const classes = classNames('euiDataGridToolbarControl', className);

  const cssStyles = isRefreshVariant
    ? // passes euiThemeContext here instead via `css` to ensure legacy Enzyme tests work
      interactiveStyles(euiThemeContext)
    : underlineStyles;

  const badgeAriaLabel = useEuiI18n(
    'euiDataGridToolbarControl.badgeAriaLabel',
    'Active: {count}',
    {
      count:
        typeof badgeContent === 'string'
          ? betterScreenReaderSlashes(badgeContent)
          : badgeContent,
    }
  );

  return (
    <EuiButtonEmpty
      className={classes}
      size="xs"
      color="text"
      textProps={false}
      css={cssStyles}
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
          css={badgeStyles}
          color="subdued"
          aria-label={`- ${badgeAriaLabel}`} // Punctuation helps add pauses for screen readers
          role="marquee" // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/marquee_role
        >
          {badgeContent}
        </EuiNotificationBadge>
      )}
    </EuiButtonEmpty>
  );
};

// The columns control specifically passes (e.g.) `5/10` when some columns
// are being hidden. We can make this a bit more legible to SRs with this quick util
const betterScreenReaderSlashes = (badgeContent: string) =>
  badgeContent.replaceAll('/', ' out of ');

// Underline actual text, but not the badge
const underlineStyles = css`
  &:focus,
  &:hover:not(:disabled) {
    text-decoration: none;

    .euiDataGridToolbarControl__text {
      text-decoration: underline;
    }
  }
`;

const interactiveStyles = ({ euiTheme }: UseEuiTheme) => css`
  &:focus,
  &:hover:not(:disabled) {
    .euiDataGridToolbarControl__badge {
      background-color: ${euiTheme.components.filterButtonBadgeBackgroundHover};
    }
  }
`;

const badgeStyles = css`
  cursor: inherit;
`;

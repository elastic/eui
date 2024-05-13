/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, AnchorHTMLAttributes } from 'react';

import { useEuiMemoizedStyles, UseEuiTheme } from '../../services';
import { logicalStyle } from '../../global_styling';
import { EuiIcon, EuiIconProps } from '../icon';
import { EuiI18n, useEuiI18n } from '../i18n';
import { EuiScreenReaderOnly } from '../accessibility';

/**
 * DRY util for indicating external links both via icon and to
 * screen readers. Used internally by at EuiLink and EuiListGroupItem
 */

export type EuiExternalLinkIconProps = {
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  /**
   * Set to true to show an icon indicating that it is an external link;
   * Defaults to true if `target="_blank"`
   */
  external?: boolean;
};

const iconStyle = ({ euiTheme }: UseEuiTheme) =>
  logicalStyle('margin-left', euiTheme.size.xs);

export const EuiExternalLinkIcon: FunctionComponent<
  EuiExternalLinkIconProps & Partial<EuiIconProps>
> = ({ target, external, ...rest }) => {
  const iconCssStyle = useEuiMemoizedStyles(iconStyle);

  const showExternalLinkIcon =
    (target === '_blank' && external !== false) || external === true;

  const iconAriaLabel = useEuiI18n(
    'euiExternalLinkIcon.ariaLabel',
    'External link'
  );

  return (
    <>
      {showExternalLinkIcon && (
        <EuiIcon
          css={iconCssStyle}
          aria-label={iconAriaLabel}
          size="s"
          type="popout"
          {...rest}
        />
      )}
      {target === '_blank' && (
        <EuiScreenReaderOnly>
          <span>
            <EuiI18n
              token="euiExternalLinkIcon.newTarget.screenReaderOnlyText"
              default="(opens in a new tab or window)"
            />
          </span>
        </EuiScreenReaderOnly>
      )}
    </>
  );
};

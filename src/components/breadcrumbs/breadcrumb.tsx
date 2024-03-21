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
  PropsWithChildren,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { useEuiI18n } from '../i18n';

import type { EuiBreadcrumbProps, _EuiBreadcrumbProps } from './types';
import { EuiBreadcrumbContent } from './_breadcrumb_content';

import { euiBreadcrumbStyles } from './breadcrumb.styles';

export const EuiBreadcrumb: FunctionComponent<
  HTMLAttributes<HTMLLIElement> &
    Pick<_EuiBreadcrumbProps, 'type'> &
    Pick<EuiBreadcrumbProps, 'truncate'>
> = ({ children, className, type, truncate, ...rest }) => {
  const classes = classNames('euiBreadcrumb', className);

  const styles = useEuiMemoizedStyles(euiBreadcrumbStyles);
  const cssStyles = [
    styles.euiBreadcrumb,
    styles[type],
    truncate && styles.isTruncated,
  ];

  return (
    <li
      className={classes}
      css={cssStyles}
      data-test-subj="euiBreadcrumb"
      {...rest}
    >
      {children}
    </li>
  );
};

export const EuiBreadcrumbCollapsed: FunctionComponent<
  PropsWithChildren & Pick<_EuiBreadcrumbProps, 'type' | 'isFirstBreadcrumb'>
> = ({ children, isFirstBreadcrumb, type }) => {
  const styles = useEuiMemoizedStyles(euiBreadcrumbStyles);
  const cssStyles = [styles.isCollapsed];

  const ariaLabel = useEuiI18n(
    'euiBreadcrumb.collapsedBadge.ariaLabel',
    'See collapsed breadcrumbs'
  );

  return (
    <EuiBreadcrumb css={cssStyles} type={type}>
      <EuiBreadcrumbContent
        popoverContent={children}
        text={<span aria-label={ariaLabel}>&hellip;</span>}
        title={ariaLabel}
        truncate={false}
        isFirstBreadcrumb={isFirstBreadcrumb}
        type={type}
      />
    </EuiBreadcrumb>
  );
};

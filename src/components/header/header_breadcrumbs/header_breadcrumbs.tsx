/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { EuiBreadcrumbs, EuiBreadcrumbsProps } from '../../breadcrumbs';
import { euiHeaderBreadcrumbsStyles } from './header_breadcrumbs.styles';

export const EuiHeaderBreadcrumbs: FunctionComponent<EuiBreadcrumbsProps> = ({
  className,
  breadcrumbs,
  ...rest
}) => {
  const classes = classNames('euiHeaderBreadcrumbs', className);

  const styles = useEuiMemoizedStyles(euiHeaderBreadcrumbsStyles);

  return (
    <EuiBreadcrumbs
      max={4}
      truncate
      breadcrumbs={breadcrumbs}
      className={classes}
      css={styles.euiHeaderBreadcrumbs}
      type="application"
      {...rest}
    />
  );
};

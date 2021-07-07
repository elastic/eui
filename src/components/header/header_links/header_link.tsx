/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { EuiButtonEmpty, EuiButtonEmptyProps } from '../../button';

export type EuiHeaderLinkProps = EuiButtonEmptyProps & {
  /**
   * Simple prop to update color based on active state.
   * Can be overridden with `color`
   */
  isActive?: boolean;
};

export const EuiHeaderLink: FunctionComponent<EuiHeaderLinkProps> = ({
  isActive,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiHeaderLink',
    {
      'euiHeaderLink-isActive': isActive,
    },
    className
  );

  const props = {
    color: isActive ? 'primary' : 'text',
    ...rest,
    className: classes,
  };

  return <EuiButtonEmpty {...(props as EuiButtonEmptyProps)} />;
};

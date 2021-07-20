/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';
import { EuiIcon } from '../icon';

const sizeToClassNameMap = {
  m: 'euiLoadingKibana--medium',
  l: 'euiLoadingKibana--large',
  xl: 'euiLoadingKibana--xLarge',
};

export const SIZES = keysOf(sizeToClassNameMap);

export type EuiLoadingKibanaProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    size?: keyof typeof sizeToClassNameMap;
  };

/**
 * **DEPRECATED** Use EuiLoadingLogo instead
 */
export const EuiLoadingKibana: FunctionComponent<EuiLoadingKibanaProps> = ({
  size = 'm',
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiLoadingKibana',
    sizeToClassNameMap[size],
    className
  );

  return (
    <span className={classes} {...rest}>
      <span className="euiLoadingKibana__icon">
        <EuiIcon type="logoKibana" size={size} />
      </span>
    </span>
  );
};

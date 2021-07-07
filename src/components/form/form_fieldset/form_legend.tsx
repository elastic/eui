/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent, ReactNode } from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';
import { EuiScreenReaderOnly } from '../../accessibility';

export type EuiFormLegendProps = HTMLAttributes<HTMLLegendElement> &
  CommonProps & {
    /**
     * ReactNode to render as this component's content
     */
    children: ReactNode;
    /**
     * For a hidden legend that is still visible to the screen reader, set to 'hidden'
     */
    display?: 'hidden' | 'visible';
    compressed?: boolean;
  };

export const EuiFormLegend: FunctionComponent<EuiFormLegendProps> = ({
  children,
  className,
  display = 'visible',
  compressed,
  ...rest
}) => {
  const isLegendHidden = display === 'hidden';
  const classes = classNames(
    'euiFormLegend',
    {
      'euiFormLegend-isHidden': isLegendHidden,
      'euiFormLegend--compressed': compressed,
    },
    className
  );

  return (
    <legend className={classes} {...rest}>
      {isLegendHidden ? (
        <EuiScreenReaderOnly>
          <span>{children}</span>
        </EuiScreenReaderOnly>
      ) : (
        children
      )}
    </legend>
  );
};

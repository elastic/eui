/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';
import { EuiScreenReaderOnly } from '../../accessibility';

import { euiFormLegendStyles } from './form_legend.styles';

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

  const styles = useEuiMemoizedStyles(euiFormLegendStyles);
  const cssStyles = [
    styles.euiFormLegend,
    !isLegendHidden && (compressed ? styles.compressed : styles.uncompressed),
  ];

  const classes = classNames(
    'euiFormLegend',
    { 'euiFormLegend-isHidden': isLegendHidden },
    className
  );

  return (
    <legend css={cssStyles} className={classes} {...rest}>
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

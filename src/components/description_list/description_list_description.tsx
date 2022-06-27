/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import {
  EuiDescriptionListAlignment,
  EuiDescriptionListTextStyle,
  EuiDescriptionListType,
} from './description_list';
import { useEuiTheme } from '../../services';
import { euiDescriptionListDescriptionStyles } from './description_list_description.styles';

interface EuiDescriptionListDescriptionProps
  extends CommonProps,
    HTMLAttributes<HTMLElement> {
  /**
   * How each item should be laid out
   */
  type?: EuiDescriptionListType;
  /**
   * How should the content be styled, by default
   * this will emphasize the title
   */
  textStyle?: EuiDescriptionListTextStyle;
  /**
   * Smaller text and condensed spacing
   */
  compressed?: boolean;
  /**
   * Text alignment
   */
  align?: EuiDescriptionListAlignment;
}

export const EuiDescriptionListDescription: FunctionComponent<EuiDescriptionListDescriptionProps> = ({
  children,
  className,
  type,
  textStyle,
  compressed,
  align,
  ...rest
}) => {
  const theme = useEuiTheme();
  const styles = euiDescriptionListDescriptionStyles(theme);
  const cssStyles = [
    styles.euiDescriptionList__description,
    type && styles[type],
    type === 'row' && textStyle === 'reverse' && styles.rowReverse,
    type === 'row' && compressed && styles.rowCompressed,
    type === 'row' &&
      textStyle === 'reverse' &&
      compressed &&
      styles.rowCompressedReverse,
    (type === 'column' || type === 'responsiveColumn') &&
      textStyle === 'reverse' &&
      styles.columnReverse,
    (type === 'column' || type === 'responsiveColumn') &&
      compressed &&
      styles.columnCompressed,
    (type === 'column' || type === 'responsiveColumn') &&
      compressed &&
      textStyle === 'reverse' &&
      styles.columnCompressedReverse,
    type === 'inline' && compressed && styles.inlineCompressed,
  ];

  const classes = classNames('euiDescriptionList__description', className);
  return (
    <dd className={classes} css={cssStyles} {...rest}>
      {children}
    </dd>
  );
};

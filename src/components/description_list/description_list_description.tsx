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
import { useEuiTheme, useIsWithinBreakpoints } from '../../services';
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
   * Text alignment for Description Title
   */
  align?: EuiDescriptionListAlignment;
}

export const EuiDescriptionListDescription: FunctionComponent<EuiDescriptionListDescriptionProps> = ({
  children,
  className,
  type = 'row',
  textStyle = 'normal',
  compressed,
  align = 'left',
  ...rest
}) => {
  const theme = useEuiTheme();
  const styles = euiDescriptionListDescriptionStyles(theme);

  const isMobile = useIsWithinBreakpoints(['xs', 's']);

  let fontStyles = compressed
    ? [styles.fontStyles.compressed]
    : [styles.fontStyles[textStyle]];

  let typeStyles;
  if (type === 'responsiveColumn') {
    // Responsive columns are only column style at larger breakpoints
    typeStyles = !isMobile ? [styles.column] : [styles.row];
  } else if (type === 'inline') {
    // Inline styles have nested keys for type and font
    typeStyles = [styles.inlineStyles.inline];
    fontStyles = compressed
      ? [styles.inlineStyles.compressed]
      : [styles.inlineStyles.normal];
  } else {
    typeStyles = [styles[type]];
  }

  const alignStyles =
    align === 'center' && type !== 'row' ? [styles.fontStyles.left] : undefined;

  const cssStyles = [
    styles.euiDescriptionList__description,
    isMobile && styles.mobile,
    ...fontStyles,
    ...typeStyles,
    alignStyles,
  ];

  const classes = classNames('euiDescriptionList__description', className);
  return (
    <dd className={classes} css={cssStyles} {...rest}>
      {children}
    </dd>
  );
};

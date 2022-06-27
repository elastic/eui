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
  EuiDescriptionListTextStyle,
  EuiDescriptionListType,
} from './description_list';
import { useEuiTheme, useIsWithinBreakpoints } from '../../services';
import { euiDescriptionListTitleStyles } from './description_list_title.styles';

interface EuiDescriptionListTitleProps
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
}

export const EuiDescriptionListTitle: FunctionComponent<EuiDescriptionListTitleProps> = ({
  children,
  className,
  type = 'row',
  textStyle = 'normal',
  compressed,
  ...rest
}) => {
  const theme = useEuiTheme();
  const styles = euiDescriptionListTitleStyles(theme);
  const isMobile = useIsWithinBreakpoints(['xs', 's']);

  let alignStyles;

  let fontStyles = compressed
    ? [styles.fontStyles.compressed]
    : [styles.fontStyles[textStyle]];

  let typeStyles;
  if (type === 'responsiveColumn') {
    // Responsive columns are only column style at larger breakpoints
    typeStyles = !isMobile ? [styles.column] : [styles.row];
    alignStyles = !isMobile ? [styles.fontStyles.right] : undefined;
  } else if (type === 'inline') {
    // Inline styles have nested keys for type and font
    typeStyles = [styles.inlineStyles.inline];
    fontStyles = compressed
      ? [styles.inlineStyles.compressed]
      : [styles.inlineStyles.normal];
  } else {
    // Column and row are the rest
    typeStyles = [styles[type]];
    alignStyles = type === 'column' ? [styles.fontStyles.right] : undefined;
  }

  const cssStyles = [
    styles.euiDescriptionList__title,
    ...fontStyles,
    ...typeStyles,
    alignStyles,
  ];

  const classes = classNames('euiDescriptionList__title', className);

  return (
    <dt className={classes} css={cssStyles} {...rest}>
      {children}
    </dt>
  );
};

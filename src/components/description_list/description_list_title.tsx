/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent, useContext } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { useEuiTheme, useIsWithinBreakpoints } from '../../services';
import { euiDescriptionListTitleStyles } from './description_list_title.styles';
import { EuiDescriptionListContext } from './description_list_context';

interface EuiDescriptionListTitleProps
  extends CommonProps,
    HTMLAttributes<HTMLElement> {}

export const EuiDescriptionListTitle: FunctionComponent<EuiDescriptionListTitleProps> = ({
  children,
  className,
  ...rest
}) => {
  const {
    type = 'row',
    textStyle = 'normal',
    compressed,
    align = 'left',
  } = useContext(EuiDescriptionListContext);

  const theme = useEuiTheme();
  const styles = euiDescriptionListTitleStyles(theme);
  const isMobile = useIsWithinBreakpoints(['xs', 's']);

  let alignStyles;

  let fontStyles = [styles.fontStyles[textStyle]];
  if (compressed && textStyle === 'normal') {
    // Only render compressed style if text style is normal
    fontStyles = [styles.fontStyles.compressed];
  }

  let typeStyles;
  if (type === 'responsiveColumn') {
    // Responsive columns are only column style at larger breakpoints
    typeStyles = !isMobile ? [styles.column] : [styles.row];
    alignStyles =
      align === 'center' && !isMobile ? [styles.fontStyles.right] : undefined;
  } else if (type === 'inline') {
    // Inline styles have nested keys for type and font
    typeStyles = [styles.inlineStyles.inline];
    fontStyles = compressed
      ? [styles.inlineStyles.compressed]
      : [styles.inlineStyles.normal];
  } else {
    // Column and row are the rest
    typeStyles = [styles[type]];
    if (align === 'center' && type === 'column') {
      alignStyles = [styles.fontStyles.right];
    }
  }

  const cssStyles = [
    styles.euiDescriptionList__title,
    isMobile && styles.mobile,
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

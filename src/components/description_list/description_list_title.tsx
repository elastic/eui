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
  /**
   * Text alignment
   */
  align?: EuiDescriptionListAlignment;
}

export const EuiDescriptionListTitle: FunctionComponent<EuiDescriptionListTitleProps> = ({
  children,
  className,
  type = 'row',
  textStyle = 'normal',
  compressed,
  align = 'left',
  ...rest
}) => {
  const theme = useEuiTheme();
  const styles = euiDescriptionListTitleStyles(theme);
  const isMobile = useIsWithinBreakpoints(['xs', 's']);

  let styleKey = 'row';

  if (type === 'row') {
    if (textStyle === 'reverse') {
      styleKey = compressed ? 'rowCompressedReverse' : 'rowReverse';
    } else {
      styleKey = compressed ? 'rowCompressed' : 'row';
    }
  } else if (type === 'column' || (type === 'responsiveColumn' && !isMobile)) {
    if (textStyle === 'reverse') {
      styleKey = compressed ? 'columnCompressedReverse' : 'columnReverse';
    } else {
      styleKey = compressed ? 'columnCompressed' : 'column';
    }
  } else if (type === 'inline') {
    styleKey = compressed ? 'inlineCompressed' : 'inline';
  }

  const cssStyles = [
    styles.euiDescriptionList__title,
    type && styles[styleKey],
    (type === 'column' || type === 'responsiveColumn') &&
      align === 'center' &&
      styles.columnCenter,
  ];

  const classes = classNames('euiDescriptionList__title', className);

  return (
    <dt className={classes} css={cssStyles} {...rest}>
      {children}
    </dt>
  );
};

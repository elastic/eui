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
import { useEuiTheme } from '../../services';
import { euiDescriptionListTitleStyles } from './description_list_title.styles';
import { EuiDescriptionListContext } from './description_list_context';

// Export required for correct inference by HOCs
export interface EuiDescriptionListTitleProps
  extends CommonProps,
    HTMLAttributes<HTMLElement> {}

export const EuiDescriptionListTitle: FunctionComponent<
  EuiDescriptionListTitleProps
> = ({ children, className, ...rest }) => {
  const { type, textStyle, compressed, align, gutterSize } = useContext(
    EuiDescriptionListContext
  );

  const theme = useEuiTheme();
  const styles = euiDescriptionListTitleStyles(theme);

  let conditionalStyles =
    compressed && textStyle !== 'reverse'
      ? [styles.fontStyles.compressed]
      : [styles.fontStyles[textStyle]];

  switch (type) {
    case 'inline':
      conditionalStyles = compressed
        ? [styles.inlineStyles.compressed]
        : [styles.inlineStyles.normal];
      break;

    case 'responsiveColumn':
    case 'column':
      if (align === 'center') {
        conditionalStyles.push(styles.right);
      }
      break;
  }

  const cssStyles = [
    styles.euiDescriptionList__title,
    styles[type],
    styles[gutterSize],
    ...conditionalStyles,
  ];

  const classes = classNames('euiDescriptionList__title', className);

  return (
    <dt className={classes} css={cssStyles} {...rest}>
      {children}
    </dt>
  );
};

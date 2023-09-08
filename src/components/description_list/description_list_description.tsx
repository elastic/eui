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

import { EuiDescriptionListContext } from './description_list_context';
import { euiDescriptionListDescriptionStyles } from './description_list_description.styles';

// Export required for correct inference by HOCs
export interface EuiDescriptionListDescriptionProps
  extends CommonProps,
    HTMLAttributes<HTMLElement> {}

export const EuiDescriptionListDescription: FunctionComponent<
  EuiDescriptionListDescriptionProps
> = ({ children, className, ...rest }) => {
  const { type, textStyle, compressed, align } = useContext(
    EuiDescriptionListContext
  );

  const theme = useEuiTheme();
  const styles = euiDescriptionListDescriptionStyles(theme);

  let conditionalStyles =
    compressed && textStyle === 'reverse'
      ? [styles.fontStyles.compressed]
      : [styles.fontStyles[textStyle]];

  switch (type) {
    case 'inline':
      conditionalStyles = compressed
        ? [styles.inlineStyles.compressed]
        : [styles.inlineStyles.normal];
      break;
    case 'column':
      if (align === 'center') {
        conditionalStyles.push(styles.left);
      }
      break;
  }

  const cssStyles = [
    styles.euiDescriptionList__description,
    styles[type],
    ...conditionalStyles,
  ];

  const classes = classNames('euiDescriptionList__description', className);
  return (
    <dd className={classes} css={cssStyles} {...rest}>
      {children}
    </dd>
  );
};

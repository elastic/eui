/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ReactElement, FunctionComponent } from 'react';
import classNames from 'classnames';

import { cloneElementWithCss } from '../../../services/theme/clone_element';
import { euiScreenReaderOnlyStyles } from './screen_reader_only.styles';

export interface EuiScreenReaderOnlyProps {
  /**
   * ReactElement to render as this component's content
   */
  children: ReactElement;

  /**
   * For keyboard navigation, force content to display visually upon focus.
   */
  showOnFocus?: boolean;
  className?: string;
}

export const EuiScreenReaderOnly: FunctionComponent<EuiScreenReaderOnlyProps> = ({
  children,
  className,
  showOnFocus,
  ...rest
}) => {
  const classes = classNames(
    {
      euiScreenReaderOnly: !showOnFocus,
      'euiScreenReaderOnly--showOnFocus': showOnFocus,
    },
    className,
    children.props.className
  );

  const cssStyles = [euiScreenReaderOnlyStyles(showOnFocus)];

  const props = {
    ...rest,
    className: classes,
    css: cssStyles,
  };

  return cloneElementWithCss(children, props);
};

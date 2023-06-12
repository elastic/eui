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

  className?: string;

  /**
   * For keyboard navigation, force content to display visually upon focus/focus-within.
   */
  showOnFocus?: boolean;

  /**
   * Despite being visually hidden, text within `EuiScreenReaderOnly` will still
   * be selectable and copyable. Set this to `true` if you do not want your
   * screen reader text to be copied.
   */
  preventCopy?: boolean;
}

export const EuiScreenReaderOnly: FunctionComponent<
  EuiScreenReaderOnlyProps
> = ({ children, className, showOnFocus, preventCopy }) => {
  const classes = classNames(className, children.props.className);

  const styles = euiScreenReaderOnlyStyles();
  const cssStyles = [
    showOnFocus
      ? styles['euiScreenReaderOnly-showOnFocus']
      : styles.euiScreenReaderOnly,
    preventCopy && styles.preventCopy,
  ];

  const props = {
    className: classes.length ? classes : undefined,
    css: cssStyles,
  };

  return cloneElementWithCss(children, props);
};

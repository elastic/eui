/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { cloneElement, ReactElement, FunctionComponent } from 'react';
import classNames from 'classnames';

export interface EuiScreenReaderOnlyProps {
  /**
   * ReactElement to render as this component's content
   */
  children: ReactElement<any>;

  /**
   * For keyboard navigation, force content to display visually upon focus.
   */
  showOnFocus?: boolean;
}

export const EuiScreenReaderOnly: FunctionComponent<EuiScreenReaderOnlyProps> = ({
  children,
  showOnFocus,
}) => {
  const classes = classNames(
    {
      euiScreenReaderOnly: !showOnFocus,
      'euiScreenReaderOnly--showOnFocus': showOnFocus,
    },
    children.props.className
  );

  const props = {
    ...children.props,
    className: classes,
  };

  return cloneElement(children, props);
};

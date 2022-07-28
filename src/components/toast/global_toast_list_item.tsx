/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { FunctionComponent, ReactElement } from 'react';
import classNames from 'classnames';
import { useEuiTheme } from '../../services';
import { cloneElementWithCss } from '../../services/theme/clone_element';
import { CommonProps } from '../common';
import { euiGlobalToastListItemStyles } from './global_toast_list.styles';

export interface EuiGlobalToastListItemProps {
  isDismissed?: boolean;
  /**
   * ReactElement to render as this component's content
   */
  children?: ReactElement;
}

export const EuiGlobalToastListItem: FunctionComponent<
  CommonProps & EuiGlobalToastListItemProps
> = ({ children, className, isDismissed }) => {
  const euiTheme = useEuiTheme();
  if (!children) {
    return null;
  }
  const styles = euiGlobalToastListItemStyles(euiTheme);
  const cssStyles = [
    styles.euiGlobalToastListItem,
    isDismissed && styles.dismissed,
  ];
  const classes = classNames(
    'euiGlobalToastListItem',
    children.props.className,
    className
  );

  return cloneElementWithCss(children, {
    ...children.props,
    ...{ className: classes, css: cssStyles },
  });
};

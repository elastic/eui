/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { cloneElement, FunctionComponent, ReactElement } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export interface EuiGlobalToastListItemProps {
  isDismissed?: boolean;
  /**
   * ReactElement to render as this component's content
   */
  children?: ReactElement;
}

export const EuiGlobalToastListItem: FunctionComponent<
  CommonProps & EuiGlobalToastListItemProps
> = ({ children, isDismissed }) => {
  if (!children) {
    return null;
  }
  const classes = classNames(
    'euiGlobalToastListItem',
    children.props.className,
    {
      'euiGlobalToastListItem-isDismissed': isDismissed,
    }
  );

  return cloneElement(children, {
    ...children.props,
    ...{ className: classes },
  });
};

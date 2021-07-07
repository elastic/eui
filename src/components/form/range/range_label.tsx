/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

export interface EuiRangeLabelProps {
  /**
   * ReactNode to render as this component's content
   */
  children: string | number;
  disabled?: boolean;
  side?: 'min' | 'max';
}

export const EuiRangeLabel: FunctionComponent<EuiRangeLabelProps> = ({
  children,
  disabled,
  side = 'max',
}) => {
  const classes = classNames('euiRangeLabel', `euiRangeLabel--${side}`, {
    'euiRangeLabel--isDisabled': disabled,
  });
  return <label className={classes}>{children}</label>;
};

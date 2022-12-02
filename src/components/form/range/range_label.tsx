/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';

import { useEuiTheme } from '../../../services';
import { euiRangeLabelStyles } from './range_label.styles';

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
  const euiTheme = useEuiTheme();
  const styles = euiRangeLabelStyles(euiTheme);
  const cssStyles = [
    styles.euiRangeLabel,
    styles[side],
    disabled && styles.isDisabled,
  ];

  return (
    <label className="euiRangeLabel" css={cssStyles}>
      {children}
    </label>
  );
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import { useEuiTheme } from '../../services';
import { ToolTipPositions } from './tool_tip_popover';
import { euiToolTipStyles } from './tool_tip.styles';

export const EuiToolTipArrow: FunctionComponent<
  { position: ToolTipPositions } & HTMLAttributes<HTMLDivElement>
> = ({ position, ...props }) => {
  const euiTheme = useEuiTheme();
  const styles = euiToolTipStyles(euiTheme);
  const cssStyles = [styles.euiToolTip__arrow, styles.arrowPositions[position]];

  return <div css={cssStyles} {...props} />;
};

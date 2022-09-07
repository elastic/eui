/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import { useEuiTheme } from '../../services';
import { euiToolTipStyles } from './tool_tip.styles';

export const EuiToolTipArrow: FunctionComponent<HTMLAttributes<
  HTMLDivElement
>> = (props) => {
  const euiTheme = useEuiTheme();
  const toolTipCss = euiToolTipStyles(euiTheme);

  return <div css={[toolTipCss.euiToolTip__arrow]} {...props} />;
};

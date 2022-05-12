/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { EuiMarkdownAstNodePosition } from '../../markdown_types';
import { EuiToolTip } from '../../../tool_tip';
import { EuiIcon } from '../../../icon';
import { TooltipNodeDetails } from './types';

export const tooltipMarkdownRenderer: FunctionComponent<
  TooltipNodeDetails & {
    position: EuiMarkdownAstNodePosition;
  }
> = ({ content, children }) => {
  return (
    <span>
      <EuiToolTip content={content}>
        <span>
          <strong>{children}</strong>
          <EuiIcon
            type="questionInCircle"
            className="euiMarkdownTooltip__icon"
          />
        </span>
      </EuiToolTip>
    </span>
  );
};

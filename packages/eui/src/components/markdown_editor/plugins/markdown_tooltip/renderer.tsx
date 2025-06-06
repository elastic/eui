/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren } from 'react';
import { EuiMarkdownAstNodePosition } from '../../markdown_types';
import { EuiToolTip } from '../../../tool_tip';
import { EuiIcon } from '../../../icon';
import { TooltipNodeDetails } from './types';

type TooltipMarkdownRendererProps = PropsWithChildren &
  TooltipNodeDetails & {
    position: EuiMarkdownAstNodePosition;
  };

export const tooltipMarkdownRenderer: FunctionComponent<
  TooltipMarkdownRendererProps
> = ({ content, children }) => {
  return (
    <span>
      <EuiToolTip content={content}>
        <span>
          <strong>{children}</strong>
          <EuiIcon
            type="question"
            // This is to offset the tooltip icon, which isn't perfectly centered
            css={{ transform: 'translateY(-1px)' }}
          />
        </span>
      </EuiToolTip>
    </span>
  );
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement, ReactNode, useState } from 'react';
import { CommonProps } from '../common';
import { copyToClipboard } from '../../services';
import { EuiToolTip, EuiToolTipProps } from '../tool_tip';

export interface EuiCopyProps extends CommonProps {
  textToCopy: string;
  beforeMessage?: ReactNode;
  afterMessage?: ReactNode;
  children(copy: () => void): ReactElement;
  tooltipProps?: Partial<
    Omit<EuiToolTipProps, 'children' | 'content' | 'onMouseOut'>
  >;
}

export const EuiCopy = ({
  textToCopy,
  beforeMessage,
  afterMessage = 'Copied',
  children,
  tooltipProps,
}: EuiCopyProps) => {
  const [tooltipText, setTooltipText] = useState<ReactNode>(beforeMessage);

  const copy = () => {
    const isCopied = copyToClipboard(textToCopy);
    if (isCopied) {
      setTooltipText(afterMessage);
    }
  };

  const resetTooltipText = () => {
    setTooltipText(beforeMessage);
  };

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <EuiToolTip
      content={tooltipText}
      onMouseOut={resetTooltipText}
      {...tooltipProps}
    >
      {children(copy)}
    </EuiToolTip>
  );
};
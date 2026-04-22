/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement, ReactNode, useState, useCallback } from 'react';
import { CommonProps } from '../common';
import { copyToClipboard } from '../../services';
import { EuiToolTip, EuiToolTipProps } from '../tool_tip';

export interface EuiCopyProps extends CommonProps {
  /**
   * Text that will be copied to clipboard when copy function is executed.
   */
  textToCopy: string;
  /**
   * Tooltip message displayed before copy function is called.
   */
  beforeMessage?: ReactNode;
  /**
   * Tooltip message displayed after copy function is called that lets the user know that
   * 'textToCopy' has been copied to the clipboard.
   */
  afterMessage?: ReactNode;
  /**
   * Function that must return a component. First argument is 'copy' function.
   * Use your own logic to create the component that users interact with when triggering copy.
   */
  children(copy: () => void): ReactElement;
  /**
   * Optional props to pass to the EuiToolTip component.
   */
  tooltipProps?: Partial
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

  const copy = useCallback(() => {
    const isCopied = copyToClipboard(textToCopy);
    if (isCopied) {
      setTooltipText(afterMessage);
    }
  }, [textToCopy, afterMessage]);

  const resetTooltipText = useCallback(() => {
    setTooltipText(beforeMessage);
  }, [beforeMessage]);

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
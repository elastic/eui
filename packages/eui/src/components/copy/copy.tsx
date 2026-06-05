/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import React, { useRef, useState, ReactElement, ReactNode } from 'react';
import { CommonProps } from '../common';
import { copyToClipboard } from '../../services';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiToolTip, EuiToolTipProps, type EuiToolTipRef } from '../tool_tip';

export interface EuiCopyProps extends CommonProps {
  textToCopy: string;
  beforeMessage?: ReactNode;
  afterMessage?: ReactNode;
  children(copy: () => void): ReactElement;
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
  const tooltipRef = useRef<EuiToolTipRef>(null);
  const [tooltipText, setTooltipText] = useState<ReactNode>(beforeMessage);
  const [isCopied, setIsCopied] = useState(false);

  const copy = () => {
    const copied = copyToClipboard(textToCopy);
    if (copied) {
      setTooltipText(afterMessage);
      setIsCopied(true);
      // `EuiToolTip` suppresses showing when content is empty, so `EuiCopy`
      // imperatively shows the tooltip after the post-copy state update.
      setTimeout(() => {
        tooltipRef.current?.showToolTip();
      }, 0);
    }
  };

  const resetTooltipText = () => {
    setTooltipText(beforeMessage);
    setIsCopied(false);
  };

  return (
    <>
      {/* See `src/components/tool_tip/tool_tip_anchor.tsx` for explanation of below eslint-disable */}
      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
      <EuiToolTip
        ref={tooltipRef}
        content={tooltipText}
        onMouseOut={resetTooltipText}
        {...tooltipProps}
        onBlur={() => {
          tooltipProps?.onBlur?.();
          if (isCopied) resetTooltipText();
        }}
        disableScreenReaderOutput={
          isCopied || !!tooltipProps?.disableScreenReaderOutput
        }
      >
        {children(copy)}
      </EuiToolTip>
      {/* Stable `aria-live` region so VoiceOver/Safari announces reliably.
       `EuiScreenReaderLive` alternates `aria-live` between "off" and active which
        Safari ignores when attribute and content change in the same render. */}
      <EuiScreenReaderOnly>
        <div aria-live="assertive" aria-atomic="true">
          {isCopied ? afterMessage : ''}
        </div>
      </EuiScreenReaderOnly>
    </>
  );
};

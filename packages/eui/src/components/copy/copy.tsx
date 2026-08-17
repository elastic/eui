/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CommonProps } from '../common';
import { copyToClipboard } from '../../services';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiToolTip, EuiToolTipProps, type EuiToolTipRef } from '../tool_tip';

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
  tooltipProps?: Partial<
    Omit<EuiToolTipProps, 'children' | 'content' | 'onMouseOut'>
  >;
}

export const EuiCopy: FunctionComponent<EuiCopyProps> = ({
  textToCopy,
  beforeMessage,
  afterMessage = 'Copied',
  children,
  tooltipProps,
}) => {
  const tooltipRef = useRef<EuiToolTipRef>(null);

  // Consumers can hold onto the render prop `copy` callback and invoke it after
  // this component has unmounted (e.g. from a debounced handler). Setting state
  // then is a no-op that React 17 additionally warns about, so skip it.
  const isMountedRef = useRef(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Counts successful copies instead of storing a boolean, so that every copy
  // re-runs the effect below - the tooltip may have been hidden in between
  // copies (e.g. by another tooltip being shown) and needs showing again.
  const [copyCount, setCopyCount] = useState(0);
  const isCopied = copyCount > 0;
  const tooltipText = isCopied ? afterMessage : beforeMessage;

  const copy = useCallback(() => {
    const copied = copyToClipboard(textToCopy);
    if (copied && isMountedRef.current) {
      setCopyCount((count) => count + 1);
    }
  }, [textToCopy]);

  const resetTooltipText = useCallback(() => {
    if (isMountedRef.current) {
      setCopyCount(0);
    }
  }, []);

  // `EuiToolTip` suppresses showing when content is empty, so `EuiCopy`
  // imperatively shows the tooltip after the post-copy state update.
  useEffect(() => {
    if (copyCount > 0) {
      tooltipRef.current?.showToolTip();
    }
  }, [copyCount]);

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

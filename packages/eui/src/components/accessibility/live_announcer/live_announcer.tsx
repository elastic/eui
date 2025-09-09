/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
  isValidElement,
} from 'react';

import { EuiScreenReaderOnly } from '../screen_reader_only';
import { EuiScreenReaderLiveProps } from '../screen_reader_live';

export type EuiLiveAnnouncerProps = Omit<
  EuiScreenReaderLiveProps,
  'focusRegionOnTextChange'
> & {
  /**
   * Sets a delay in ms before the live region is cleared.
   * The message will still be read by screen readers even if it's cleared in between.
   *
   * @default 2000
   */
  clearAfterMs?: number | false;
};

export const EuiLiveAnnouncer: FunctionComponent<EuiLiveAnnouncerProps> = ({
  children,
  clearAfterMs = 2000,
  isActive = true,
  role = 'status',
  'aria-live': ariaLive = 'polite',
  ...rest
}) => {
  const [content, setContent] = useState<ReactNode>('');
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setTimeout(() => {
        // set isMounted with a small delay to trigger an render update after first render
        setMounted(true);
      }, 50);
    }

    return () => {
      setMounted(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (children) {
      setContent(isValidElement(children) ? children : <>{children}</>);
    }

    if (clearAfterMs) {
      timeout = setTimeout(() => {
        setContent('');
      }, clearAfterMs);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [children, clearAfterMs]);

  return (
    <EuiScreenReaderOnly>
      <div
        role={role}
        aria-live={isActive ? ariaLive : 'off'}
        aria-atomic="true"
        {...rest}
      >
        {isMounted && content}
      </div>
    </EuiScreenReaderOnly>
  );
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { EuiScreenReaderOnly } from '../screen_reader_only';

export interface EuiScreenReaderStatusProps {
  /**
   * Set a custom status message to be announced to screen readers.
   * Defaults to `document.title` and will announce client-side route change.
   */
  statusMessage?: string;
  /**
   * Focuses the status message and removes the live region when set to true.
   */
  shouldReceiveFocus?: boolean;
}

export const EuiScreenReaderStatus: FunctionComponent<EuiScreenReaderStatusProps> = ({
  statusMessage = document.title,
  shouldReceiveFocus = false,
}) => {
  const [statusMessageState, setStatusMessageState] = useState('');
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStatusMessageState(statusMessage);

    if (statusRef.current !== null && shouldReceiveFocus) {
      statusRef.current.focus();
    }

    return () => {
      setStatusMessageState('');
    };
  }, [statusMessage, shouldReceiveFocus]);

  return (
    <EuiScreenReaderOnly>
      <div
        aria-live={shouldReceiveFocus ? 'off' : 'polite'}
        ref={statusRef}
        role="status"
        tabIndex={shouldReceiveFocus ? -1 : undefined}
      >
        {statusMessageState}
      </div>
    </EuiScreenReaderOnly>
  );
};

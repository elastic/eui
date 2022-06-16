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
  pageTitle?: string;
}

export const EuiScreenReaderStatus: FunctionComponent<EuiScreenReaderStatusProps> = ({
  pageTitle = document.title,
}) => {
  const [pageTitleState, setPageTitleState] = useState('');
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statusRef.current !== null) {
      setPageTitleState(pageTitle);
      statusRef.current.focus();
    }

    return () => {
      setPageTitleState('');
    };
  }, [pageTitle]);

  return (
    <EuiScreenReaderOnly>
      <div ref={statusRef} role="status" tabIndex={-1}>
        {pageTitleState}
      </div>
    </EuiScreenReaderOnly>
  );
};

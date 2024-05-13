/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect } from 'react';

export const EuiAutoSizer = ({
  children,
  defaultHeight,
  defaultWidth,
  onResize,
}: any) => {
  const childrenParams = {
    height: defaultHeight ?? 600,
    width: defaultWidth ?? 600,
  };

  useEffect(() => {
    onResize?.(childrenParams);
  }, [onResize, defaultHeight, defaultWidth]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div data-eui="EuiAutoSizer">{children(childrenParams)}</div>;
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import AutoSizer, { AutoSizerProps } from 'react-virtualized-auto-sizer';

export interface EuiAutoSizerProps extends AutoSizerProps {}

export const EuiAutoSizer: FunctionComponent<EuiAutoSizerProps> = ({
  children,
  ...rest
}) => {
  return <AutoSizer {...rest}>{children}</AutoSizer>;
};

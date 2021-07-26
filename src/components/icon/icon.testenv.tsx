/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ComponentType } from 'react';

export const EuiIcon = ({ type, ...rest }: any) => (
  <span
    data-euiicon-type={
      typeof type === 'string' ? type : type.displayName || type.name
    }
    {...rest}
  />
);

export const appendIconComponentCache = (_: {
  [iconType: string]: ComponentType;
}) => {
  // manually appending to the internal EuiIcon cache is out-of-scope of this test environment
};

export const TYPES = [];
export const COLORS = [];
export const SIZES = [];

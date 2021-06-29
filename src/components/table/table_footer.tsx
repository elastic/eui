/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { FunctionComponent } from 'react';
import { CommonProps } from '../common';

export const EuiTableFooter: FunctionComponent<CommonProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <tfoot className={className} {...rest}>
      <tr>{children}</tr>
    </tfoot>
  );
};

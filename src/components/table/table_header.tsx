/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react';
import { CommonProps } from '../common';

export type EuiTableHeaderProps = CommonProps &
  HTMLAttributes<HTMLElement> & {
    /**
     * Children must be valid DOM structure residing within `<thead>`.
     * Use `<td> | <th>` by default, or `<tr><th/></tr>` when `wrapWithTableRow=false`
     */
    children?: ReactNode;
    /**
     * Automatically adds a wrapping `<tr>` element around the children
     */
    wrapWithTableRow?: boolean;
  };

export const EuiTableHeader: FunctionComponent<EuiTableHeaderProps> = ({
  children,
  className,
  wrapWithTableRow = true,
  ...rest
}) => {
  return (
    <thead className={className} {...rest}>
      {wrapWithTableRow ? <tr>{children}</tr> : children}
    </thead>
  );
};

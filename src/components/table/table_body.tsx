/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren, Ref } from 'react';
import { CommonProps } from '../common';

export type EuiTableBodyProps = PropsWithChildren &
  CommonProps & {
    bodyRef?: Ref<HTMLTableSectionElement>;
  };

export const EuiTableBody: FunctionComponent<EuiTableBodyProps> = ({
  children,
  className,
  bodyRef,
  ...rest
}) => {
  return (
    <tbody className={className} ref={bodyRef} {...rest}>
      {children}
    </tbody>
  );
};

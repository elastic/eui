/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { CommonProps } from '../common';

export type EuiModalBodyProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
>;

export const EuiModalBody: EuiModalBodyProps = ({
  className,
  children,
  ...rest
}) => {
  const classes = classnames('euiModalBody', className);
  return (
    <div className={classes} {...rest}>
      <div className="euiModalBody__overflow">{children}</div>
    </div>
  );
};

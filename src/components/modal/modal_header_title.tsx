/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, useMemo } from 'react';
import classnames from 'classnames';
import { CommonProps } from '../common';

export type EuiModalHeaderTitleProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
>;

export const EuiModalHeaderTitle: EuiModalHeaderTitleProps = ({
  className,
  children,
  ...rest
}) => {
  const classes = classnames('euiModalHeader__title', className);
  const childrenWithHeading = useMemo(() => {
    if (children && !children.hasOwnProperty('$$typeof'))
      return <h1>{children}</h1>;
    return children;
  }, [children]);
  return (
    <div className={classes} {...rest}>
      {childrenWithHeading}
    </div>
  );
};

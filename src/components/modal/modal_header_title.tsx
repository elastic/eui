/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, ElementType } from 'react';
import classnames from 'classnames';

import { EuiTitle, EuiTitleProps } from '../title';

export type EuiModalHeaderTitleProps = FunctionComponent<
  Omit<EuiTitleProps, 'children'> &
    HTMLAttributes<HTMLHeadingElement> & {
      /**
       * The tag to render. Can be changed to a lower heading
       * level like `h2` or a container `div`.
       * @default h1
       */
      component?: ElementType;
    }
>;

export const EuiModalHeaderTitle: EuiModalHeaderTitleProps = ({
  className,
  children,
  component: Component = 'h1',
  ...rest
}) => {
  const classes = classnames('euiModalHeader__title', className);

  return (
    <EuiTitle size="m" className={classes} {...rest}>
      <Component>{children}</Component>
    </EuiTitle>
  );
};

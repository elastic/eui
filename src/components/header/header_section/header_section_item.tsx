/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';

type Border = 'left' | 'right' | 'none';

const borderToClassNameMap: { [border in Border]: string | undefined } = {
  left: 'euiHeaderSectionItem--borderLeft',
  right: 'euiHeaderSectionItem--borderRight',
  none: undefined,
};

export type EuiHeaderSectionItemProps = CommonProps & {
  /**
   * Side to display a short border on.
   * Not supported in Amsterdam theme.
   */
  border?: Border;
  /**
   * ReactNode to render as this component's content
   */
  children?: ReactNode;
};

export const EuiHeaderSectionItem: FunctionComponent<EuiHeaderSectionItemProps> = ({
  border = 'left',
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiHeaderSectionItem',
    borderToClassNameMap[border],
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

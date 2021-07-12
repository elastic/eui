/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';

type HeaderSectionSide = 'left' | 'right';

const sideToClassNameMap: { [side in HeaderSectionSide]: string } = {
  left: 'euiHeaderSection--left',
  right: 'euiHeaderSection--right',
};

export type EuiHeaderSectionProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    side?: HeaderSectionSide;
    grow?: boolean;
  };

export const EuiHeaderSection: FunctionComponent<EuiHeaderSectionProps> = ({
  side = 'left',
  children,
  className,
  grow = false,
  ...rest
}) => {
  const classes = classNames(
    'euiHeaderSection',
    {
      'euiHeaderSection--grow': grow,
      'euiHeaderSection--dontGrow': !grow,
    },
    sideToClassNameMap[side],
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

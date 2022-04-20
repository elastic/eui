/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  CSSProperties,
} from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

export type EuiAspectRatioProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /**
     * Aspect ratio height. For example 9 would be widescreen video.
     */
    height: number;
    /**
     * Aspect ratio width. For example 16 would be widescreen video.
     */
    width: number;
    /**
     * The maximum width you want the child to stretch to.
     */
    maxWidth?: CSSProperties['width'];
    children: ReactElement<any>;
  };

export const EuiAspectRatio: FunctionComponent<EuiAspectRatioProps> = ({
  children,
  className,
  height,
  width,
  maxWidth,
  ...rest
}) => {
  const classes = classNames('euiAspectRatio', className);

  const euiAspectRatioStyle = {
    aspectRatio: `${width} / ${height}`,
    height: '100%',
    width: '100%',
  };

  const props = {
    className: classes,
    style: euiAspectRatioStyle,
    ...rest,
  };

  const content = React.cloneElement(children, props);
  let contentwithoptionalwrap = content;
  if (maxWidth) {
    contentwithoptionalwrap = (
      <div style={{ maxWidth: maxWidth }}>{content}</div>
    );
  }

  return contentwithoptionalwrap;
};

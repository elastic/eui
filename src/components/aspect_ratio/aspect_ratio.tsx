/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ReactElement,
  CSSProperties,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { logicalStyles } from '../../global_styling';

export type EuiAspectRatioProps = {
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
  height,
  width,
  maxWidth,
}) => {
  const classes = classNames('euiAspectRatio', children.props.className);

  const euiAspectRatioStyle = useMemo(
    () =>
      logicalStyles({
        aspectRatio: `${width} / ${height}`,
        height: 'auto',
        width: '100%',
        maxWidth,
      }),
    [height, width, maxWidth]
  );

  return React.cloneElement(children, {
    className: classes,
    style: { ...children.props.style, ...euiAspectRatioStyle },
  });
};

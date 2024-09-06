/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, isValidElement } from 'react';
import { cloneElementWithCss } from '../../services';
import type { SharedTextProps, CloneElement, EuiTextAlignment } from './types';
import { euiTextAlignStyles as styles } from './text_align.styles';

export const ALIGNMENTS = ['left', 'right', 'center'] as const;
export type TextAlignment = (typeof ALIGNMENTS)[number];

export type EuiTextAlignProps = SharedTextProps &
  CloneElement &
  EuiTextAlignment;

export const EuiTextAlign: FunctionComponent<EuiTextAlignProps> = ({
  children,
  component: Component = 'div',
  textAlign = 'left',
  cloneElement = false,
  ...rest
}) => {
  const cssStyles = [styles.euiTextAlign, styles[textAlign]];

  const props = { css: cssStyles, ...rest };

  if (isValidElement(children) && cloneElement) {
    return cloneElementWithCss(children, props);
  } else {
    return <Component {...props}>{children}</Component>;
  }
};

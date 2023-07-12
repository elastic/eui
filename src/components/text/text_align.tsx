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
  isValidElement,
} from 'react';
import { CommonProps } from '../common';
import { cloneElementWithCss } from '../../services';

import { euiTextAlignStyles } from './text_align.styles';

export const ALIGNMENTS = ['left', 'right', 'center'] as const;
export type TextAlignment = (typeof ALIGNMENTS)[number];

export type EuiTextAlignProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    textAlign?: TextAlignment;
    /**
     * Applies text styling to the child element instead of rendering a parent wrapper `div`.
     * Can only be used when wrapping a *single* child element/tag, and not raw text.
     */
    cloneElement?: boolean;
  };

export const EuiTextAlign: FunctionComponent<EuiTextAlignProps> = ({
  children,
  textAlign = 'left',
  cloneElement = false,
  ...rest
}) => {
  const styles = euiTextAlignStyles();
  const cssStyles = [styles.euiTextAlign, styles[textAlign]];

  const props = { css: cssStyles, ...rest };

  if (isValidElement(children) && cloneElement) {
    return cloneElementWithCss(children, props);
  } else {
    return <div {...props}>{children}</div>;
  }
};

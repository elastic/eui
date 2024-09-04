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

import { euiTextAlignStyles as styles } from './text_align.styles';

export const ALIGNMENTS = ['left', 'right', 'center'] as const;
export type TextAlignment = (typeof ALIGNMENTS)[number];

export type EuiTextAlignProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * The HTML element/tag to render
     * Use with care when nesting multiple components to ensure valid html.
     * Block elements can't be nested inside inline elements. (<p> and <div> are not valid inside <span>)
     * Additionally <div> is not valid to use inside <p>.
     */
    component?: 'div' | 'span' | 'p';
    textAlign?: TextAlignment;
    /**
     * Applies text styling to the child element instead of rendering a parent wrapper `div`.
     * Can only be used when wrapping a *single* child element/tag, and not raw text.
     */
    cloneElement?: boolean;
  };

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

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { HTMLAttributes, CSSProperties } from 'react';
import type { CommonProps } from '../common';

import type { TextColor } from './text_color';
import type { TextAlignment } from './text_align';

export type SharedTextProps = CommonProps &
  Omit<HTMLAttributes<HTMLElement>, 'color'> & {
    /**
     * The HTML element/tag to render.
     * Use with care when nesting multiple components to ensure valid XHTML:
     * - `<div>` and other block tags are not valid to use inside `<p>`. If using the `<p>` tag, we recommend passing strings/text only.
     * - `<span>` is valid to be nested in any tag, and can have any tag nested within it.
     */
    component?: 'div' | 'span' | 'p';
  };

export type CloneElement = {
  /**
   * Applies text styling to the child element instead of rendering a parent wrapper.
   * Can only be used when wrapping a *single* child element/tag, and not raw text.
   */
  cloneElement?: boolean;
};

export type EuiTextColors = {
  /**
   * Any of our named colors or a `hex`, `rgb` or `rgba` value.
   * @default inherit
   */
  color?: TextColor | CSSProperties['color'];
};

export type EuiTextAlignment = {
  /**
   * Applies horizontal text alignment
   * @default left
   */
  textAlign?: TextAlignment;
};

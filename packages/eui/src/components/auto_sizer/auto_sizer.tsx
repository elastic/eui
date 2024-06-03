/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { ComponentProps } from 'react';
import type {
  Size,
  HorizontalSize,
  VerticalSize,
} from 'react-virtualized-auto-sizer';

export type EuiAutoSizerProps = ComponentProps<typeof AutoSizer>;
export type EuiAutoSize = Size;
export type EuiAutoSizeHorizontal = HorizontalSize;
export type EuiAutoSizeVertical = VerticalSize;

import AutoSizer from 'react-virtualized-auto-sizer';

export class EuiAutoSizer extends AutoSizer {}

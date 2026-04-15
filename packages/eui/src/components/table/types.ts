/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * @internal
 */
export interface EuiTableSharedWidthProps {
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
}

/**
 * @internal
 */
export interface EuiTableStickyCellOptions {
  /**
   * The side the cell should stick to.
   * In horizontal writing-mode, `start` equals the left side and `end`
   * the right side.
   */
  side: 'start' | 'end';
}

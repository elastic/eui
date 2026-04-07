/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Util to calculate (virtualized) selection list item size
 */
export const getListItemSize = (
  index: number,
  rowHeight: number,
  isGroupLabel: boolean
): number => {
  if (isGroupLabel && index > 0) {
    return rowHeight + 16; // 16px = the additional 2 * 8px padding of the divider line
  }
  return rowHeight;
};

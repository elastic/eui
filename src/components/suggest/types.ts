/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const ALL_STATUS = ['unsaved', 'saved', 'unchanged', 'loading'] as const;
type StatusTuple = typeof ALL_STATUS;
export type EuiSuggestStatus = StatusTuple[number];

export interface _Status {
  icon?: string;
  color?: string;
  tooltip?: string;
}

export interface _EuiSuggestStatusMap {
  unsaved: _Status;
  saved: _Status;
  unchanged: _Status;
  loading: _Status;
}

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const MODE_EDITING = 'editing' as const;
export const MODE_VIEWING = 'viewing' as const;

export type MARKDOWN_MODE = typeof MODE_EDITING | typeof MODE_VIEWING;

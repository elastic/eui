/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

export const MODE_EDITING = 'editing' as const;
export const MODE_VIEWING = 'viewing' as const;

export type MARKDOWN_MODE = typeof MODE_EDITING | typeof MODE_VIEWING;

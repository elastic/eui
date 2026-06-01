/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const COLORS = ['primary', 'success', 'warning', 'danger'] as const;
export type EuiCallOutColor = (typeof COLORS)[number];

export const SIZES = ['s', 'm'] as const;
export type EuiCallOutSize = (typeof SIZES)[number];

export const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'] as const;
export type EuiCallOutHeading = (typeof HEADINGS)[number];

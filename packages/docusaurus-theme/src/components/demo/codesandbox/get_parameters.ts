/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { compressToBase64 } from 'lz-string';

/**
 * Encodes sandbox parameters for CodeSandbox's `define` API.
 */
export const getParameters = (parameters: unknown): string => {
  return compressToBase64(JSON.stringify(parameters))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

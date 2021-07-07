/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { isNil } from '../predicate';

interface FormatTextOptions {
  nil: string;
}

export const formatText = (
  value?: any,
  options: Partial<FormatTextOptions> = { nil: '' }
) => {
  return isNil(value) ? options.nil : value.toString();
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
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

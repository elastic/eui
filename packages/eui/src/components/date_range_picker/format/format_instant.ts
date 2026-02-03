/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dateMath from '@elastic/datemath';

import { DEFAULT_DATE_FORMAT } from '../constants';

/**
 * Format a date string into something readable e.g. RFC 2822-ish
 */
export function dateStringToText(
  dateString: string,
  dateFormat: string = DEFAULT_DATE_FORMAT
) {
  const parsed = dateMath.parse(dateString);
  return parsed?.isValid ? parsed.format(dateFormat) : dateString;
}

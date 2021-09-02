/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { v1 as uuidv1 } from 'uuid';
import { useMemo } from 'react';

/**
 * This function returns a function to generate ids.
 * This can be used to generate unique, but predictable ids to pair labels
 * with their inputs. It takes an optional prefix as a parameter. If you don't
 * specify it, it generates a random id prefix. If you specify a custom prefix
 * it should begin with an letter to be HTML4 compliant.
 */
export function htmlIdGenerator(idPrefix: string = '') {
  const staticUuid = uuidv1();
  return (idSuffix: string = '') => {
    const prefix = `${idPrefix}${idPrefix !== '' ? '_' : 'i'}`;
    const suffix = idSuffix ? `_${idSuffix}` : '';
    return `${prefix}${suffix ? staticUuid : uuidv1()}${suffix}`;
  };
}

/**
 * Generates an ID within a static ref object that remains static
 * until the component using it is unmounted. This prevents IDs from
 * being re-randomized on every component update.
 */
export const useGeneratedHtmlId = ({
  idFromProps,
  prefix,
  suffix,
}: {
  idFromProps?: string;
  prefix?: string;
  suffix?: string;
} = {}) => {
  return useMemo<string>(() => {
    return idFromProps || htmlIdGenerator(prefix)(suffix);
  }, [idFromProps, prefix, suffix]);
};

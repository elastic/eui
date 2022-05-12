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
 * Generates a memoized ID that remains static until component unmount.
 * This prevents IDs from being re-randomized on every component update.
 */
export type UseGeneratedHtmlIdOptions = {
  /**
   * Optional prefix to prepend to the generated ID
   */
  prefix?: string;
  /**
   * Optional suffix to append to the generated ID
   */
  suffix?: string;
  /**
   * Optional conditional ID to use instead of a randomly generated ID.
   * Typically used by EUI components where IDs can be passed in as custom props
   */
  conditionalId?: string;
};
export const useGeneratedHtmlId = ({
  prefix,
  suffix,
  conditionalId,
}: UseGeneratedHtmlIdOptions = {}) => {
  return useMemo<string>(() => {
    return conditionalId || htmlIdGenerator(prefix)(suffix);
  }, [conditionalId, prefix, suffix]);
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useMemo } from 'react';
import { v1 as uuidv1 } from 'uuid';

import { warnOnce } from '../console';

/**
 * IDs containing whitespace are invalid HTML, and silently break attributes
 * that take a space-separated list of ID references (`aria-controls`,
 * `aria-labelledby`, `aria-describedby`, `for`), as each "word" is then parsed
 * as a separate reference to a non-existent element.
 *
 * This most commonly happens when a human-readable or localized string is
 * passed as a prefix/suffix, so warn consumers as early as possible.
 */
const warnOnWhitespace = (value?: string) => {
  if (process.env.NODE_ENV === 'production') return;

  if (value && /\s/.test(value)) {
    warnOnce(
      `generatedHtmlIdWhitespace:${value}`,
      `[EUI] Generated HTML ID: "${value}" contains whitespace, which generates an invalid HTML id ` +
        'and breaks attributes referencing it, such as `aria-controls` or `for`. ' +
        'Pass a static identifier instead of a human-readable or localized string.'
    );
  }
};

/**
 * This function returns a function to generate ids.
 * This can be used to generate unique, but predictable ids to pair labels
 * with their inputs. It takes an optional prefix as a parameter. If you don't
 * specify it, it generates a random id prefix. If you specify a custom prefix
 * it should begin with an letter to be HTML4 compliant.
 */
export function htmlIdGenerator(idPrefix: string = '') {
  const staticUuid = uuidv1();
  warnOnWhitespace(idPrefix);
  return (idSuffix: string = '') => {
    warnOnWhitespace(idSuffix);
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

// We can remove this deprecated hook once EUI no longer needs to support React 16-17
const useDeprecatedGeneratedHtmlId = ({
  prefix,
  suffix,
  conditionalId,
}: UseGeneratedHtmlIdOptions = {}) => {
  return useMemo<string>(() => {
    return conditionalId || htmlIdGenerator(prefix)(suffix);
  }, [conditionalId, prefix, suffix]);
};

const useNewGeneratedHtmlId = ({
  prefix = '',
  suffix = '',
  conditionalId,
}: UseGeneratedHtmlIdOptions = {}) => {
  // Using the default export and dot notation here is intentional
  // to prevent React <18 import errors.
  const id = React.useId();

  return useMemo<string>(() => {
    if (conditionalId) return conditionalId;

    // Memoized so that the check only runs when the prefix/suffix change,
    // as this hook is called on virtually every EUI render
    warnOnWhitespace(prefix);
    warnOnWhitespace(suffix);

    return `${prefix}${id}${suffix}`;
  }, [id, conditionalId, prefix, suffix]);
};

export const useGeneratedHtmlId =
  'useId' in React ? useNewGeneratedHtmlId : useDeprecatedGeneratedHtmlId;

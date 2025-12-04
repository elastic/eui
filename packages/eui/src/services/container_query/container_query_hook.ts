/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEffect, useState, useRef } from 'react';
import { matchContainer } from './match_container';

/**
 * React hook that subscribes to CSS container query changes.
 *
 * (relies on a polyfill of an API proposal in W3C CSS WG {@link https://github.com/w3c/csswg-drafts/issues/6205})
 *
 * @param containerCondition - A CSS `<container-condition>` string, e.g. `(width > 400px)` or `(min-width: 600px)`
 * @param name - Optional container name, e.g. `sidebar`
 * @returns `true` if the container matches the condition, `false` otherwise
 *
 * @example
 * ```ts
 * const ref = useRef<HTMLDivElement>(null);
 * const isWide = useEuiContainerQuery(ref, '(width > 400px)');
 * const isSidebarWide = useEuiContainerQuery(ref, '(min-width: 300px)', 'sidebar');
 * ```
 *
 * @todo document that a proper container is needed and that the actual container cannot be observed!
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container | MDN: @container}
 */
export function useEuiContainerQuery<T extends Element>(
  containerCondition: string,
  name?: string
) {
  const containerQueryString = name
    ? `${name} ${containerCondition}`
    : containerCondition;
  const ref = useRef<T | null>(null);
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) return;

    const cql = matchContainer(ref.current, containerQueryString);

    // Set the initial value
    setMatches(cql.matches);

    const handleChange = () => {
      console.log('handleChange!', cql.matches);
      setMatches(cql.matches);
    };

    cql.addEventListener('change', handleChange);

    return () => {
      cql.removeEventListener('change', handleChange);
    };
  }, [ref, containerQueryString]);

  return { ref, matches };
}

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
 * For this to work:
 * - a proper container (an element with e.g. `container-type: inline-size`) is needed, and
 * - the container MUST to be a parent of the element being observed
 *
 * @param containerCondition - A CSS `<container-condition>` string, e.g. `(width > 400px)` or `(min-width: 600px)`
 * @param name - Optional container name, e.g. `sidebar`
 * @returns An object containing:
 *   - `ref`: A ref to attach to the container element
 *   - `matches`: `true` if the container matches the condition, `false` otherwise
 *
 * @example
 * ```tsx
 * const { ref, matches } = useEuiContainerQuery('(width > 400px)');
 * return <div ref={ref}>{matches ? 'Wide' : 'Narrow'}</div>;
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container | MDN: @container}
 * @beta
 */
export function useEuiContainerQuery<T extends HTMLElement = HTMLElement>(
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

    const queryList = matchContainer(ref.current, containerQueryString);
    const handleChange = () => {
      setMatches(queryList.matches);
    };

    setMatches(queryList.matches);
    queryList.addEventListener('change', handleChange);

    return () => {
      queryList.removeEventListener('change', handleChange);
      queryList.dispose();
    };
  }, [ref, containerQueryString]);

  return { ref, matches };
}

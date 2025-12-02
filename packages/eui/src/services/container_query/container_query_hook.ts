/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  RefObject,
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react';
import './match_container_polyfill.js';

/**
 * React hook that subscribes to CSS container query changes.
 *
 * (relies on a polyfill of an API proposal in W3C CSS WG {@link https://github.com/w3c/csswg-drafts/issues/6205})
 *
 * @param ref - A ref containing the DOM element to query against
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
 * @todo document that a proper container is needed!
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@container | MDN: @container}
 */
export function useEuiContainerQuery(
  ref: RefObject<HTMLElement | null>,
  containerCondition: string,
  name?: string
): boolean {
  const containerQueryString = name
    ? `${name} ${containerCondition}`
    : containerCondition;
  const [cql, setCql] = useState<ContainerQueryList | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    setCql(ref.current.matchContainer(containerQueryString));
  }, [ref, containerQueryString]);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!cql) return () => {};
      cql.addEventListener('change', onStoreChange);
      return () => {
        cql.removeEventListener('change', onStoreChange);
      };
    },
    [cql]
  );

  const getSnapshot = useCallback(() => {
    if (!cql) return false;
    return cql.matches;
  }, [cql]);

  return useSyncExternalStore(subscribe, getSnapshot);
}

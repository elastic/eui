/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode, useCallback, useEffect, useRef } from 'react';

import { useObserver } from '../observer';

export interface EuiMutationObserverProps {
  /**
   * ReactNode to render as this component's content
   */
  children: (ref: (e: HTMLElement | null) => void) => ReactNode;
  onMutation: MutationCallback;
  observerOptions?: MutationObserverInit;
}

export const EuiMutationObserver: React.FunctionComponent<
  EuiMutationObserverProps
> = ({ children, onMutation, observerOptions }) => {
  // Store onMutation and observerOptions in refs so the observer callback
  // and setup always use the latest prop values without needing to
  // re-subscribe (which would cause the ref callback to cycle)
  const onMutationRef = useRef<MutationCallback>(onMutation);
  onMutationRef.current = onMutation;

  const observerOptionsRef = useRef(observerOptions);
  observerOptionsRef.current = observerOptions;

  const mutationCallback: MutationCallback = useCallback(
    (records, observer) => {
      onMutationRef.current(records, observer);
    },
    []
  );

  const beginObserve = useCallback(
    (node: Element) =>
      makeMutationObserver(node, observerOptionsRef.current, mutationCallback),
    [mutationCallback]
  );

  const updateChildNode = useObserver(beginObserve, 'EuiMutationObserver');

  return children(updateChildNode) as React.ReactElement;
};

const makeMutationObserver = (
  node: Element,
  _observerOptions: MutationObserverInit | undefined,
  callback: MutationCallback
) => {
  // The MutationObserver polyfill used in Kibana (for Jest) implements
  // an older spec in which specifying `attributeOldValue` or `attributeFilter`
  // without specifying `attributes` results in a `SyntaxError`.
  // The following logic patches the newer spec in which `attributes: true` can be
  // implied when appropriate (`attributeOldValue` or `attributeFilter` is specified).
  const observerOptions: MutationObserverInit = {
    ..._observerOptions,
  };
  const needsAttributes =
    observerOptions.hasOwnProperty('attributeOldValue') ||
    observerOptions.hasOwnProperty('attributeFilter');
  if (needsAttributes && !observerOptions.hasOwnProperty('attributes')) {
    observerOptions.attributes = true;
  }

  const observer = new MutationObserver(callback);
  observer.observe(node, observerOptions);

  return observer;
};

export const useMutationObserver = (
  container: Element | null,
  callback: MutationCallback,
  observerOptions?: MutationObserverInit
) => {
  useEffect(
    () => {
      if (container != null) {
        const observer = makeMutationObserver(
          container,
          observerOptions,
          callback
        );
        return () => observer.disconnect();
      }
    },
    // ignore changing observerOptions
    // eslint-disable-next-line
    [container, callback]
  );
};

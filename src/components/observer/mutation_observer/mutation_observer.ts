/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ReactNode, useEffect } from 'react';

import { EuiObserver } from '../observer';

export interface EuiMutationObserverProps {
  /**
   * ReactNode to render as this component's content
   */
  children: (ref: (e: HTMLElement | null) => void) => ReactNode;
  onMutation: MutationCallback;
  observerOptions?: MutationObserverInit;
}

export class EuiMutationObserver extends EuiObserver<EuiMutationObserverProps> {
  name = 'EuiMutationObserver';

  // the `onMutation` prop may change while the observer is bound, abstracting
  // it out into a separate function means the current `onMutation` value is used
  onMutation: MutationCallback = (records, observer) => {
    this.props.onMutation(records, observer);
  };

  beginObserve = () => {
    const childNode = this.childNode!;
    this.observer = makeMutationObserver(
      childNode,
      this.props.observerOptions,
      this.onMutation
    );
  };
}

const makeMutationObserver = (
  node: Element,
  _observerOptions: MutationObserverInit | undefined,
  callback: MutationCallback
) => {
  // IE11 and the MutationObserver polyfill used in Kibana (for Jest) implement
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

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiComponentDefaults } from '../../components/provider';

type RepositionOnScrollArgs = {
  /**
   * The key for the component's defaults in the context.
   */
  componentName: keyof EuiComponentDefaults;
  /**
   * The component's `repositionOnScroll` prop.
   */
  prop: boolean | undefined;
  /**
   * The function to be called on scroll to reposition the component.
   */
  repositionFn: () => void;
  /**
   * The component's defaults context.
   */
  context?: EuiComponentDefaults;
};

/**
 * Returns the value of the `repositionOnScroll` from the props, component's defaults context
 * or default to `false`.
 *
 * @param args The arguments for `getRepositionOnScroll`. See {@link RepositionOnScrollArgs}.
 * @returns The value of the `repositionOnScroll`.
 */
export const getRepositionOnScroll = (
  args: RepositionOnScrollArgs
): boolean => {
  const { prop, context, componentName } = args;

  if (
    context?.[componentName] &&
    'repositionOnScroll' in context[componentName] &&
    typeof context[componentName].repositionOnScroll === 'boolean'
  ) {
    const contextValue = context?.[componentName]?.repositionOnScroll;

    return prop ?? contextValue ?? false;
  }

  return prop ?? false;
};

/**
 * Creates a manager for handling `repositionOnScroll` logic in overlay components.
 * This utility abstracts the adding, updating, and removing of window scroll event listeners.
 *
 * @param getArgs A function that returns the arguments for `getRepositionOnScroll`. See {@link RepositionOnScrollArgs}.
 * @returns An object with `subscribe`, `update`, and `cleanup` methods to manage the scroll listener.
 */
export const createRepositionOnScroll = (
  getArgs: () => RepositionOnScrollArgs
) => {
  let lastResolvedRepositionOnScroll: boolean | undefined;

  const subscribe = () => {
    const repositionOnScroll = getRepositionOnScroll(getArgs());

    lastResolvedRepositionOnScroll = repositionOnScroll;
    if (repositionOnScroll) {
      window.addEventListener('scroll', getArgs().repositionFn, true);
    }
  };

  const update = () => {
    const repositionOnScroll = getRepositionOnScroll(getArgs());

    if (lastResolvedRepositionOnScroll !== repositionOnScroll) {
      if (repositionOnScroll) {
        window.addEventListener('scroll', getArgs().repositionFn, true);
      } else {
        window.removeEventListener('scroll', getArgs().repositionFn, true);
      }
      lastResolvedRepositionOnScroll = repositionOnScroll;
    }
  };

  const cleanup = () => {
    window.removeEventListener('scroll', getArgs().repositionFn, true);
  };

  return { subscribe, update, cleanup };
};

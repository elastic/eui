/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

type SupportedComponentDefaults = {
  repositionOnScroll?: boolean;
};

type RepositionOnScrollArgs<T extends SupportedComponentDefaults> = {
  /**
   * The component's `repositionOnScroll` prop.
   */
  repositionOnScroll?: boolean;
  /**
   * The function to be called on scroll to reposition the component.
   */
  repositionFn: () => void;
  /**
   * The component's defaults context.
   */
  componentDefaults?: T;
};

/**
 * Returns the value of the `repositionOnScroll` from the props, component's defaults context
 * or default to `false`.
 *
 * @param args The arguments for `getRepositionOnScroll`. See {@link RepositionOnScrollArgs}.
 * @returns The value of the `repositionOnScroll`.
 */
export const getRepositionOnScroll = <T extends SupportedComponentDefaults>(
  args: RepositionOnScrollArgs<T>
): boolean => {
  const { repositionOnScroll, componentDefaults } = args;

  if (repositionOnScroll !== undefined) return repositionOnScroll;

  if (
    componentDefaults &&
    'repositionOnScroll' in componentDefaults &&
    typeof componentDefaults.repositionOnScroll === 'boolean'
  ) {
    const contextValue = componentDefaults.repositionOnScroll;

    return contextValue ?? false;
  }

  return false;
};

export type CreateRepositionOnScrollReturnType = {
  subscribe: () => void;
  update: () => void;
  cleanup: () => void;
};

/**
 * Creates a manager for handling `repositionOnScroll` logic in overlay components.
 * This utility abstracts the adding, updating, and removing of window scroll event listeners.
 *
 * @param getArgs A function that returns the arguments for `getRepositionOnScroll`. See {@link RepositionOnScrollArgs}.
 * @returns An object with `subscribe`, `update`, and `cleanup` methods to manage the scroll listener.
 */
export const createRepositionOnScroll = <T extends SupportedComponentDefaults>(
  getArgs: () => RepositionOnScrollArgs<T>
): CreateRepositionOnScrollReturnType => {
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

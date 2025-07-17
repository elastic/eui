/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  createContext,
  useReducer,
  ReactNode,
  useCallback,
} from 'react';
import { generateManagedFlyoutId } from './eui_flyout';
import type {
  ManagedFlyoutContextValue,
  RenderedManagedFlyout,
  RenderManagedFlyoutParams,
  RenderManagedFlyoutCallback,
  RenderManagedFlyoutProps,
} from './types';
import { reducer, initialState } from './reducer';

/**
 * Context for managing flyouts.
 */
export const ManagedFlyoutContext = createContext<
  ManagedFlyoutContextValue | undefined
>(undefined);

/**
 * Provider component for ManagedFlyout context.
 */
export const ManagedFlyoutProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [renderedManagedFlyouts, setRenderedManagedFlyouts] = React.useState<
    RenderedManagedFlyout[]
  >([]);

  /**
   * Add a new flyout and set it as active.
   */
  const addManagedFlyout = useCallback(
    (id: string, meta?: Record<string, any>) => {
      if (state.flyouts.find((f) => f.id === id)) {
        return;
      }
      dispatch({ type: 'ADD_FLYOUT', id, meta });
      dispatch({ type: 'SET_ACTIVE', id });
    },
    [state.flyouts, dispatch]
  );

  /**
   * Close a flyout by id. Activates the last flyout if any remain.
   */
  const closeManagedFlyout = useCallback(
    (id: string) => {
      dispatch({ type: 'CLOSE_FLYOUT', id });
      setRenderedManagedFlyouts((prev) => prev.filter((f) => f.id !== id));

      // After closing, activate the last flyout if any remain
      const remainingFlyouts = state.flyouts.filter((f) => f.id !== id);

      if (remainingFlyouts.length > 0) {
        const last = remainingFlyouts.at(-1);
        if (last) {
          dispatch({ type: 'SET_ACTIVE', id: last.id });
        }
      }
    },
    [state.flyouts, dispatch]
  );

  /**
   * Returns a callback to render a managed flyout.
   */
  const createManagedFlyoutRenderer = (
    params?: RenderManagedFlyoutParams
  ): RenderManagedFlyoutCallback => {
    const { id: providedId, onClose: userOnClose } = params || {};
    const id = providedId || generateManagedFlyoutId();

    const renderer: RenderManagedFlyoutCallback = (
      fn: (props: Required<RenderManagedFlyoutProps>) => React.ReactNode
    ) => {
      if (renderedManagedFlyouts.find((f) => f.id === id)) {
        return id;
      }

      const onClose = () => {
        setRenderedManagedFlyouts((prev) => prev.filter((f) => f.id !== id));
        dispatch({ type: 'CLOSE_FLYOUT', id });
        if (userOnClose) {
          userOnClose({ type: 'internal', flyoutId: id } as any);
        }
      };

      setRenderedManagedFlyouts((prev) => [
        ...prev,
        {
          id,
          onClose,
          element: fn({ id, onClose }),
        },
      ]);
      return id;
    };

    return renderer;
  };

  return (
    <ManagedFlyoutContext.Provider
      value={{
        flyouts: state.flyouts,
        activeFlyoutId: state.activeFlyoutId,
        addManagedFlyout,
        closeManagedFlyout,
        createManagedFlyoutRenderer,
      }}
    >
      {children}
      {renderedManagedFlyouts.map(({ id, element }) => (
        <ManagedFlyoutIsRenderedProvider key={id}>
          {element}
        </ManagedFlyoutIsRenderedProvider>
      ))}
    </ManagedFlyoutContext.Provider>
  );
};

/**
 * Context to track if a flyout is rendered.
 */
export const ManagedFlyoutIsRenderedContext = createContext<boolean>(false);

/**
 * Provider to indicate a flyout is rendered.
 */
export const ManagedFlyoutIsRenderedProvider = ({
  children,
}: {
  children: ReactNode;
}) => (
  <ManagedFlyoutIsRenderedContext.Provider value={true}>
    {children}
  </ManagedFlyoutIsRenderedContext.Provider>
);

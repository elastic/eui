/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from 'react';
import { generateManagedFlyoutId } from './eui_flyout';
import { EuiFlyoutManagedBaseProps } from './eui_flyout_managed';

export interface FlyoutState {
  id: string;
  meta?: Record<string, any>;
  isActive: boolean;
}

interface FlyoutManagerState {
  flyouts: FlyoutState[];
}

const initialState: FlyoutManagerState = {
  flyouts: [],
};

type Action =
  | { type: 'ADD_FLYOUT'; id: string; meta?: Record<string, any> }
  | { type: 'CLOSE_FLYOUT'; id: string }
  | { type: 'SET_ACTIVE'; id: string };

/**
 * Reducer to manage the state of flyouts.
 * Handles adding, closing, and setting active flyouts.
 */
function reducer(
  state: FlyoutManagerState,
  action: Action
): FlyoutManagerState {
  switch (action.type) {
    case 'ADD_FLYOUT': {
      // Avoid adding duplicate flyouts
      if (state.flyouts.find((f) => f.id === action.id)) return state;

      // Add new flyout as active, set all others inactive, preserve order
      return {
        ...state,
        flyouts: [
          ...state.flyouts.map((f) => ({ ...f, isActive: false })),
          {
            id: action.id,
            meta: action.meta,
            isActive: true,
          },
        ],
      };
    }

    case 'CLOSE_FLYOUT': {
      // Remove the specified flyout
      const filtered = state.flyouts.filter((f) => f.id !== action.id);
      if (filtered.length === 0) {
        return { ...state, flyouts: [] };
      }
      // Set the last flyout as active (if any remain)
      return {
        ...state,
        flyouts: filtered.map((f, i) => ({
          ...f,
          isActive: i === filtered.length - 1,
        })),
      };
    }

    case 'SET_ACTIVE': {
      // Set the specified flyout as active, all others inactive
      return {
        ...state,
        flyouts: state.flyouts.map((f) => ({
          ...f,
          isActive: f.id === action.id,
        })),
      };
    }
    default:
      return state;
  }
}

/**
 * Props required to render a managed flyout.
 */
type RenderFlyoutProps = Pick<EuiFlyoutManagedBaseProps, 'id' | 'onClose'>;
/**
 * Optional params for creating a flyout renderer.
 */
type RenderFlyoutParams = Partial<RenderFlyoutProps>;

/**
 * Callback to render a flyout. Returns the flyout id.
 */
export type RenderFlyoutCallback = (
  fn: (props: Required<RenderFlyoutProps>) => React.ReactNode
) => string;

/**
 * A rendered flyout instance, with its element and props.
 */
interface RenderedFlyout extends RenderFlyoutProps {
  element: React.ReactNode;
}

/**
 * Context value for FlyoutManager.
 */
interface FlyoutManagerContextValue {
  flyouts: FlyoutState[];
  addFlyout: (id: string, meta?: Record<string, any>) => void;
  closeFlyout: (id: string) => void;
  createFlyoutRenderer: (params?: RenderFlyoutParams) => RenderFlyoutCallback;
}

/**
 * Context for managing flyouts.
 */
const FlyoutManagerContext = createContext<
  FlyoutManagerContextValue | undefined
>(undefined);

/**
 * Provider component for FlyoutManager context.
 */
export const FlyoutManagerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [renderedFlyouts, setRenderedFlyouts] = React.useState<
    RenderedFlyout[]
  >([]);

  /**
   * Add a new flyout and set it as active.
   */
  const addFlyout = useCallback(
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
  const closeFlyout = useCallback(
    (id: string) => {
      dispatch({ type: 'CLOSE_FLYOUT', id });
      setRenderedFlyouts((prev) => prev.filter((f) => f.id !== id));

      // After closing, activate the last flyout if any remain
      setTimeout(() => {
        if (state.flyouts.length > 1) {
          const last = state.flyouts.filter((f) => f.id !== id).at(-1);
          if (last) {
            dispatch({ type: 'SET_ACTIVE', id: last.id });
          }
        }
      });
    },
    [state.flyouts, dispatch]
  );

  /**
   * Returns a callback to render a managed flyout.
   */
  const createFlyoutRenderer = (
    params?: RenderFlyoutParams
  ): RenderFlyoutCallback => {
    const { id: providedId, onClose: userOnClose } = params || {};
    const id = providedId || generateManagedFlyoutId();

    const renderer: RenderFlyoutCallback = (
      fn: (props: Required<RenderFlyoutProps>) => React.ReactNode
    ) => {
      if (renderedFlyouts.find((f) => f.id === id)) {
        return id;
      }

      const onClose = () => {
        setRenderedFlyouts((prev) => prev.filter((f) => f.id !== id));
        dispatch({ type: 'CLOSE_FLYOUT', id });
        if (userOnClose) {
          userOnClose({ type: 'internal', flyoutId: id } as any);
        }
      };

      setRenderedFlyouts((prev) => [
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
    <FlyoutManagerContext.Provider
      value={{
        flyouts: state.flyouts,
        addFlyout,
        closeFlyout,
        createFlyoutRenderer,
      }}
    >
      {children}
      {renderedFlyouts.map(({ id, element }) => (
        <FlyoutIsRenderedProvider key={id}>{element}</FlyoutIsRenderedProvider>
      ))}
    </FlyoutManagerContext.Provider>
  );
};

/**
 * Context to track if a flyout is rendered.
 */
const FlyoutIsRenderedContext = createContext<boolean>(false);

/**
 * Provider to indicate a flyout is rendered.
 */
const FlyoutIsRenderedProvider = ({ children }: { children: ReactNode }) => (
  <FlyoutIsRenderedContext.Provider value={true}>
    {children}
  </FlyoutIsRenderedContext.Provider>
);

/**
 * Hook to determine if a flyout is rendered in the tree.
 */
export const useIsFlyoutRendered = () => useContext(FlyoutIsRenderedContext);

/**
 * Hook to access the FlyoutManager context.
 * Throws if not within a FlyoutManagerProvider.
 */
export const useFlyoutManager = () => {
  const ctx = useContext(FlyoutManagerContext);
  if (!ctx) {
    throw new Error(
      'useFlyoutManager must be used within a FlyoutManagerProvider'
    );
  }
  return ctx;
};

/**
 * Hook to get a flyout renderer callback.
 */
export const useCreateFlyoutRenderer = (params?: RenderFlyoutParams) =>
  useFlyoutManager().createFlyoutRenderer(params);

/**
 * Hook to check if a flyout with the given id is registered.
 */
export const useIsRegistered = (id: string) => {
  const { flyouts } = useFlyoutManager();
  return flyouts.some((f) => f.id === id);
};

/**
 * Hook to check if a flyout with the given id is currently active.
 */
export const useIsActive = (id: string) => {
  const { flyouts } = useFlyoutManager();
  return flyouts.some((f) => f.id === id && f.isActive);
};

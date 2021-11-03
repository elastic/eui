/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  useMemo,
  useReducer,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from 'react';

import { assertNever } from '../common';
import {
  EuiResizablePanelController,
  EuiResizableButtonController,
  EuiResizableContainerRegistry,
  EuiResizableContainerState,
  EuiResizableContainerAction,
  EuiResizableContainerActions,
  ActionDragStart,
  ActionDragMove,
  ActionKeyMove,
  ActionToggle,
  ActionFocus,
} from './types';

interface Params {
  initialState: EuiResizableContainerState;
  containerRef: React.RefObject<HTMLDivElement>;
  onPanelWidthChange?: ({}: { [key: string]: number }) => any;
}

function isMouseEvent(
  event: ReactMouseEvent | ReactTouchEvent
): event is ReactMouseEvent {
  return typeof event === 'object' && 'pageX' in event && 'pageY' in event;
}

export const pxToPercent = (proportion: number, whole: number) => {
  if (whole < 1 || proportion < 0) return 0;
  return (proportion / whole) * 100;
};

export const sizesOnly = (
  panelObject: EuiResizableContainerRegistry['panels']
) => {
  return Object.values(panelObject).reduce(
    (out: { [key: string]: number }, panel) => {
      out[panel.id] = panel.size;
      return out;
    },
    {}
  );
};

const _getPanelMinSize = (panelMinSize: string, containerSize: number) => {
  let panelMinSizePercent = 0;
  const panelMinSizeInt = parseInt(panelMinSize);
  if (panelMinSize.indexOf('px') > -1) {
    panelMinSizePercent = pxToPercent(panelMinSizeInt, containerSize);
  } else if (panelMinSize.indexOf('%') > -1) {
    panelMinSizePercent = pxToPercent(
      containerSize * (panelMinSizeInt / 100),
      containerSize
    );
  }
  return panelMinSizePercent;
};

export const getPanelMinSize = (
  panelMinSize: string[],
  containerSize: number
) => {
  const paddingMin = _getPanelMinSize(panelMinSize[1], containerSize);
  const configMin = _getPanelMinSize(panelMinSize[0], containerSize);
  return Math.max(configMin, paddingMin);
};

export const getPosition = (
  event: ReactMouseEvent | ReactTouchEvent,
  isHorizontal: boolean
) => {
  const clientX = isMouseEvent(event)
    ? event.clientX
    : event.touches[0].clientX;
  const clientY = isMouseEvent(event)
    ? event.clientY
    : event.touches[0].clientY;
  return isHorizontal ? clientX : clientY;
};

const getSiblingPanel = (
  element: HTMLElement | null,
  adjacency: 'prev' | 'next'
) => {
  if (!element) return null;
  const method =
    adjacency === 'prev' ? 'previousElementSibling' : 'nextElementSibling';
  let sibling = element[method];
  while (sibling) {
    if (
      sibling.matches('.euiResizablePanel:not(.euiResizablePanel-isCollapsed)')
    ) {
      return sibling;
    }
    sibling = sibling[method];
  }
};

// lazy initialization to prevent rerender on initial interaction
const init = (state: EuiResizableContainerState) => state;

export const useContainerCallbacks = ({
  initialState,
  containerRef,
  onPanelWidthChange,
}: Params): [EuiResizableContainerActions, EuiResizableContainerState] => {
  function reducer(
    state: EuiResizableContainerState,
    action: EuiResizableContainerAction
  ): EuiResizableContainerState {
    const getContainerSize = (isHorizontal: boolean) => {
      return isHorizontal
        ? containerRef.current!.getBoundingClientRect().width
        : containerRef.current!.getBoundingClientRect().height;
    };

    const runSideEffect = (panels: EuiResizableContainerState['panels']) => {
      if (onPanelWidthChange) {
        onPanelWidthChange(sizesOnly(panels));
      }
    };

    const withSideEffect = (newState: EuiResizableContainerState) => {
      runSideEffect(newState.panels);
      return newState;
    };

    switch (action.type) {
      case 'EUI_RESIZABLE_CONTAINER_INIT': {
        const { isHorizontal } = action.payload;
        return {
          ...state,
          isHorizontal,
          containerSize: getContainerSize(isHorizontal),
        };
      }
      case 'EUI_RESIZABLE_PANEL_REGISTER': {
        const { panel } = action.payload;
        return {
          ...state,
          panels: {
            ...state.panels,
            [panel.id]: panel,
          },
        };
      }
      case 'EUI_RESIZABLE_PANEL_DEREGISTER': {
        const { panelId } = action.payload;
        return {
          ...state,
          panels: Object.values(state.panels).reduce(
            (out: EuiResizableContainerState['panels'], panel) => {
              if (panel.id !== panelId) {
                out[panel.id] = panel;
              }
              return out;
            },
            {}
          ),
        };
      }
      case 'EUI_RESIZABLE_BUTTON_REGISTER': {
        const { resizer } = action.payload;
        return {
          ...state,
          resizers: {
            ...state.resizers,
            [resizer.id]: resizer,
          },
        };
      }
      case 'EUI_RESIZABLE_BUTTON_DEREGISTER': {
        const { resizerId } = action.payload;
        return {
          ...state,
          resizers: Object.values(state.resizers).reduce(
            (out: EuiResizableContainerState['resizers'], panel) => {
              if (panel.id !== resizerId) {
                out[panel.id] = panel;
              }
              return out;
            },
            {}
          ),
        };
      }
      case 'EUI_RESIZABLE_DRAG_START': {
        const { position, prevPanelId, nextPanelId } = action.payload;
        return {
          ...state,
          isDragging: true,
          currentResizerPos: position,
          prevPanelId,
          nextPanelId,
        };
      }
      case 'EUI_RESIZABLE_DRAG_MOVE': {
        if (!state.isDragging) {
          return state;
        }
        const { position, prevPanelId, nextPanelId } = action.payload;
        const prevPanel = state.panels[prevPanelId];
        const nextPanel = state.panels[nextPanelId];
        const delta = position - state.currentResizerPos;

        const prevPanelMin = getPanelMinSize(
          prevPanel.minSize,
          state.containerSize
        );
        const nextPanelMin = getPanelMinSize(
          nextPanel.minSize,
          state.containerSize
        );
        const prevPanelSize = pxToPercent(
          prevPanel.getSizePx() + delta,
          state.containerSize
        );
        const nextPanelSize = pxToPercent(
          nextPanel.getSizePx() - delta,
          state.containerSize
        );

        if (prevPanelSize >= prevPanelMin && nextPanelSize >= nextPanelMin) {
          return withSideEffect({
            ...state,
            currentResizerPos: position,
            panels: {
              ...state.panels,
              [prevPanelId]: {
                ...state.panels[prevPanelId],
                size: prevPanelSize,
              },
              [nextPanelId]: {
                ...state.panels[nextPanelId],
                size: nextPanelSize,
              },
            },
          });
        }

        return state;
      }
      case 'EUI_RESIZABLE_KEY_MOVE': {
        const { prevPanelId, nextPanelId, direction } = action.payload;
        const prevPanel = state.panels[prevPanelId];
        const nextPanel = state.panels[nextPanelId];

        const prevPanelMin = getPanelMinSize(
          prevPanel.minSize,
          state.containerSize
        );
        const nextPanelMin = getPanelMinSize(
          nextPanel.minSize,
          state.containerSize
        );
        const prevPanelSize = pxToPercent(
          prevPanel.getSizePx() - (direction === 'backward' ? 10 : -10),
          state.containerSize
        );
        const nextPanelSize = pxToPercent(
          nextPanel.getSizePx() - (direction === 'forward' ? 10 : -10),
          state.containerSize
        );

        if (prevPanelSize >= prevPanelMin && nextPanelSize >= nextPanelMin) {
          return withSideEffect({
            ...state,
            isDragging: false,
            panels: {
              ...state.panels,
              [prevPanelId]: {
                ...state.panels[prevPanelId],
                size: prevPanelSize,
              },
              [nextPanelId]: {
                ...state.panels[nextPanelId],
                size: nextPanelSize,
              },
            },
          });
        }

        return state;
      }

      case 'EUI_RESIZABLE_TOGGLE': {
        const { options, panelId: currentPanelId } = action.payload;
        const currentPanel = state.panels[currentPanelId];
        const shouldCollapse = !currentPanel.isCollapsed;
        const panelElement = document.getElementById(currentPanelId);
        const prevResizer = panelElement!.previousElementSibling;
        const prevPanel = prevResizer
          ? prevResizer.previousElementSibling
          : null;
        const nextResizer = panelElement!.nextElementSibling;
        const nextPanel = nextResizer ? nextResizer.nextElementSibling : null;

        const resizersToDisable: { [id: string]: boolean | null } = {};
        if (prevResizer && prevPanel) {
          resizersToDisable[prevResizer.id] = state.panels[prevPanel.id]
            .isCollapsed
            ? true
            : shouldCollapse;
        }
        if (nextResizer && nextPanel) {
          resizersToDisable[nextResizer.id] = state.panels[nextPanel.id]
            .isCollapsed
            ? true
            : shouldCollapse;
        }
        let otherPanels: EuiResizableContainerRegistry['panels'] = {};
        if (
          prevPanel &&
          !state.panels[prevPanel.id].isCollapsed &&
          options.direction === 'right'
        ) {
          otherPanels[prevPanel.id] = state.panels[prevPanel.id];
        }
        if (
          nextPanel &&
          !state.panels[nextPanel.id].isCollapsed &&
          options.direction === 'left'
        ) {
          otherPanels[nextPanel.id] = state.panels[nextPanel.id];
        }
        let siblings = Object.keys(otherPanels).length;

        // A toggling sequence has occurred where an immediate sibling panel
        // has not been found. We need to move more broadly through the DOM
        // to find the next most suitable panel or space affordance.
        // Can only occur when multiple immediate sibling panels are collapsed.
        if (!siblings) {
          const maybePrevPanel = getSiblingPanel(panelElement, 'prev');
          const maybeNextPanel = getSiblingPanel(panelElement, 'next');
          const validPrevPanel = maybePrevPanel
            ? state.panels[maybePrevPanel.id]
            : null;
          const validNextPanel = maybeNextPanel
            ? state.panels[maybeNextPanel.id]
            : null;
          // Intentional, preferential redistribution order
          if (validPrevPanel && options.direction === 'right') {
            otherPanels[validPrevPanel.id] = validPrevPanel;
          } else if (validNextPanel && options.direction === 'left') {
            otherPanels[validNextPanel.id] = validNextPanel;
          } else {
            if (validPrevPanel) otherPanels[validPrevPanel.id] = validPrevPanel;
            if (validNextPanel) otherPanels[validNextPanel.id] = validNextPanel;
          }
          siblings = Object.keys(otherPanels).length;
        }

        let newPanelSize = shouldCollapse
          ? pxToPercent(
              !currentPanel.mode ? 0 : 24, // size of the default toggle button
              state.containerSize
            )
          : currentPanel.prevSize;

        const delta = shouldCollapse
          ? (currentPanel.size - newPanelSize) / siblings
          : ((newPanelSize - currentPanel.size) / siblings) * -1;

        const collapsedPanelsSize = Object.values(state.panels).reduce(
          (sum: number, panel) => {
            if (panel.id !== currentPanelId && panel.isCollapsed) {
              sum += panel.size;
            }
            return sum;
          },
          0
        );

        // A toggling sequence has occurred where a to-be-opened panel will
        // become the only open panel. Rather than reopen to its previous
        // size, give it the full width, less size occupied by collapsed panels.
        // Can only occur with external toggling.
        if (!shouldCollapse && !siblings) {
          newPanelSize = 100 - collapsedPanelsSize;
        }
        let updatedPanels: EuiResizableContainerState['panels'] = {};
        if (
          delta < 0 &&
          Object.values(otherPanels).some(
            (panel) =>
              panel.size + delta <
              getPanelMinSize(panel.minSize, state.containerSize)
          )
        ) {
          // A toggling sequence has occurred where a to-be-opened panel is
          // requesting more space than its logical sibling panel can afford.
          // Rather than choose another single panel to sacrifice space,
          // or try to pull proportionally from all availble panels
          // (neither of which is guaranteed to prevent negative resulting widths),
          // or attempt something even more complex,
          // we redistribute _all_ space evenly to non-collapsed panels
          // as something of a reset.
          // This situation can only occur when (n-1) panels are collapsed at once
          // and the most recently collapsed panel gains significant width
          // during the previously occurring collapse.
          // That is (largely), external toggling where the default logic has
          // been negated by the lack of panel mode distinction.
          otherPanels = Object.values(state.panels).reduce(
            (out: EuiResizableContainerState['panels'], panel) => {
              if (panel.id !== currentPanelId && !panel.isCollapsed) {
                out[panel.id] = {
                  ...panel,
                };
              }
              return out;
            },
            {}
          );

          newPanelSize =
            (100 - collapsedPanelsSize) / (Object.keys(otherPanels).length + 1);

          updatedPanels = Object.values(otherPanels).reduce(
            (out: EuiResizableContainerState['panels'], panel) => {
              out[panel.id] = {
                ...panel,
                size: newPanelSize,
              };
              return out;
            },
            {}
          );
        } else {
          // A toggling sequence has occurred that is standard and predictable
          updatedPanels = Object.values(otherPanels).reduce(
            (out: EuiResizableContainerState['panels'], panel) => {
              out[panel.id] = {
                ...panel,
                size: panel.size + delta,
              };
              return out;
            },
            {}
          );
        }

        return withSideEffect({
          ...state,
          panels: {
            ...state.panels,
            ...updatedPanels,
            [currentPanelId]: {
              ...state.panels[currentPanelId],
              size: newPanelSize,
              isCollapsed: shouldCollapse,
              prevSize: shouldCollapse ? currentPanel.size : newPanelSize,
            },
          },
          resizers: Object.values(state.resizers).reduce(
            (out: EuiResizableContainerState['resizers'], resizer) => {
              out[resizer.id] = {
                ...resizer,
                isFocused: false,
                isDisabled: resizersToDisable[resizer.id] ?? resizer.isDisabled,
              };
              return out;
            },
            {}
          ),
        });
      }
      case 'EUI_RESIZABLE_BUTTON_FOCUS': {
        const { resizerId } = action.payload;
        return {
          ...state,
          resizers: Object.values(state.resizers).reduce(
            (out: EuiResizableContainerState['resizers'], resizer) => {
              out[resizer.id] = {
                ...resizer,
                isFocused: resizer.id === resizerId,
              };
              return out;
            },
            {}
          ),
        };
      }
      case 'EUI_RESIZABLE_BUTTON_BLUR': {
        return {
          ...state,
          resizers: Object.values(state.resizers).reduce(
            (out: EuiResizableContainerState['resizers'], resizer) => {
              out[resizer.id] = {
                ...resizer,
                isFocused: false,
              };
              return out;
            },
            {}
          ),
        };
      }
      case 'EUI_RESIZABLE_RESET': {
        return {
          ...initialState,
          panels: state.panels,
          resizers: state.resizers,
          containerSize: state.containerSize,
        };
      }
      case 'EUI_RESIZABLE_ONCHANGE': {
        onPanelWidthChange!(sizesOnly(state.panels));
        return state;
      }
      // TODO: Implement more generic version of
      // 'EUI_RESIZABLE_DRAG_MOVE' to expose to consumers
      case 'EUI_RESIZABLE_RESIZE': {
        return state;
      }
      default:
        assertNever(action);
        return state;
    }
  }

  const [reducerState, dispatch] = useReducer(reducer, initialState, init);

  const actions: EuiResizableContainerActions = useMemo(() => {
    return {
      reset: () => dispatch({ type: 'EUI_RESIZABLE_RESET' }),
      initContainer: (isHorizontal: boolean) =>
        dispatch({
          type: 'EUI_RESIZABLE_CONTAINER_INIT',
          payload: { isHorizontal },
        }),
      registerPanel: (panel: EuiResizablePanelController) =>
        dispatch({
          type: 'EUI_RESIZABLE_PANEL_REGISTER',
          payload: { panel },
        }),
      deregisterPanel: (panelId: EuiResizablePanelController['id']) =>
        dispatch({
          type: 'EUI_RESIZABLE_PANEL_DEREGISTER',
          payload: { panelId },
        }),
      registerResizer: (resizer: EuiResizableButtonController) =>
        dispatch({
          type: 'EUI_RESIZABLE_BUTTON_REGISTER',
          payload: { resizer },
        }),
      deregisterResizer: (resizerId: EuiResizableButtonController['id']) =>
        dispatch({
          type: 'EUI_RESIZABLE_BUTTON_DEREGISTER',
          payload: { resizerId },
        }),
      dragStart: ({
        prevPanelId,
        nextPanelId,
        position,
      }: ActionDragStart['payload']) =>
        dispatch({
          type: 'EUI_RESIZABLE_DRAG_START',
          payload: { position, prevPanelId, nextPanelId },
        }),
      dragMove: ({
        prevPanelId,
        nextPanelId,
        position,
      }: ActionDragMove['payload']) =>
        dispatch({
          type: 'EUI_RESIZABLE_DRAG_MOVE',
          payload: { position, prevPanelId, nextPanelId },
        }),
      keyMove: ({
        prevPanelId,
        nextPanelId,
        direction,
      }: ActionKeyMove['payload']) =>
        dispatch({
          type: 'EUI_RESIZABLE_KEY_MOVE',
          payload: { prevPanelId, nextPanelId, direction },
        }),
      togglePanel: (
        panelId: ActionToggle['payload']['panelId'],
        options: ActionToggle['payload']['options']
      ) =>
        dispatch({
          type: 'EUI_RESIZABLE_TOGGLE',
          payload: { panelId, options },
        }),
      resizerFocus: (resizerId: ActionFocus['payload']['resizerId']) =>
        dispatch({
          type: 'EUI_RESIZABLE_BUTTON_FOCUS',
          payload: { resizerId },
        }),
      resizerBlur: () =>
        dispatch({
          type: 'EUI_RESIZABLE_BUTTON_BLUR',
        }),
    };
  }, []);

  return [actions, reducerState];
};

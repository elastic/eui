/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {
  useMemo,
  // useEffect,
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

const pxToPercent = (proportion: number, whole: number) =>
  (proportion / whole) * 100;

const sizesOnly = (panelObject: EuiResizableContainerRegistry['panels']) => {
  return Object.values(panelObject).reduce(
    (out: { [key: string]: number }, panel) => {
      out[panel.id] = panel.size;
      return out;
    },
    {}
  );
};

const getPanelMinSize = (
  panelMinSize: string,
  containerSize: number,
  resizerSize: number
) => {
  let panelMinSizePercent = 0;
  const panelMinSizeInt = parseInt(panelMinSize);
  if (panelMinSize.indexOf('px') > -1) {
    panelMinSizePercent = pxToPercent(panelMinSizeInt, containerSize);
  } else if (panelMinSize.indexOf('%') > -1) {
    panelMinSizePercent =
      panelMinSizeInt + (resizerSize / containerSize) * panelMinSizeInt;
  }
  return panelMinSizePercent;
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
      sibling.matches('.euiResizablePanel:not(.euiResizablePanel--collapsed)')
    ) {
      return sibling;
    }
    sibling = sibling[method];
  }
};

// lazy initialization to prevent rerender on ititial interaction
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
    const getContainerSize = () => {
      return state.isHorizontal
        ? containerRef.current!.getBoundingClientRect().width
        : containerRef.current!.getBoundingClientRect().height;
    };
    const getResizerButtonsSize = () => {
      // get sum of all of resizer button sizes to proper calculate panels ratio
      // const allResizers = getAllResizers();
      return Object.keys(state.resizers).reduce(
        (size, resizer) =>
          size +
          (state.isHorizontal
            ? state.resizers[resizer].ref.offsetWidth
            : state.resizers[resizer].ref.offsetHeight),
        0
      );
    };

    const runSideEffect = async (
      panels: EuiResizableContainerState['panels']
    ) => {
      if (onPanelWidthChange) {
        onPanelWidthChange(sizesOnly(panels));
      }
    };

    const withSideEffect = (newState: EuiResizableContainerState) => {
      runSideEffect(newState.panels);
      return newState;
    };

    switch (action.type) {
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
          panels: {
            ...Object.values(state.panels).reduce(
              (out: EuiResizableContainerState['panels'], panel) => {
                if (panel.id !== panelId) {
                  out[panel.id] = panel;
                }
                return out;
              },
              {}
            ),
          },
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
          resizers: {
            ...Object.values(state.resizers).reduce(
              (out: EuiResizableContainerState['resizers'], panel) => {
                if (panel.id !== resizerId) {
                  out[panel.id] = panel;
                }
                return out;
              },
              {}
            ),
          },
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
          resizersSize: getResizerButtonsSize(),
        };
      }
      case 'EUI_RESIZABLE_DRAG_MOVE': {
        const { position, prevPanelId, nextPanelId } = action.payload;
        const prevPanel = state.panels[prevPanelId];
        const nextPanel = state.panels[nextPanelId];
        const delta = position - state.currentResizerPos;
        const containerSize = getContainerSize() - state.resizersSize;
        const prevPanelMin = getPanelMinSize(
          prevPanel.minSize,
          containerSize,
          state.resizersSize
        );
        const nextPanelMin = getPanelMinSize(
          nextPanel.minSize,
          containerSize,
          state.resizersSize
        );
        const prevPanelSize = pxToPercent(
          prevPanel.getSizePx() + delta,
          containerSize
        );
        const nextPanelSize = pxToPercent(
          nextPanel.getSizePx() - delta,
          containerSize
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
        const resizersSize = getResizerButtonsSize();
        const containerSize = getContainerSize() - resizersSize;

        const prevPanelSize = pxToPercent(
          prevPanel.getSizePx() - (direction === 'backward' ? 10 : -10),
          containerSize
        );
        const nextPanelSize = pxToPercent(
          nextPanel.getSizePx() - (direction === 'forward' ? 10 : -10),
          containerSize
        );

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

      case 'EUI_RESIZABLE_TOGGLE': {
        const { options, panelId: currentPanelId } = action.payload;
        const containerSize = getContainerSize() - state.resizersSize;
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

        let newPanelSize = shouldCollapse ? 0 : currentPanel.prevSize;

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
              getPanelMinSize(panel.minSize, containerSize, state.resizersSize)
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
          // That is (largley), external toggling where the default logic has
          // been negated by the lack of panel mode distinction.
          otherPanels = {
            ...Object.values(state.panels).reduce(
              (out: EuiResizableContainerState['panels'], panel) => {
                if (panel.id !== currentPanelId && !panel.isCollapsed) {
                  out[panel.id] = {
                    ...panel,
                  };
                }
                return out;
              },
              {}
            ),
          };

          newPanelSize =
            (100 - collapsedPanelsSize) / (Object.keys(otherPanels).length + 1);

          updatedPanels = {
            ...Object.values(otherPanels).reduce(
              (out: EuiResizableContainerState['panels'], panel) => {
                out[panel.id] = {
                  ...panel,
                  size: newPanelSize,
                };
                return out;
              },
              {}
            ),
          };
        } else {
          // A toggling sequence has occurred that is standard and predictable
          updatedPanels = {
            ...Object.values(otherPanels).reduce(
              (out: EuiResizableContainerState['panels'], panel) => {
                out[panel.id] = {
                  ...panel,
                  size: panel.size + delta,
                };
                return out;
              },
              {}
            ),
          };
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
          resizers: {
            ...Object.values(state.resizers).reduce(
              (out: EuiResizableContainerState['resizers'], resizer) => {
                out[resizer.id] = {
                  ...resizer,
                  isFocused: false,
                  isDisabled:
                    resizersToDisable[resizer.id] ?? resizer.isDisabled,
                };
                return out;
              },
              {}
            ),
          },
        });
      }
      case 'EUI_RESIZABLE_BUTTON_FOCUS': {
        const { resizerId } = action.payload;
        return {
          ...state,
          resizers: {
            ...Object.values(state.resizers).reduce(
              (out: EuiResizableContainerState['resizers'], resizer) => {
                out[resizer.id] = {
                  ...resizer,
                  isFocused: resizer.id === resizerId,
                };
                return out;
              },
              {}
            ),
          },
        };
      }
      case 'EUI_RESIZABLE_BUTTON_BLUR': {
        return {
          ...state,
          resizers: {
            ...Object.values(state.resizers).reduce(
              (out: EuiResizableContainerState['resizers'], resizer) => {
                out[resizer.id] = {
                  ...resizer,
                  isFocused: false,
                };
                return out;
              },
              {}
            ),
          },
        };
      }
      case 'EUI_RESIZABLE_RESET': {
        return {
          ...initialState,
          panels: state.panels,
          resizers: state.resizers,
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

  // TODO: Handle side-effects like this?
  // useEffect(() => {
  //   if (!onPanelWidthChange) return;
  //   dispatch({
  //     type: 'EUI_RESIZABLE_ONCHANGE',
  //   });
  // }, [reducerState.panels, onPanelWidthChange]);

  const actions: EuiResizableContainerActions = useMemo(() => {
    return {
      reset: () => dispatch({ type: 'EUI_RESIZABLE_RESET' }),
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

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
  useEffect,
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
  return Object.keys(panelObject).reduce(
    (out: { [key: string]: number }, id) => {
      out[id] = panelObject[id].size;
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
            ...Object.keys(state.panels).reduce(
              (out: EuiResizableContainerState['panels'], id) => {
                if (id !== panelId) {
                  out[id] = state.panels[id];
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
            ...Object.keys(state.resizers).reduce(
              (out: EuiResizableContainerState['resizers'], id) => {
                if (id !== resizerId) {
                  out[id] = state.resizers[id];
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
          // if (onPanelWidthChange) {
          //   onPanelWidthChange({
          //     ...sizesOnly(state.panels),
          //     [prevPanelId]: prevPanelSize,
          //     [nextPanelId]: nextPanelSize,
          //   });
          // }

          return {
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
          };
        }
        return {
          ...state,
        };
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

        // if (onPanelWidthChange) {
        //   onPanelWidthChange({
        //     ...sizesOnly(state.panels),
        //     [prevPanelId]: prevPanelSize,
        //     [nextPanelId]: nextPanelSize,
        //   });
        // }

        return {
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
        };
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
        const otherPanels: EuiResizableContainerRegistry['panels'] = {};
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
        const otherPanelsKeys = Object.keys(otherPanels);
        const siblings = otherPanelsKeys.length;
        const newPanelSize = shouldCollapse
          ? Math.ceil(pxToPercent(4, containerSize)) // Based on the button size
          : currentPanel.prevSize;
        const delta = shouldCollapse
          ? (currentPanel.size - newPanelSize) / siblings
          : ((newPanelSize - currentPanel.size) / siblings) * -1;
        otherPanelsKeys.forEach((panelId) => {
          otherPanels[panelId].size = otherPanels[panelId].size + delta;
        });
        // if (onPanelWidthChange) {
        //   onPanelWidthChange({
        //     ...sizesOnly(otherPanels),
        //     [currentPanelId]: newPanelSize,
        //   });
        // }

        return {
          ...state,
          resizerHasFocus: null,
          panels: {
            ...state.panels,
            [currentPanelId]: {
              ...state.panels[currentPanelId],
              size: newPanelSize,
              isCollapsed: shouldCollapse,
              prevSize: shouldCollapse ? currentPanel.size : newPanelSize,
            },
          },
          resizers: {
            ...Object.keys(state.resizers).reduce(
              (out: EuiResizableContainerState['resizers'], id) => {
                out[id] = {
                  ...state.resizers[id],
                  isDisabled:
                    resizersToDisable[id] ?? state.resizers[id].isDisabled,
                };
                return out;
              },
              {}
            ),
          },
        };
      }
      case 'EUI_RESIZABLE_BUTTON_FOCUS': {
        const { resizerId } = action.payload;
        return {
          ...state,
          resizerHasFocus: resizerId,
        };
      }
      case 'EUI_RESIZABLE_BUTTON_BLUR': {
        return {
          ...state,
          resizerHasFocus: null,
        };
      }
      // TODO: Implement more generic version of
      // 'EUI_RESIZABLE_DRAG_MOVE' to expose to consumers
      case 'EUI_RESIZABLE_RESIZE': {
        return {
          ...state,
        };
      }
      case 'EUI_RESIZABLE_RESET': {
        return {
          ...initialState,
          resizerHasFocus: state.resizerHasFocus,
          panels: state.panels,
          resizers: state.resizers,
        };
      }
      case 'EUI_RESIZABLE_ONCHANGE': {
        onPanelWidthChange!(sizesOnly(state.panels));
        return state;
      }
      default:
        assertNever(action);
        return state;
    }
  }

  const [reducerState, dispatch] = useReducer(reducer, initialState);

  // TODO: Not sure I like this. Left the alternate effect approach in, commented
  useEffect(() => {
    if (!onPanelWidthChange) return;
    dispatch({
      type: 'EUI_RESIZABLE_ONCHANGE',
    });
  }, [reducerState.panels, onPanelWidthChange]);

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
      resize: () => dispatch({ type: 'EUI_RESIZABLE_RESIZE', payload: {} }),
    };
  }, []);

  return [actions, reducerState];
};

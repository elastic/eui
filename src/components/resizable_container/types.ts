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

import { KeyboardEvent, MouseEvent, TouchEvent } from 'react';

export interface EuiResizablePanelController {
  id: string;
  size: number;
  getSizePx: () => number;
  minSize: string;
  collapsible: boolean;
  isCollapsed: boolean;
  prevSize: number;
  position: 'first' | 'middle' | 'last';
}

export interface EuiResizableButtonController {
  id: string;
  ref: HTMLElement;
  isDisabled: boolean;
}

export interface EuiResizableContainerRegistry {
  panels: { [key: string]: EuiResizablePanelController };
  resizers: { [key: string]: EuiResizableButtonController };
  resizerHasFocus: EuiResizableContainerState['resizerHasFocus'];
}

export type EuiResizableButtonMouseEvent =
  | MouseEvent<HTMLButtonElement>
  | TouchEvent<HTMLButtonElement>;

export type EuiResizableButtonKeyDownEvent = KeyboardEvent<HTMLButtonElement>;

export interface EuiResizableContainerState {
  isDragging: boolean;
  currentResizerPos: number;
  prevPanelId: string | null;
  nextPanelId: string | null;
  resizersSize: number;
  isHorizontal?: boolean;
  panels: EuiResizableContainerRegistry['panels'];
  resizers: EuiResizableContainerRegistry['resizers'];
  resizerHasFocus: string | null;
}

interface ActionReset {
  type: 'EUI_RESIZABLE_RESET';
}

export interface ActionDragStart {
  type: 'EUI_RESIZABLE_DRAG_START';
  payload: { prevPanelId: string; nextPanelId: string; position: number };
}

export interface ActionDragMove {
  type: 'EUI_RESIZABLE_DRAG_MOVE';
  payload: { prevPanelId: string; nextPanelId: string; position: number };
}

export interface ActionKeyMove {
  type: 'EUI_RESIZABLE_KEY_MOVE';
  payload: {
    prevPanelId: string;
    nextPanelId: string;
    direction: 'forward' | 'backward';
  };
}

export interface ActionResize {
  type: 'EUI_RESIZABLE_RESIZE';
  payload: { resetTour?: boolean };
}

export interface ActionToggle {
  type: 'EUI_RESIZABLE_TOGGLE';
  payload: {
    panelId: string;
    options: any;
  };
}

interface ActionRegisterPanel {
  type: 'EUI_RESIZABLE_PANEL_REGISTER';
  payload: {
    panel: EuiResizablePanelController;
  };
}

interface ActionDeregisterPanel {
  type: 'EUI_RESIZABLE_PANEL_DEREGISTER';
  payload: {
    panelId: EuiResizablePanelController['id'];
  };
}

interface ActionRegisterResizer {
  type: 'EUI_RESIZABLE_BUTTON_REGISTER';
  payload: {
    resizer: EuiResizableButtonController;
  };
}

interface ActionDeregisterResizer {
  type: 'EUI_RESIZABLE_BUTTON_DEREGISTER';
  payload: {
    resizerId: EuiResizableButtonController['id'];
  };
}

export interface ActionFocus {
  type: 'EUI_RESIZABLE_BUTTON_FOCUS';
  payload: {
    resizerId: EuiResizableButtonController['id'];
  };
}

interface ActionBlur {
  type: 'EUI_RESIZABLE_BUTTON_BLUR';
}
interface ActionOnChange {
  type: 'EUI_RESIZABLE_ONCHANGE';
}

export type EuiResizableContainerAction =
  | ActionReset
  | ActionRegisterPanel
  | ActionDeregisterPanel
  | ActionRegisterResizer
  | ActionDeregisterResizer
  | ActionDragStart
  | ActionDragMove
  | ActionKeyMove
  | ActionResize
  | ActionToggle
  | ActionFocus
  | ActionBlur
  | ActionOnChange;

export interface EuiResizableContainerActions {
  reset: () => void;
  registerPanel: (panel: EuiResizablePanelController) => void;
  deregisterPanel: (panelId: EuiResizablePanelController['id']) => void;
  registerResizer: (resizer: EuiResizableButtonController) => void;
  deregisterResizer: (resizerId: EuiResizableButtonController['id']) => void;
  dragStart: ({
    prevPanelId,
    nextPanelId,
    position,
  }: ActionDragStart['payload']) => void;
  dragMove: ({
    prevPanelId,
    nextPanelId,
    position,
  }: ActionDragMove['payload']) => void;
  keyMove: ({
    prevPanelId,
    nextPanelId,
    direction,
  }: ActionKeyMove['payload']) => void;
  resizerFocus: (resizerId: ActionFocus['payload']['resizerId']) => void;
  resizerBlur: () => void;
  panelToggle: ({ panelId, options }: ActionToggle['payload']) => void;
  resize: (resetTour?: boolean) => void;
}

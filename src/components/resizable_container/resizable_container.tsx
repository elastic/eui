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

import React, {
  ReactNode,
  useRef,
  useCallback,
  CSSProperties,
  FunctionComponent,
  HTMLAttributes,
  ComponentType,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { keys } from '../../services';
import { EuiResizablePanelContextProvider } from './context';
import {
  EuiResizableButtonProps,
  euiResizableButtonWithControls,
} from './resizable_button';
import {
  EuiResizablePanelProps,
  euiResizablePanelWithControls,
} from './resizable_panel';
import { useContainerCallbacks, getPosition } from './helpers';
import {
  EuiResizableButtonMouseEvent,
  EuiResizableButtonKeyDownEvent,
  EuiResizableContainerState,
  EuiResizableContainerActions,
} from './types';

const containerDirections = {
  vertical: 'vertical',
  horizontal: 'horizontal',
};

export interface EuiResizableContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    CommonProps {
  /**
   * Specify the container direction
   */
  direction?: keyof typeof containerDirections;
  /**
   * Pure function which accepts Panel and Resizer components in arguments
   * and returns a component tree
   */
  children: (
    Panel: ComponentType<EuiResizablePanelProps>,
    Resizer: ComponentType<EuiResizableButtonProps>,
    actions: EuiResizableContainerActions
  ) => ReactNode;
  /**
   * Pure function which accepts an object where keys are IDs of panels, which sizes were changed,
   * and values are actual sizes in percents
   */
  onPanelWidthChange?: ({}: { [key: string]: number }) => any;
  style?: CSSProperties;
}

const initialState: EuiResizableContainerState = {
  isDragging: false,
  currentResizerPos: -1,
  prevPanelId: null,
  nextPanelId: null,
  resizersSize: 0,
  panels: {},
  resizers: {},
};

export const EuiResizableContainer: FunctionComponent<EuiResizableContainerProps> = ({
  direction = 'horizontal',
  children,
  className,
  onPanelWidthChange,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHorizontal = direction === containerDirections.horizontal;

  const classes = classNames(
    'euiResizableContainer',
    {
      'euiResizableContainer--vertical': !isHorizontal,
      'euiResizableContainer--horizontal': isHorizontal,
    },
    className
  );

  const [actions, reducerState] = useContainerCallbacks({
    initialState: { ...initialState, isHorizontal },
    containerRef,
    onPanelWidthChange,
  });

  const onMouseDown = (event: EuiResizableButtonMouseEvent) => {
    const currentTarget = event.currentTarget;
    const prevPanelId = currentTarget.previousElementSibling!.id;
    const nextPanelId = currentTarget.nextElementSibling!.id;
    const position = getPosition(event, isHorizontal);
    actions.dragStart({ position, prevPanelId, nextPanelId });
  };

  const onMouseMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!reducerState.prevPanelId || !reducerState.nextPanelId) return;
    const position = getPosition(event, isHorizontal);
    actions.dragMove({
      position,
      prevPanelId: reducerState.prevPanelId,
      nextPanelId: reducerState.nextPanelId,
    });
  };

  const onKeyDown = (event: EuiResizableButtonKeyDownEvent) => {
    const { key, currentTarget } = event;
    const shouldResizeHorizontalPanel =
      isHorizontal && (key === keys.ARROW_LEFT || key === keys.ARROW_RIGHT);
    const shouldResizeVerticalPanel =
      !isHorizontal && (key === keys.ARROW_UP || key === keys.ARROW_DOWN);
    const prevPanelId = currentTarget.previousElementSibling!.id;
    const nextPanelId = currentTarget.nextElementSibling!.id;
    let direction;
    if (key === keys.ARROW_DOWN || key === keys.ARROW_RIGHT) {
      direction = 'forward';
    }
    if (key === keys.ARROW_UP || key === keys.ARROW_LEFT) {
      direction = 'backward';
    }

    if (
      direction === 'forward' ||
      (direction === 'backward' &&
        (shouldResizeHorizontalPanel || shouldResizeVerticalPanel) &&
        prevPanelId &&
        nextPanelId)
    ) {
      event.preventDefault();
      actions.keyMove({ direction, prevPanelId, nextPanelId });
    }
  };

  const onMouseUp = () => {
    actions.reset();
  };

  const EuiResizableButton = useCallback(
    euiResizableButtonWithControls({
      onKeyDown,
      onMouseDown,
      onTouchStart: onMouseDown,
      isHorizontal,
      register: actions.registerResizer,
      deregister: actions.deregisterResizer,
    }),
    [isHorizontal]
  );

  const EuiResizablePanel = useCallback(
    euiResizablePanelWithControls({
      isHorizontal,
      register: actions.registerPanel,
      deregister: actions.deregisterPanel,
      onToggleCollapsed: (shouldCollapse: boolean, panelId: string) =>
        actions.panelToggle({ shouldCollapse, panelId }),
    }),
    [isHorizontal]
  );

  return (
    <EuiResizablePanelContextProvider
      registry={{
        panels: reducerState.panels,
        resizers: reducerState.resizers,
      }}>
      <div
        className={classes}
        ref={containerRef}
        onMouseMove={reducerState.isDragging ? onMouseMove : undefined}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onMouseMove}
        onTouchEnd={onMouseUp}
        {...rest}>
        {// TODO: Maybe just a subset of actions?
        children(EuiResizablePanel, EuiResizableButton, actions)}
      </div>
    </EuiResizablePanelContextProvider>
  );
};

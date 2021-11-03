/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ReactNode,
  ReactElement,
  useEffect,
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
import { useResizeObserver } from '../observer/resize_observer';
import { EuiResizableContainerContextProvider } from './context';
import {
  EuiResizableButtonProps,
  euiResizableButtonWithControls,
} from './resizable_button';
import {
  EuiResizablePanelProps,
  euiResizablePanelWithControls,
  getModeType,
  ToggleCollapseCallback,
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
    actions: Partial<EuiResizableContainerActions>
  ) => ReactNode;
  /**
   * Pure function which accepts an object where keys are IDs of panels, which sizes were changed,
   * and values are actual sizes in percents
   */
  onPanelWidthChange?: ({}: { [key: string]: number }) => any;
  onToggleCollapsed?: ToggleCollapseCallback;
  style?: CSSProperties;
}

const initialState: EuiResizableContainerState = {
  isDragging: false,
  currentResizerPos: -1,
  prevPanelId: null,
  nextPanelId: null,
  containerSize: 1,
  panels: {},
  resizers: {},
};

export const EuiResizableContainer: FunctionComponent<EuiResizableContainerProps> = ({
  direction = 'horizontal',
  children,
  className,
  onPanelWidthChange,
  onToggleCollapsed,
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

  const containerSize = useResizeObserver(
    containerRef.current,
    isHorizontal ? 'width' : 'height'
  );

  const initialize = useCallback(() => {
    actions.initContainer(isHorizontal);
  }, [actions, isHorizontal]);

  useEffect(() => {
    if (containerSize.width > 0 && containerSize.height > 0) {
      initialize();
    }
  }, [initialize, containerSize]);

  const onMouseDown = useCallback(
    (event: EuiResizableButtonMouseEvent) => {
      const currentTarget = event.currentTarget;
      const prevPanel = currentTarget.previousElementSibling;
      const nextPanel = currentTarget.nextElementSibling;
      if (!prevPanel || !nextPanel) return;
      const prevPanelId = prevPanel!.id;
      const nextPanelId = nextPanel!.id;
      const position = getPosition(event, isHorizontal);
      actions.dragStart({ position, prevPanelId, nextPanelId });
    },
    [actions, isHorizontal]
  );

  const onMouseMove = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (
        !reducerState.prevPanelId ||
        !reducerState.nextPanelId ||
        !reducerState.isDragging
      )
        return;
      const position = getPosition(event, isHorizontal);
      actions.dragMove({
        position,
        prevPanelId: reducerState.prevPanelId,
        nextPanelId: reducerState.nextPanelId,
      });
    },
    [
      actions,
      isHorizontal,
      reducerState.prevPanelId,
      reducerState.nextPanelId,
      reducerState.isDragging,
    ]
  );

  const onKeyDown = useCallback(
    (event: EuiResizableButtonKeyDownEvent) => {
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
    },
    [actions, isHorizontal]
  );

  const onMouseUp = useCallback(() => {
    actions.reset();
  }, [actions]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const EuiResizableButton = useCallback(
    euiResizableButtonWithControls({
      onKeyDown,
      onMouseDown,
      onTouchStart: onMouseDown,
      onFocus: actions.resizerFocus,
      onBlur: actions.resizerBlur,
      isHorizontal,
      registration: {
        register: actions.registerResizer,
        deregister: actions.deregisterResizer,
      },
    }),
    [actions, isHorizontal]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const EuiResizablePanel = useCallback(
    euiResizablePanelWithControls({
      isHorizontal,
      registration: {
        register: actions.registerPanel,
        deregister: actions.deregisterPanel,
      },
      onToggleCollapsed,
      onToggleCollapsedInternal: actions.togglePanel,
    }),
    [actions, isHorizontal]
  );

  const render = () => {
    const DEFAULT = 'custom';
    const content = children(EuiResizablePanel, EuiResizableButton, {
      togglePanel: actions.togglePanel,
    });
    const modes = React.isValidElement(content)
      ? content.props.children.map(
          (el: ReactElement) => getModeType(el.props.mode) || DEFAULT
        )
      : null;
    if (
      modes &&
      (['collapsible', 'main'].every((i) => modes.includes(i)) ||
        modes.every((i?: string) => i === DEFAULT))
    ) {
      return content;
    } else {
      throw new Error(
        'Both `collapsible` and `main` mode panels are required.'
      );
    }
  };

  return (
    <EuiResizableContainerContextProvider
      registry={{
        panels: reducerState.panels,
        resizers: reducerState.resizers,
      }}
    >
      <div
        className={classes}
        ref={containerRef}
        onMouseMove={reducerState.isDragging ? onMouseMove : undefined}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onMouseMove}
        onTouchEnd={onMouseUp}
        {...rest}
      >
        {render()}
      </div>
    </EuiResizableContainerContextProvider>
  );
};

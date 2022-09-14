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
  EuiResizableButtonKeyEvent,
  EuiResizableContainerState,
  EuiResizableContainerActions,
} from './types';

const containerDirections = {
  vertical: 'vertical',
  horizontal: 'horizontal',
};

type ResizeTrigger = 'pointer' | 'key';

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
  /**
   * Called when resizing starts
   */
  onResizeStart?: (trigger: ResizeTrigger) => any;
  /**
   * Called when resizing ends
   */
  onResizeEnd?: (trigger: ResizeTrigger) => any;
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
  onResizeStart,
  onResizeEnd,
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

  const resizeTrigger = useRef<ResizeTrigger>();
  const resizeStart = useCallback(
    (trigger: ResizeTrigger) => {
      onResizeStart?.(trigger);
      resizeTrigger.current = trigger;
    },
    [onResizeStart]
  );
  const resizeEnd = useCallback(
    (trigger: ResizeTrigger) => {
      onResizeEnd?.(trigger);
      resizeTrigger.current = undefined;
    },
    [onResizeEnd]
  );

  const onMouseDown = useCallback(
    (event: EuiResizableButtonMouseEvent) => {
      const currentTarget = event.currentTarget;
      const prevPanel = currentTarget.previousElementSibling;
      const nextPanel = currentTarget.nextElementSibling;
      if (!prevPanel || !nextPanel) return;
      const prevPanelId = prevPanel!.id;
      const nextPanelId = nextPanel!.id;
      const position = getPosition(event, isHorizontal);
      resizeStart('pointer');
      actions.dragStart({ position, prevPanelId, nextPanelId });
    },
    [actions, isHorizontal, resizeStart]
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

  const getDirection = useCallback(
    (key: string) => {
      let direction: 'forward' | 'backward' | null = null;
      if (
        (isHorizontal && key === keys.ARROW_LEFT) ||
        (!isHorizontal && key === keys.ARROW_UP)
      ) {
        direction = 'backward';
      } else if (
        (isHorizontal && key === keys.ARROW_RIGHT) ||
        (!isHorizontal && key === keys.ARROW_DOWN)
      ) {
        direction = 'forward';
      }
      return direction;
    },
    [isHorizontal]
  );

  const onKeyDown = useCallback(
    (event: EuiResizableButtonKeyEvent) => {
      const { key, currentTarget } = event;
      const direction = getDirection(key);
      const prevPanelId = currentTarget.previousElementSibling!.id;
      const nextPanelId = currentTarget.nextElementSibling!.id;

      if (direction && prevPanelId && nextPanelId) {
        if (!event.repeat) {
          resizeStart('key');
        }
        event.preventDefault();
        actions.keyMove({ direction, prevPanelId, nextPanelId });
      }
    },
    [actions, getDirection, resizeStart]
  );

  const onKeyUp = useCallback(() => {
    if (resizeTrigger.current === 'key') {
      resizeEnd('key');
    }
  }, [resizeEnd]);

  const onMouseUp = useCallback(() => {
    if (resizeTrigger.current === 'pointer') {
      resizeEnd('pointer');
    }
    actions.reset();
  }, [actions, resizeEnd]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const EuiResizableButton = useCallback(
    euiResizableButtonWithControls({
      onKeyDown,
      onKeyUp,
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

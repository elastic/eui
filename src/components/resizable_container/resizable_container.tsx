import React, { ReactNode, useRef, useState, useCallback } from 'react';

import { keyCodes } from '../../services';
import { PanelContextProvider, PanelRegistry } from './context';
import {
  resizerWithControls,
  ResizerMouseEvent,
  ResizerKeyDownEvent,
  ResizerProps,
} from './resizer';
import { Panel, PanelProps } from './panel';

export interface Props {
  children: (
    Panel: React.ComponentType<PanelProps>,
    Resizer: React.ComponentType<ResizerProps>
  ) => ReactNode;
  className?: string;
  onPanelWidthChange?: (arrayOfPanelWidths: number[]) => any;
  resizerClassName?: string;
}

interface State {
  isDragging: boolean;
  currentResizerPos: number;
}

const initialState: State = { isDragging: false, currentResizerPos: -1 };

const pxToPercent = (proportion: number, whole: number) =>
  (proportion / whole) * 100;

export function EuiResizableContainer({
  children,
  className,
  onPanelWidthChange,
}: Props) {
  const registryRef = useRef(new PanelRegistry());
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>(initialState);

  const getContainerWidth = () => {
    return containerRef.current!.getBoundingClientRect().width;
  };

  const handleMouseDown = useCallback(
    (event: ResizerMouseEvent) => {
      setState({
        ...state,
        isDragging: true,
        currentResizerPos: event.clientX,
      });
    },
    [state]
  );

  const handleKeyDown = useCallback(
    (ev: ResizerKeyDownEvent) => {
      const { keyCode } = ev;

      if (keyCode === keyCodes.LEFT || keyCode === keyCodes.RIGHT) {
        ev.preventDefault();

        const { current: registry } = registryRef;
        const [left, right] = registry.getPanels();

        const leftPercent = left.width - (keyCode === keyCodes.LEFT ? 1 : -1);
        const rightPercent =
          right.width - (keyCode === keyCodes.RIGHT ? 1 : -1);

        left.setWidth(leftPercent);
        right.setWidth(rightPercent);

        if (onPanelWidthChange) {
          onPanelWidthChange([leftPercent, rightPercent]);
        }
      }
    },
    [onPanelWidthChange]
  );

  return (
    <PanelContextProvider registry={registryRef.current}>
      <div
        className={className}
        ref={containerRef}
        style={{ display: 'flex', height: '100%', width: '100%' }}
        onMouseMove={event => {
          if (state.isDragging) {
            const { clientX: x } = event;
            const { current: registry } = registryRef;
            const [left, right] = registry.getPanels();
            const delta = x - state.currentResizerPos;
            const containerWidth = getContainerWidth();
            const leftPercent = pxToPercent(
              left.getWidth() + delta,
              containerWidth
            );
            const rightPercent = pxToPercent(
              right.getWidth() - delta,
              containerWidth
            );
            left.setWidth(leftPercent);
            right.setWidth(rightPercent);

            if (onPanelWidthChange) {
              onPanelWidthChange([leftPercent, rightPercent]);
            }

            setState({ ...state, currentResizerPos: x });
          }
        }}
        onMouseUp={() => {
          setState(initialState);
        }}>
        {children(
          Panel,
          resizerWithControls({
            onKeyDown: handleKeyDown,
            onMouseDown: handleMouseDown,
          })
        )}
      </div>
    </PanelContextProvider>
  );
}

import React, {
  ReactNode,
  useRef,
  useState,
  useCallback,
  CSSProperties,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { PanelContextProvider, PanelRegistry } from './context';
import { resizerWithControls } from './resizer';
import { PanelProps, paneWithControls } from './panel';
import { useContainerCallbacks } from './helpers';

const containerDirections = {
  vertical: 'vertical',
  horizontal: 'horizontal',
};

export interface Props extends CommonProps {
  /**
   * Specify the container direction
   *
   * @default "horizontal"
   */
  direction?: keyof typeof containerDirections;
  children: (
    Panel: React.ComponentType<PanelProps>,
    Resizer: React.ComponentType<CommonProps>
  ) => ReactNode;
  onPanelWidthChange?: (arrayOfPanelWidths: number[]) => any;
  style?: CSSProperties;
}

export interface State {
  isDragging: boolean;
  currentResizerPos: number;
}

const initialState: State = { isDragging: false, currentResizerPos: -1 };

export function EuiResizableContainer({
  direction = 'horizontal',
  children,
  className,
  onPanelWidthChange,
  ...rest
}: Props) {
  const registryRef = useRef(new PanelRegistry());
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>(initialState);
  const isHorizontal = direction === containerDirections.horizontal;

  const classes = classNames(
    'euiResizableContainer',
    {
      'euiResizableContainer--vertical': !isHorizontal,
      'euiResizableContainer--horizontal': isHorizontal,
    },
    className
  );

  const { onKeyDown, onMouseDown, onMouseMove } = useContainerCallbacks({
    isHorizontal,
    state,
    setState,
    containerRef,
    registryRef,
    onPanelWidthChange,
  });

  const Resizer = useCallback(
    resizerWithControls({
      onKeyDown,
      onMouseDown,
      isHorizontal,
    }),
    [onKeyDown, onMouseDown, isHorizontal]
  );

  const Panel = useCallback(
    paneWithControls({
      isHorizontal,
    }),
    [isHorizontal]
  );

  return (
    <PanelContextProvider registry={registryRef.current}>
      <div
        className={classes}
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseUp={() => {
          setState(initialState);
        }}
        {...rest}>
        {children(Panel, Resizer)}
      </div>
    </PanelContextProvider>
  );
}

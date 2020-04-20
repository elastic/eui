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
  useState,
  useCallback,
  CSSProperties,
  FunctionComponent,
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
   */
  direction?: keyof typeof containerDirections;
  /**
   * Pure function which accepts Panel and Resizer components in arguments
   * and returns a component tree
   */
  children: (
    Panel: React.ComponentType<PanelProps>,
    Resizer: React.ComponentType<CommonProps>
  ) => ReactNode;
  /**
   * Pure function which accepts an object where keys are IDs of panels, which sizes were changed,
   * and values are actual sizes in percents
   */
  onPanelWidthChange?: ({  }: { [key: string]: number }) => any;
  style?: CSSProperties;
}

export interface State {
  isDragging: boolean;
  currentResizerPos: number;
  previousPanelId: string | null;
  nextPanelId: string | null;
  resizersSize: number;
}

const initialState: State = {
  isDragging: false,
  currentResizerPos: -1,
  previousPanelId: null,
  nextPanelId: null,
  resizersSize: 0,
};

export const EuiResizableContainer: FunctionComponent<Props> = ({
  direction = 'horizontal',
  children,
  className,
  onPanelWidthChange,
  ...rest
}) => {
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

  const onMouseUp = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <PanelContextProvider registry={registryRef.current}>
      <div
        className={classes}
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        {...rest}>
        {children(Panel, Resizer)}
      </div>
    </PanelContextProvider>
  );
};

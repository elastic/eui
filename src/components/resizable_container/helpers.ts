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

import { useCallback, MouseEvent } from 'react';

import { keyCodes } from '../../services';
import { ResizerMouseEvent, ResizerKeyDownEvent } from './resizer';
import { PanelRegistry } from './context';
import { State } from './resizable_container';

interface Params {
  isHorizontal: boolean;
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
  containerRef: React.RefObject<HTMLDivElement>;
  registryRef: React.MutableRefObject<PanelRegistry>;
  onPanelWidthChange?: ({  }: { [key: string]: number }) => any;
}

type onMouseMove = (event: MouseEvent) => void;

const pxToPercent = (proportion: number, whole: number) =>
  (proportion / whole) * 100;

export const useContainerCallbacks = ({
  isHorizontal,
  state,
  setState,
  containerRef,
  registryRef,
  onPanelWidthChange,
}: Params) => {
  const getContainerSize = useCallback(() => {
    return isHorizontal
      ? containerRef.current!.getBoundingClientRect().width
      : containerRef.current!.getBoundingClientRect().height;
  }, [containerRef, isHorizontal]);

  const getResizerButtonsSize = useCallback(() => {
    // get sum of all of resizer button sizes to proper calculate panels ratio
    const allResizers = containerRef.current!.getElementsByClassName(
      'euiResizer'
    ) as HTMLCollectionOf<HTMLButtonElement>;
    const size = isHorizontal
      ? allResizers[0].offsetWidth
      : allResizers[0].offsetHeight;

    return size * allResizers.length;
  }, [containerRef, isHorizontal]);

  const onMouseDown = useCallback(
    ({ clientY, clientX, currentTarget }: ResizerMouseEvent) => {
      setState(prevState => ({
        ...prevState,
        isDragging: true,
        currentResizerPos: isHorizontal ? clientX : clientY,
        previousPanelId: currentTarget.previousElementSibling!.id,
        nextPanelId: currentTarget.nextElementSibling!.id,
        resizersSize: getResizerButtonsSize(),
      }));
    },
    [getResizerButtonsSize, isHorizontal, setState]
  );

  const onKeyDown = useCallback(
    (ev: ResizerKeyDownEvent) => {
      const { keyCode, currentTarget } = ev;
      const shouldResizeHorizontalPanel =
        isHorizontal &&
        (keyCode === keyCodes.LEFT || keyCode === keyCodes.RIGHT);
      const shouldResizeVerticalPanel =
        !isHorizontal && (keyCode === keyCodes.UP || keyCode === keyCodes.DOWN);
      const prevPanelId = currentTarget.previousElementSibling!.id;
      const nextPanelId = currentTarget.nextElementSibling!.id;

      if (
        (shouldResizeHorizontalPanel || shouldResizeVerticalPanel) &&
        prevPanelId &&
        nextPanelId
      ) {
        ev.preventDefault();

        const { current: registry } = registryRef;
        const [prevPanel, nextPanel] = registry.getResizerSiblings(
          prevPanelId,
          nextPanelId
        );
        const resizersSize = getResizerButtonsSize();
        const containerSize = getContainerSize();

        const prevPanelSize = pxToPercent(
          prevPanel.getSizePx() -
            (keyCode === keyCodes.UP || keyCode === keyCodes.LEFT ? 10 : -10),
          containerSize - resizersSize
        );
        const nextPanelSize = pxToPercent(
          nextPanel.getSizePx() -
            (keyCode === keyCodes.DOWN || keyCode === keyCodes.RIGHT
              ? 10
              : -10),
          containerSize - resizersSize
        );

        if (onPanelWidthChange) {
          onPanelWidthChange({
            [prevPanelId]: prevPanelSize,
            [nextPanelId]: nextPanelSize,
          });
        } else {
          prevPanel.setSize(prevPanelSize);
          nextPanel.setSize(nextPanelSize);
        }
      }
    },
    [
      getContainerSize,
      getResizerButtonsSize,
      isHorizontal,
      onPanelWidthChange,
      registryRef,
    ]
  );

  const onMouseMove: onMouseMove = useCallback(
    event => {
      if (state.isDragging && state.previousPanelId && state.nextPanelId) {
        const { clientX, clientY } = event;
        const x = isHorizontal ? clientX : clientY;
        const { current: registry } = registryRef;
        const [prevPanel, nextPanel] = registry.getResizerSiblings(
          state.previousPanelId,
          state.nextPanelId
        );
        const delta = x - state.currentResizerPos;
        const containerSize = getContainerSize();
        const prevPanelSize = pxToPercent(
          prevPanel.getSizePx() + delta,
          containerSize - state.resizersSize
        );
        const nextPanelSize = pxToPercent(
          nextPanel.getSizePx() - delta,
          containerSize - state.resizersSize
        );

        if (onPanelWidthChange) {
          onPanelWidthChange({
            [state.previousPanelId]: prevPanelSize,
            [state.nextPanelId]: nextPanelSize,
          });
        } else {
          prevPanel.setSize(prevPanelSize);
          nextPanel.setSize(nextPanelSize);
        }

        setState({ ...state, currentResizerPos: x });
      }
    },
    [
      getContainerSize,
      isHorizontal,
      onPanelWidthChange,
      registryRef,
      setState,
      state,
    ]
  );

  return {
    onMouseDown,
    onKeyDown,
    onMouseMove,
  };
};

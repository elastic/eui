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

import { useCallback, MouseEvent, TouchEvent } from 'react';

import { keys } from '../../services';
import {
  EuiResizableButtonMouseEvent,
  EuiResizableButtonKeyDownEvent,
} from './resizable_button';
import { EuiResizablePanelRegistry } from './context';
import { EuiResizableContainerState } from './resizable_container';

interface Params {
  isHorizontal: boolean;
  state: EuiResizableContainerState;
  setState: React.Dispatch<React.SetStateAction<EuiResizableContainerState>>;
  containerRef: React.RefObject<HTMLDivElement>;
  registryRef: React.MutableRefObject<EuiResizablePanelRegistry>;
  onPanelWidthChange?: ({}: { [key: string]: number }) => any;
}

type onMouseMove = (event: MouseEvent | TouchEvent) => void;

function isMouseEvent(event: MouseEvent | TouchEvent): event is MouseEvent {
  return typeof event === 'object' && 'pageX' in event && 'pageY' in event;
}

const pxToPercent = (proportion: number, whole: number) =>
  (proportion / whole) * 100;

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
    const allResizers = registryRef.current.getAllResizers();
    return allResizers.reduce(
      (size, resizer) =>
        size + (isHorizontal ? resizer.offsetWidth : resizer.offsetHeight),
      0
    );
  }, [registryRef, isHorizontal]);

  const onMouseDown = useCallback(
    (event: EuiResizableButtonMouseEvent) => {
      const currentTarget = event.currentTarget;
      const clientX = isMouseEvent(event)
        ? event.clientX
        : event.touches[0].clientX;
      const clientY = isMouseEvent(event)
        ? event.clientY
        : event.touches[0].clientY;
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
    (event: EuiResizableButtonKeyDownEvent) => {
      const { key, currentTarget } = event;
      const shouldResizeHorizontalPanel =
        isHorizontal && (key === keys.ARROW_LEFT || key === keys.ARROW_RIGHT);
      const shouldResizeVerticalPanel =
        !isHorizontal && (key === keys.ARROW_UP || key === keys.ARROW_DOWN);
      const prevPanelId = currentTarget.previousElementSibling!.id;
      const nextPanelId = currentTarget.nextElementSibling!.id;

      if (
        (shouldResizeHorizontalPanel || shouldResizeVerticalPanel) &&
        prevPanelId &&
        nextPanelId
      ) {
        event.preventDefault();

        const { current: registry } = registryRef;
        const [prevPanel, nextPanel] = registry.getResizerSiblings(
          prevPanelId,
          nextPanelId
        );
        const resizersSize = getResizerButtonsSize();
        const containerSize = getContainerSize();

        const prevPanelSize = pxToPercent(
          prevPanel.getSizePx() -
            (key === keys.ARROW_UP || key === keys.ARROW_LEFT ? 10 : -10),
          containerSize - resizersSize
        );
        const nextPanelSize = pxToPercent(
          nextPanel.getSizePx() -
            (key === keys.ARROW_DOWN || key === keys.ARROW_RIGHT ? 10 : -10),
          containerSize - resizersSize
        );

        setState({ ...state, isDragging: false });
        const panelObject = registry.fetchAllPanels(
          prevPanelId,
          nextPanelId,
          containerSize - resizersSize
        );

        if (onPanelWidthChange) {
          onPanelWidthChange({
            ...panelObject,
            [prevPanelId]: prevPanelSize,
            [nextPanelId]: nextPanelSize,
          });
        }
        prevPanel.setSize(prevPanelSize);
        nextPanel.setSize(nextPanelSize);
      }
    },
    // `setState` is safe to omit from `useCallback`
    // (https://reactjs.org/docs/hooks-reference.html#usestate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const clientX = isMouseEvent(event)
          ? event.clientX
          : event.touches[0].clientX;
        const clientY = isMouseEvent(event)
          ? event.clientY
          : event.touches[0].clientY;
        const x = isHorizontal ? clientX : clientY;
        const { current: registry } = registryRef;
        const [prevPanel, nextPanel] = registry.getResizerSiblings(
          state.previousPanelId,
          state.nextPanelId
        );
        const delta = x - state.currentResizerPos;
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

        const panelObject = registry.fetchAllPanels(
          state.previousPanelId,
          state.nextPanelId,
          containerSize
        );
        if (prevPanelSize >= prevPanelMin && nextPanelSize >= nextPanelMin) {
          if (onPanelWidthChange) {
            onPanelWidthChange({
              ...panelObject,
              [state.previousPanelId]: prevPanelSize,
              [state.nextPanelId]: nextPanelSize,
            });
          }
          prevPanel.setSize(prevPanelSize);
          nextPanel.setSize(nextPanelSize);

          setState({ ...state, currentResizerPos: x });
        }
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

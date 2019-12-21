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
  onPanelWidthChange?: (arrayOfPanelWidths: number[]) => any;
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
  const getContainerWidth = useCallback(() => {
    return isHorizontal
      ? containerRef.current!.getBoundingClientRect().width
      : containerRef.current!.getBoundingClientRect().height;
  }, [containerRef, isHorizontal]);

  const onMouseDown = useCallback(
    ({ clientY, clientX }: ResizerMouseEvent) => {
      setState(prevState => ({
        ...prevState,
        isDragging: true,
        currentResizerPos: isHorizontal ? clientX : clientY,
      }));
    },
    [isHorizontal, setState]
  );

  const onKeyDown = useCallback(
    (ev: ResizerKeyDownEvent) => {
      const { keyCode } = ev;
      const shouldResizeHorizontalPanel =
        isHorizontal &&
        (keyCode === keyCodes.LEFT || keyCode === keyCodes.RIGHT);
      const shouldResizeVerticalPanel =
        !isHorizontal && (keyCode === keyCodes.UP || keyCode === keyCodes.DOWN);

      if (shouldResizeHorizontalPanel || shouldResizeVerticalPanel) {
        ev.preventDefault();

        const { current: registry } = registryRef;
        const [first, second] = registry.getPanels();

        const firstPercent =
          first.size -
          (keyCode === keyCodes.UP || keyCode === keyCodes.LEFT ? 1 : -1);
        const secondPercent =
          second.size -
          (keyCode === keyCodes.DOWN || keyCode === keyCodes.RIGHT ? 1 : -1);

        first.setSize(firstPercent);
        second.setSize(secondPercent);

        if (onPanelWidthChange) {
          onPanelWidthChange([firstPercent, secondPercent]);
        }
      }
    },
    [isHorizontal, onPanelWidthChange, registryRef]
  );

  const onMouseMove: onMouseMove = useCallback(
    event => {
      if (state.isDragging) {
        const { clientX, clientY } = event;
        const x = isHorizontal ? clientX : clientY;
        const { current: registry } = registryRef;
        const [left, right] = registry.getPanels();
        const delta = x - state.currentResizerPos;
        const containerWidth = getContainerWidth();
        const leftPercent = pxToPercent(left.getSize() + delta, containerWidth);
        const rightPercent = pxToPercent(
          right.getSize() - delta,
          containerWidth
        );
        left.setSize(leftPercent);
        right.setSize(rightPercent);

        if (onPanelWidthChange) {
          onPanelWidthChange([leftPercent, rightPercent]);
        }

        setState({ ...state, currentResizerPos: x });
      }
    },
    [
      getContainerWidth,
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

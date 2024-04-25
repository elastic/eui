import React, { useState, useCallback, useRef } from 'react';
import { EuiResizableButton, EuiPanel, keys } from '../../../../src';

const MIN_PANEL_WIDTH = 20;

const getMouseOrTouchX = (
  e: TouchEvent | MouseEvent | React.MouseEvent | React.TouchEvent
): number => {
  // Some Typescript fooling is needed here
  const x = (e as TouchEvent).targetTouches
    ? (e as TouchEvent).targetTouches[0].pageX
    : (e as MouseEvent).pageX;
  return x;
};

export default () => {
  const [panelWidth, setPanelWidth] = useState(200);
  const initialPanelWidth = useRef(panelWidth);
  const initialMouseX = useRef(0);

  const onMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    const mouseOffset = getMouseOrTouchX(e) - initialMouseX.current;
    const changedPanelWidth = initialPanelWidth.current + mouseOffset;

    setPanelWidth(Math.max(changedPanelWidth, MIN_PANEL_WIDTH));
  }, []);

  const onMouseUp = useCallback(() => {
    initialMouseX.current = 0;

    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('touchmove', onMouseMove);
    window.removeEventListener('touchend', onMouseUp);
  }, [onMouseMove]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      initialMouseX.current = getMouseOrTouchX(e);
      initialPanelWidth.current = panelWidth;

      // Window event listeners instead of React events are used
      // in case the user's mouse leaves the component
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onMouseMove);
      window.addEventListener('touchend', onMouseUp);
    },
    [panelWidth, onMouseMove, onMouseUp]
  );

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    const KEYBOARD_OFFSET = 10;

    switch (e.key) {
      case keys.ARROW_RIGHT:
        e.preventDefault(); // Safari+VO will screen reader navigate off the button otherwise
        setPanelWidth((panelWidth) => panelWidth + KEYBOARD_OFFSET);
        break;
      case keys.ARROW_LEFT:
        e.preventDefault(); // Safari+VO will screen reader navigate off the button otherwise
        setPanelWidth((panelWidth) =>
          Math.max(panelWidth - KEYBOARD_OFFSET, MIN_PANEL_WIDTH)
        );
    }
  }, []);

  return (
    <EuiPanel
      paddingSize="s"
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        blockSize: 200,
        inlineSize: panelWidth,
        maxInlineSize: '100%',
      }}
    >
      <EuiResizableButton
        isHorizontal
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        onKeyDown={onKeyDown}
      />
    </EuiPanel>
  );
};

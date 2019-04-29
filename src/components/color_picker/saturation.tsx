import React, {
  FunctionComponent,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { CommonProps } from '../common';
import { keyCodes } from '../../services';
import { HSV } from '../../services/color';
import { isNil } from '../../services/predicate';
import { getEventPosition } from './utils';

function isMouseEvent(
  event: ReactMouseEvent | TouchEvent
): event is ReactMouseEvent {
  return typeof event === 'object' && 'pageX' in event && 'pageY' in event;
}

export type EuiSaturationProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    color?: HSV;
    onChange: (color: HSV) => void;
  };

export const EuiSaturation: FunctionComponent<EuiSaturationProps> = ({
  color = { h: 180, s: 1, v: 0.5 },
  onChange,
  ...rest
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<Pick<ClientRect, 'left' | 'top'>>({
    left: 0,
    top: 0,
  });
  const [lastColor, setlastColor] = useState<HSV | {}>({});
  const { h, s, v } = color;
  useEffect(() => {
    // Mimics `componentDidMount` and `componentDidUpdate`
    if (
      !isNil(boxRef.current) &&
      Object.values(lastColor).join() !== Object.values(color).join()
    ) {
      const { height, width } = boxRef.current.getBoundingClientRect();
      setIndicator({
        left: s * width,
        top: (1 - v) * height,
      });
    }
  }, [color]);

  useEffect(() => {
    // Mimic `componentWillUnmount`
    return unbindEventListeners;
  }, []);

  const handleUpdate = (
    box: Pick<ClientRect, 'left' | 'top' | 'width' | 'height'>
  ) => {
    const { left, top, width, height } = box;
    setIndicator({ left, top });
    const newV = 1 - top / height;
    const newColor = { h, s: left / width, v: newV };
    setlastColor(newColor);
    onChange(newColor);
  };
  const handleChange = (location: { x: number; y: number }) => {
    if (isNil(boxRef) || isNil(boxRef.current)) {
      return;
    }
    const box = getEventPosition(location, boxRef.current);
    handleUpdate(box);
  };
  const handleInteraction = (
    e: ReactMouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    if (e && boxRef.current) {
      const x = isMouseEvent(e) ? e.pageX : e.touches[0].pageX;
      const y = isMouseEvent(e) ? e.pageY : e.touches[0].pageY;
      handleChange({ x, y });
    }
  };
  const handleMouseMove = (e: MouseEvent) => {
    handleChange({ x: e.pageX, y: e.pageY });
  };
  const mouseUp = () => {
    unbindEventListeners();
  };
  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    handleInteraction(e);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', mouseUp);
  };
  const unbindEventListeners = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', mouseUp);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (isNil(boxRef) || isNil(boxRef.current)) {
      return;
    }
    const { height, width } = boxRef.current.getBoundingClientRect();
    const { left, top } = indicator;
    let newLeft = left;
    let newTop = top;

    switch (e.keyCode) {
      case keyCodes.DOWN:
        newTop = top < height ? top + height / 100 : height;
        break;
      case keyCodes.LEFT:
        newLeft = left > 0 ? left - width / 100 : 0;
        break;
      case keyCodes.UP:
        newTop = top > 0 ? top - height / 100 : 0;
        break;
      case keyCodes.RIGHT:
        newLeft = left < width ? left + width / 100 : width;
        break;
      default:
        return;
    }
    setIndicator({ left: newLeft, top: newTop });
    const newS = newLeft / width;
    const newV = 1 - newTop / height;
    const newColor = { h, s: newS, v: newV };
    onChange(newColor);
  };
  return (
    <div
      onMouseDown={handleMouseDown}
      onTouchStart={handleInteraction}
      onTouchMove={handleInteraction}
      onKeyDown={handleKeyDown}
      ref={boxRef}
      tabIndex={0}
      className="euiSaturation"
      style={{
        background: `hsl(${color.h}, 100%, 50%)`,
      }}
      {...rest}>
      <div className="euiSaturation__lightness">
        <div className="euiSaturation__saturation" />
      </div>
      <div className="euiSaturation__indicator" style={{ ...indicator }} />
    </div>
  );
};

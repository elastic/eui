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
import { isNil } from '../../services/predicate';
import { getEventPosition, HSLtoHSV, HSVtoHSL, HSL } from './utils';

function isMouseEvent(
  event: ReactMouseEvent | TouchEvent
): event is ReactMouseEvent {
  return typeof event === 'object' && 'pageX' in event && 'pageY' in event;
}

export type EuiSaturationProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    color?: HSL;
    onChange: (color: HSL) => void;
  };

export const EuiSaturation: FunctionComponent<EuiSaturationProps> = ({
  color = { h: 180, s: 100, l: 50 },
  onChange,
  ...rest
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{
    left: number;
    top: number;
  }>({ left: 0, top: 0 });
  const [lastColor, setlastColor] = useState<HSL | {}>({});
  const { h, s, l } = color;
  useEffect(() => {
    // Mimics `componentDidMount` and `componentDidUpdate`
    if (
      !isNil(boxRef.current) &&
      Object.values(lastColor).join() !== Object.values(color).join()
    ) {
      const { height, width } = boxRef.current.getBoundingClientRect();
      const hsv = HSLtoHSV({ h, s: s / 100, l: l / 100 });
      setIndicator({
        left: hsv.s * width,
        top: (1 - hsv.v) * height,
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
    const v = 1 - top / height;
    const newhsl = HSVtoHSL({ h, s: left / width, v });
    setlastColor({ h, s: newhsl.s * 100, l: newhsl.l * 100 });
    onChange({ h, s: newhsl.s * 100, l: newhsl.l * 100 });
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
        newTop = top < height ? top + 1 : height;
        break;
      case keyCodes.LEFT:
        newLeft = left > 0 ? left - 1 : 0;
        break;
      case keyCodes.UP:
        newTop = top > 0 ? top - 1 : 0;
        break;
      case keyCodes.RIGHT:
        newLeft = left < width ? left + 1 : width;
        break;
      default:
        return;
    }

    setIndicator({ left: newLeft, top: newTop });
    const newS = (newLeft * 100) / width;
    const newL = -((newTop * 100) / height) + 100;
    const newhsl = HSVtoHSL({ h, s: newS / 100, v: newL / 100 });
    onChange({ h, s: newhsl.s * 100, l: newhsl.l * 100 });
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
      <div className="euiSaturation__indicator" style={{ ...indicator }}>
        X
      </div>
    </div>
  );
};

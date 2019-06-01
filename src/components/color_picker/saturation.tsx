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
import classNames from 'classnames';

import { CommonProps, Omit } from '../common';
import { keyCodes } from '../../services';
import { HSV } from '../../services/color';
import { isNil } from '../../services/predicate';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiI18n } from '../i18n';

import { getEventPosition, throttle } from './utils';

function isMouseEvent(
  event: ReactMouseEvent | TouchEvent
): event is ReactMouseEvent {
  return typeof event === 'object' && 'pageX' in event && 'pageY' in event;
}

export type SaturationClientRect = Pick<
  ClientRect,
  'left' | 'top' | 'width' | 'height'
>;

export type SaturationPosition = Pick<SaturationClientRect, 'left' | 'top'>;

interface HTMLDivElementOverrides {
  color?: HSV;
}
export type EuiSaturationProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof HTMLDivElementOverrides
> &
  CommonProps &
  HTMLDivElementOverrides & {
    hex?: string;
    onChange: (color: HSV) => void;
  };

export const EuiSaturation: FunctionComponent<EuiSaturationProps> = ({
  className,
  color = { h: 1, s: 0, v: 0 },
  hex,
  id,
  onChange,
  tabIndex = 0,
  ...rest
}) => {
  const [indicator, setIndicator] = useState<SaturationPosition>({
    left: 0,
    top: 0,
  });
  const [lastColor, setlastColor] = useState<HSV | {}>({});

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mimics `componentDidMount` and `componentDidUpdate`
    const { s, v } = color;
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

  const calculateColor = ({
    top,
    height,
    left,
    width,
  }: SaturationClientRect) => {
    const { h } = color;
    const s = left / width;
    const v = 1 - top / height;
    return { h, s, v };
  };

  const handleUpdate = (box: SaturationClientRect) => {
    const { left, top } = box;
    setIndicator({ left, top });
    const newColor = calculateColor(box);
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
  const handleMouseMove = throttle((e: MouseEvent) => {
    handleChange({ x: e.pageX, y: e.pageY });
  });
  const handleMouseUp = () => {
    unbindEventListeners();
  };
  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    handleInteraction(e);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  const unbindEventListeners = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (isNil(boxRef) || isNil(boxRef.current)) {
      return;
    }
    const { height, width } = boxRef.current.getBoundingClientRect();
    const { left, top } = indicator;
    const heightScale = height / 100;
    const widthScale = width / 100;
    let newLeft = left;
    let newTop = top;

    switch (e.keyCode) {
      case keyCodes.DOWN:
        e.preventDefault();
        newTop = top < height ? top + heightScale : height;
        break;
      case keyCodes.LEFT:
        e.preventDefault();
        newLeft = left > 0 ? left - widthScale : 0;
        break;
      case keyCodes.UP:
        e.preventDefault();
        newTop = top > 0 ? top - heightScale : 0;
        break;
      case keyCodes.RIGHT:
        e.preventDefault();
        newLeft = left < width ? left + widthScale : width;
        break;
      default:
        return;
    }

    const newPosition = { left: newLeft, top: newTop };
    setIndicator(newPosition);
    const newColor = calculateColor({ width, height, ...newPosition });
    onChange(newColor);
  };

  const classes = classNames('euiSaturation', className);
  return (
    <EuiI18n
      token="euiSaturation.roleDescription"
      default="HSV color mode saturation and value selection">
      {(roleDescription: string) => (
        <div
          role="application"
          aria-roledescription={roleDescription}
          aria-describedby={`${id}-saturationDescription`}
          aria-activedescendant={`${id}-saturationIndicator`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleInteraction}
          onTouchMove={handleInteraction}
          onKeyDown={handleKeyDown}
          ref={boxRef}
          tabIndex={tabIndex}
          className={classes}
          style={{
            background: `hsl(${color.h}, 100%, 50%)`,
          }}
          {...rest}>
          <EuiScreenReaderOnly>
            <p>
              <EuiI18n
                token="euiSaturation.screenReaderAnnouncement"
                default="Use the arrow keys to navigate the square color gradient. The coordinates resulting from each key press will be used to calculate HSV color mode 'saturation' and 'value' numbers, in the range of 0 to 1. Left and right decrease and increase (respectively) the 'saturation' value. Up and down decrease and increase (respectively) the 'value' value."
              />
            </p>
          </EuiScreenReaderOnly>
          <EuiScreenReaderOnly>
            <p aria-live="polite">{hex}</p>
          </EuiScreenReaderOnly>
          <div className="euiSaturation__lightness">
            <div className="euiSaturation__saturation" />
          </div>
          <div
            id={`${id}-saturationIndicator`}
            className="euiSaturation__indicator"
            style={{ ...indicator }}
          />
        </div>
      )}
    </EuiI18n>
  );
};

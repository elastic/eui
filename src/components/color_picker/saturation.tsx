/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  HTMLAttributes,
  KeyboardEvent,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { ColorSpaces } from 'chroma-js';

import { CommonProps } from '../common';
import { keys, useMouseMove } from '../../services';
import { isNil } from '../../services/predicate';
import { useEuiI18n } from '../i18n';

import { getEventPosition } from './utils';

export type SaturationClientRect = Pick<
  ClientRect,
  'left' | 'top' | 'width' | 'height'
>;

export type SaturationPosition = Pick<SaturationClientRect, 'left' | 'top'>;

interface HTMLDivElementOverrides {
  color?: ColorSpaces['hsv'];
  onChange: (color: ColorSpaces['hsv']) => void;
}
export type EuiSaturationProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof HTMLDivElementOverrides
> &
  CommonProps &
  HTMLDivElementOverrides & {
    hex?: string;
  };

export const EuiSaturation = forwardRef<HTMLDivElement, EuiSaturationProps>(
  (
    {
      className,
      color = [1, 0, 0],
      'data-test-subj': dataTestSubj = 'euiSaturation',
      hex,
      id,
      onChange,
      ...rest
    },
    ref
  ) => {
    const [roleDescString, instructionsString] = useEuiI18n(
      ['euiSaturation.ariaLabel', 'euiSaturation.screenReaderInstructions'],
      [
        'HSV color mode saturation and value 2-axis slider',
        "Arrow keys to navigate the square color gradient. Coordinates will be used to calculate HSV color mode 'saturation' and 'value' numbers, in the range of 0 to 1. Left and right to change the saturation. Up and down change the value.",
      ]
    );

    const [indicator, setIndicator] = useState<SaturationPosition>({
      left: 0,
      top: 0,
    });
    const [lastColor, setLastColor] = useState<ColorSpaces['hsv'] | []>([]);

    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Mimics `componentDidMount` and `componentDidUpdate`
      const [, s, v] = color;
      if (!isNil(boxRef.current) && lastColor.join() !== color.join()) {
        const { height, width } = boxRef.current.getBoundingClientRect();
        setIndicator({
          left: s * width,
          top: (1 - v) * height,
        });
      }
    }, [color, lastColor]);

    const calculateColor = ({
      top,
      height,
      left,
      width,
    }: SaturationClientRect): ColorSpaces['hsv'] => {
      const [h] = color;
      const s = left / width;
      const v = 1 - top / height;
      return [h, s, v];
    };

    const handleUpdate = (box: SaturationClientRect) => {
      const { left, top } = box;
      setIndicator({ left, top });
      const newColor = calculateColor(box);
      setLastColor(newColor);
      onChange(newColor);
    };
    const handleChange = (location: { x: number; y: number }) => {
      if (isNil(boxRef?.current)) return;
      const box = getEventPosition(location, boxRef.current);
      handleUpdate(box);
    };
    const [handleMouseDown, handleInteraction] = useMouseMove(
      handleChange,
      boxRef.current
    );
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (isNil(boxRef?.current)) return;
      const { height, width } = boxRef.current.getBoundingClientRect();
      const { left, top } = indicator;
      const heightScale = height / 100;
      const widthScale = width / 100;
      let newLeft = left;
      let newTop = top;

      switch (event.key) {
        case keys.ARROW_DOWN:
          event.preventDefault();
          newTop = top < height ? top + heightScale : height;
          break;
        case keys.ARROW_LEFT:
          event.preventDefault();
          newLeft = left > 0 ? left - widthScale : 0;
          break;
        case keys.ARROW_UP:
          event.preventDefault();
          newTop = top > 0 ? top - heightScale : 0;
          break;
        case keys.ARROW_RIGHT:
          event.preventDefault();
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
    const instructionsId = `${id}-instructions`;
    return (
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleInteraction}
        onTouchMove={handleInteraction}
        onKeyDown={handleKeyDown}
        ref={ref}
        className={classes}
        data-test-subj={dataTestSubj}
        style={{
          background: `hsl(${color[0]}, 100%, 50%)`,
        }}
        tabIndex={-1}
        {...rest}
      >
        <div className="euiSaturation__lightness" ref={boxRef}>
          <div className="euiSaturation__saturation" />
        </div>
        <button
          id={`${id}-saturationIndicator`}
          className="euiSaturation__indicator"
          style={{ ...indicator }}
          aria-roledescription={roleDescString}
          aria-label={hex}
          aria-describedby={instructionsId}
        />
        <span hidden aria-live="assertive">
          {hex}
        </span>
        <span hidden id={instructionsId}>
          {instructionsString}
        </span>
      </div>
    );
  }
);

EuiSaturation.displayName = 'EuiSaturation';

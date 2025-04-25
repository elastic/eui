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
  useCallback,
} from 'react';
import classNames from 'classnames';
import { ColorSpaces } from 'chroma-js';

import {
  keys,
  useMouseMove,
  useEuiMemoizedStyles,
  useGeneratedHtmlId,
} from '../../services';
import { isNil } from '../../services/predicate';
import { logicalStyles } from '../../global_styling';
import { CommonProps } from '../common';
import { useEuiI18n } from '../i18n';
import { EuiToolTip } from '../tool_tip';

import { getEventPosition } from './utils';
import { euiSaturationStyles } from './saturation.styles';

export type SaturationClientRect = Pick<
  DOMRect,
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

const colorDefaultValue = [1, 0, 0];

export const EuiSaturation = forwardRef<HTMLDivElement, EuiSaturationProps>(
  (
    {
      className,
      color = colorDefaultValue,
      'data-test-subj': dataTestSubj = 'euiSaturation',
      hex,
      id: _id,
      onChange,
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    const classes = classNames('euiSaturation', className);
    const styles = useEuiMemoizedStyles(euiSaturationStyles);

    const id = useGeneratedHtmlId({ conditionalId: _id });
    const instructionsId = `${id}-instructions`;
    const indicatorId = `${id}-saturationIndicator`;
    const [ariaLabel, roleDescString, instructionsString] = useEuiI18n(
      [
        'euiSaturation.ariaLabel',
        'euiSaturation.roleDescription',
        'euiSaturation.screenReaderInstructions',
      ],
      [
        'Select a color',
        'HSV color mode saturation and value 2-axis slider.',
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

    const calculateColor = useCallback(
      ({
        top,
        height,
        left,
        width,
      }: SaturationClientRect): ColorSpaces['hsv'] => {
        const [h] = color;
        const s = left / width;
        const v = 1 - top / height;
        return [h, s, v];
      },
      [color]
    );

    const handleUpdate = useCallback(
      (box: SaturationClientRect) => {
        const { left, top } = box;
        setIndicator({ left, top });
        const newColor = calculateColor(box);
        setLastColor(newColor);
        onChange(newColor);
      },
      [calculateColor, onChange]
    );
    const handleChange = useCallback(
      (location: { x: number; y: number }) => {
        if (isNil(boxRef?.current)) return;
        const box = getEventPosition(location, boxRef.current);
        handleUpdate(box);
      },
      [handleUpdate]
    );

    const [handleMouseDown, handleInteraction] = useMouseMove(
      handleChange,
      boxRef.current
    );
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
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
      },
      [calculateColor, indicator, onChange, onKeyDown]
    );

    return (
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleInteraction}
        onTouchMove={handleInteraction}
        onKeyDown={handleKeyDown}
        ref={ref}
        css={styles.euiSaturation}
        className={classes}
        data-test-subj={dataTestSubj}
        style={{
          background: `hsl(${color[0]}, 100%, 50%)`,
        }}
        tabIndex={-1}
        {...rest}
      >
        <div
          css={styles.euiSaturation__lightness}
          className="euiSaturation__lightness"
          ref={boxRef}
        >
          <div
            css={styles.euiSaturation__saturation}
            className="euiSaturation__saturation"
          />
        </div>
        <EuiToolTip
          content={hex}
          anchorProps={{
            css: styles.euiSaturation__tooltip,
            style: logicalStyles(indicator),
          }}
          disableScreenReaderOutput // required to prevent verbose screen reader output
        >
          <button
            id={indicatorId}
            css={styles.euiSaturation__indicator}
            className="euiSaturation__indicator"
            aria-roledescription={roleDescString}
            aria-label={ariaLabel}
            aria-describedby={instructionsId}
          />
        </EuiToolTip>
        <span hidden id={instructionsId}>
          {instructionsString}
        </span>
      </div>
    );
  }
);

EuiSaturation.displayName = 'EuiSaturation';

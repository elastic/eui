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
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiI18n } from '../i18n';

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
      tabIndex = 0,
      ...rest
    },
    ref
  ) => {
    const [indicator, setIndicator] = useState<SaturationPosition>({
      left: 0,
      top: 0,
    });
    const [lastColor, setlastColor] = useState<ColorSpaces['hsv'] | []>([]);

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
    const [handleMouseDown, handleInteraction] = useMouseMove(
      handleChange,
      boxRef.current
    );
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (isNil(boxRef) || isNil(boxRef.current)) {
        return;
      }
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
    return (
      <EuiI18n
        token="euiSaturation.roleDescription"
        default="HSV color mode saturation and value selection">
        {(roleDescription: string) => (
          // Unsure why this element causes errors as `tabIndex` and focus/interactivity (by extension) are accounted for.
          // eslint-disable-next-line jsx-a11y/aria-activedescendant-has-tabindex, jsx-a11y/no-noninteractive-element-interactions
          <div
            role="application"
            aria-roledescription={roleDescription}
            aria-describedby={`${id}-saturationDescription`}
            aria-activedescendant={`${id}-saturationIndicator`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleInteraction}
            onTouchMove={handleInteraction}
            onKeyDown={handleKeyDown}
            ref={ref}
            tabIndex={tabIndex}
            className={classes}
            data-test-subj={dataTestSubj}
            style={{
              background: `hsl(${color[0]}, 100%, 50%)`,
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
            <div className="euiSaturation__lightness" ref={boxRef}>
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
  }
);

EuiSaturation.displayName = 'EuiSaturation';

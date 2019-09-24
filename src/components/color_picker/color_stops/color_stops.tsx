import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import { keyCodes } from '../../../services';
import { EuiColorStopThumb, ColorStop } from './color_stop_thumb';
import {
  DEFAULT_COLOR,
  addStop,
  addDefinedStop,
  removeStop,
  isInvalid,
  calculateScale,
} from './utils';

import { EuiColorPickerProps } from '../';
import { getEventPosition } from '../utils';
import { EuiRangeHighlight } from '../../form/range/range_highlight';
import { EuiRangeTrack } from '../../form/range/range_track';
import { EuiRangeWrapper } from '../../form/range/range_wrapper';

interface EuiColorStopsProps extends CommonProps {
  addColor?: ColorStop['color'];
  colorStops?: ColorStop[];
  onChange: (stops?: ColorStop[], isInvalid?: boolean) => void;
  fullWidth?: boolean;
  className?: string;
  max: number;
  min: number;
  stopType?: 'fixed' | 'gradient';
  mode?: EuiColorPickerProps['mode'];
  swatches?: EuiColorPickerProps['swatches'];
}

// Becuase of how the thumbs are rendered in the popover, using ref results in an infinite loop.
// We'll instead use old fashioned namespaced DOM selectors to get references
const STOP_ATTR = 'euiColorStop_';

function isTargetAThumb(target: HTMLElement | EventTarget) {
  const element = target as HTMLElement;
  return element.id.indexOf(STOP_ATTR) > -1;
}

export const EuiColorStops: FunctionComponent<EuiColorStopsProps> = ({
  addColor = DEFAULT_COLOR,
  max,
  min,
  mode = 'default',
  colorStops = [{ stop: 0, color: addColor }],
  onChange,
  fullWidth,
  className,
  stopType = 'gradient',
  swatches,
}) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [focusedStopIndex, setFocusedStopIndex] = useState<number | null>(null);
  const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);
  const [addTargetPosition, setAddTargetPosition] = useState<number>(0);
  const [isHoverDisabled, setIsHoverDisabled] = useState<boolean>(false);
  const classes = classNames('euiColorStops', className);

  const handleOnChange = (colorStops: ColorStop[]) => {
    onChange(colorStops, isInvalid(colorStops));
  };

  const handleStopChange = (stop: ColorStop, id: number) => {
    const newColorStops = [...colorStops];
    newColorStops.splice(id, 1, stop);
    handleOnChange(newColorStops);
  };

  const onFocusStop = (index: number) => {
    let toFocus;
    if (wrapperRef) {
      if (wrapperRef != null) {
        toFocus = wrapperRef.querySelector<HTMLElement>(
          `#${STOP_ATTR}${index}`
        );
      }
    }
    if (toFocus) {
      setHasFocus(false);
      setFocusedStopIndex(index);
      toFocus.focus();
    }
  };

  const onAdd = (index: number = colorStops.length - 1) => {
    const newColorStops = addStop(colorStops, index, addColor);

    handleOnChange(newColorStops);
  };

  const onRemove = (index: number) => {
    const newColorStops = removeStop(colorStops, index);

    setFocusedStopIndex(null);
    if (wrapperRef) {
      wrapperRef.focus();
    }
    handleOnChange(newColorStops);
  };

  const handleAddHover = (e: React.MouseEvent<HTMLDivElement>) => {
    // reuse
    const box = getEventPosition({ x: e.pageX, y: e.pageY }, wrapperRef!); // event happens on `wrapperRef` element, so it must exist
    const stop = Math.round((box.left / box.width) * (max - min) + min);

    //reuse
    const position = Math.round(
      ((stop - min) / (max - min)) *
        calculateScale(wrapperRef ? wrapperRef.clientWidth : 100)
    );

    setAddTargetPosition(position);
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTargetAThumb(e.target)) return;
    const box = getEventPosition({ x: e.pageX, y: e.pageY }, wrapperRef!); // event happens on `wrapperRef` element, so it must exist
    const newStop = Math.round((box.left / box.width) * (max - min) + min);
    const newColorStops = addDefinedStop(colorStops, newStop, addColor);

    handleOnChange(newColorStops);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.keyCode) {
      case keyCodes.ENTER:
        if (!hasFocus) return;
        onAdd();
        break;

      case keyCodes.BACKSPACE:
        if (hasFocus || focusedStopIndex == null) return;
        const index = sortedStops[focusedStopIndex].id;
        onRemove(index);
        break;

      case keyCodes.DOWN:
        if (e.target === wrapperRef || isTargetAThumb(e.target)) {
          e.preventDefault();
          if (focusedStopIndex == null) {
            onFocusStop(0);
          } else {
            const next =
              focusedStopIndex === sortedStops.length - 1
                ? focusedStopIndex
                : focusedStopIndex + 1;
            onFocusStop(next);
          }
        }
        break;

      case keyCodes.UP:
        if (e.target === wrapperRef || isTargetAThumb(e.target)) {
          e.preventDefault();
          if (focusedStopIndex == null) {
            onFocusStop(0);
          } else {
            const next =
              focusedStopIndex === 0 ? focusedStopIndex : focusedStopIndex - 1;
            onFocusStop(next);
          }
        }
        break;
    }
  };

  const sortedStops = colorStops
    .map((el, index) => {
      return {
        ...el,
        id: index,
      };
    })
    .sort((a, b) => a.stop - b.stop);

  const thumbs = sortedStops.map((colorStop, index) => (
    <EuiColorStopThumb
      id={`${STOP_ATTR}${index}`}
      key={colorStop.id}
      globalMin={min}
      globalMax={max}
      min={index === 0 ? min : sortedStops[index - 1].stop + 1}
      max={
        index === sortedStops.length - 1 ? max : sortedStops[index + 1].stop - 1
      }
      stop={colorStop.stop}
      color={colorStop.color}
      onRemove={
        sortedStops.length > 1 ? () => onRemove(colorStop.id) : undefined
      }
      onChange={stop => handleStopChange(stop, colorStop.id)}
      onFocus={() => setFocusedStopIndex(index)}
      parentRef={wrapperRef}
      colorPickerMode={mode}
      colorPickerSwatches={swatches}
    />
  ));

  const positions = sortedStops.map(colorStop =>
    Math.round(
      ((colorStop.stop - min) / (max - min)) *
        calculateScale(wrapperRef ? wrapperRef.clientWidth : 100)
    )
  );
  const gradientStop = (colorStop: ColorStop, index: number) => {
    return `${colorStop.color} ${positions[index]}%`;
  };
  const fixedStop = (colorStop: ColorStop, index: number) => {
    if (index === 0) {
      return `${colorStop.color}, ${gradientStop(colorStop, index + 1)}`;
    } else if (index === sortedStops.length - 1) {
      return gradientStop(colorStop, index);
    } else {
      return `${gradientStop(colorStop, index)}, ${gradientStop(
        colorStop,
        index + 1
      )}`;
    }
  };
  const linearGradient = sortedStops.map(
    stopType === 'gradient' ? gradientStop : fixedStop
  );
  const background =
    sortedStops.length > 1
      ? `linear-gradient(to right,${linearGradient})`
      : sortedStops[0].color;

  return (
    <EuiRangeWrapper
      ref={setWrapperRef}
      className={classes}
      fullWidth={fullWidth}
      tabIndex={0}
      onMouseDown={() => setIsHoverDisabled(true)}
      onMouseUp={() => setIsHoverDisabled(false)}
      onMouseLeave={() => setIsHoverDisabled(false)}
      onKeyDown={handleKeyDown}
      onFocus={e => {
        if (e.target === wrapperRef) {
          setHasFocus(true);
        }
      }}
      onBlur={() => setHasFocus(false)}>
      <EuiRangeTrack min={min} max={max}>
        <EuiRangeHighlight
          min={min}
          max={max}
          lowerValue={min}
          upperValue={max}
          color={background}
        />
        <div
          className={classNames('euiColorStops__addContainer', {
            isDisabled: isHoverDisabled,
          })}
          onClick={handleDoubleClick}
          onMouseMove={handleAddHover}>
          <div
            className="euiColorStops__addTarget"
            style={{
              left: `${addTargetPosition}%`,
            }}
          />
        </div>
        {thumbs}
      </EuiRangeTrack>
    </EuiRangeWrapper>
  );
};

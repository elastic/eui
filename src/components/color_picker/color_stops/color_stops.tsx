import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import { keyCodes, DEFAULT_VISUALIZATION_COLOR } from '../../../services';
import { EuiColorStopThumb, ColorStop } from './color_stop_thumb';
import {
  addStop,
  addDefinedStop,
  getPositionFromStop,
  getStopFromMouseLocation,
  isInvalid,
  removeStop,
} from './utils';

import { EuiColorPickerProps } from '../';
import { EuiI18n } from '../../i18n';
import { EuiRangeHighlight } from '../../form/range/range_highlight';
import { EuiRangeTrack } from '../../form/range/range_track';
import { EuiRangeWrapper } from '../../form/range/range_wrapper';
import { EuiScreenReaderOnly } from '../../accessibility';

export interface EuiColorStopsProps extends CommonProps {
  addColor?: ColorStop['color'];
  colorStops: ColorStop[];
  onChange: (stops?: ColorStop[], isInvalid?: boolean) => void;
  fullWidth?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  compressed?: boolean;
  className?: string;
  max?: number;
  min?: number;
  label: string;
  stopType?: 'fixed' | 'gradient';
  mode?: EuiColorPickerProps['mode'];
  swatches?: EuiColorPickerProps['swatches'];
}

// Because of how the thumbs are rendered in the popover, using ref results in an infinite loop.
// We'll instead use old fashioned namespaced DOM selectors to get references
const STOP_ATTR = 'euiColorStop_';

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;

function isTargetAThumb(target: HTMLElement | EventTarget) {
  const element = target as HTMLElement;
  const attr = element.getAttribute('data-index');
  return attr && attr.indexOf(STOP_ATTR) > -1;
}

function sortStops(colorStops: ColorStop[]) {
  return colorStops
    .map((el, index) => {
      return {
        ...el,
        id: index,
      };
    })
    .sort((a, b) => a.stop - b.stop);
}

function getRangeMin(colorStops: ColorStop[], min?: number) {
  const rangeMin = min || DEFAULT_MIN;
  const stops = colorStops.map(el => el.stop);
  const first = Math.min.apply(Math, stops); // https://johnresig.com/blog/fast-javascript-maxmin/

  if (first < rangeMin) {
    if (stops.length === 1) {
      return first - DEFAULT_MIN;
    } else if (stops.length >= 2) {
      return first;
    }
  }
  return DEFAULT_MIN;
}
function getRangeMax(colorStops: ColorStop[], max?: number) {
  const rangeMax = max || DEFAULT_MAX;
  const stops = colorStops.map(el => el.stop);
  const last = Math.max.apply(Math, stops); // https://johnresig.com/blog/fast-javascript-maxmin/

  if (last > rangeMax) {
    if (stops.length === 1) {
      return last + DEFAULT_MAX;
    } else if (stops.length >= 2) {
      return last;
    }
  }
  return DEFAULT_MAX;
}

export const EuiColorStops: FunctionComponent<EuiColorStopsProps> = ({
  addColor = DEFAULT_VISUALIZATION_COLOR,
  max,
  min,
  mode = 'default',
  colorStops,
  onChange,
  disabled,
  readOnly,
  compressed,
  fullWidth,
  className,
  label,
  stopType = 'gradient',
  swatches,
}) => {
  const sortedStops = useMemo(() => sortStops(colorStops), [colorStops]);
  const rangeMax: number = useMemo(() => {
    const result = max != null ? max : getRangeMax(colorStops, max);
    const width = max != null ? 0 : Math.round(result * 0.05);
    return !isNaN(result) ? result + width : DEFAULT_MAX;
  }, [colorStops, max]);
  const rangeMin: number = useMemo(() => {
    const result = min != null ? min : getRangeMin(colorStops, min);
    const width = min != null ? 0 : Math.round(rangeMax * 0.05);
    return !isNaN(result) ? result - width : DEFAULT_MIN;
  }, [colorStops, min, rangeMax]);
  const [hasFocus, setHasFocus] = useState(false);
  const [focusedStopIndex, setFocusedStopIndex] = useState<number | null>(null);
  const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);
  const [addTargetPosition, setAddTargetPosition] = useState<number>(0);
  const [isHoverDisabled, setIsHoverDisabled] = useState<boolean>(false);
  const [focusStopOnUpdate, setFocusStopOnUpdate] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (focusStopOnUpdate !== null) {
      const toFocus = sortedStops.map(el => el.stop).indexOf(focusStopOnUpdate);
      onFocusStop(toFocus);
      setFocusStopOnUpdate(null);
    }
  }, [sortedStops]);

  const isNotInteractive = disabled || readOnly;

  const classes = classNames(
    'euiColorStops',
    {
      'euiColorStops-isDragging': isHoverDisabled,
      'euiColorStops-isDisabled': disabled,
      'euiColorStops-isReadOnly': readOnly,
    },
    className
  );

  const getStopFromMouseLocationFn = (location: { x: number; y: number }) => {
    // Guard against `null` ref in usage
    return getStopFromMouseLocation(
      location,
      wrapperRef!,
      min || rangeMin,
      max || rangeMax
    );
  };

  const getPositionFromStopFn = (stop: ColorStop['stop']) => {
    // Guard against `null` ref in usage
    return getPositionFromStop(
      stop,
      wrapperRef!,
      min || rangeMin,
      max || rangeMax
    );
  };

  const handleOnChange = (colorStops: ColorStop[]) => {
    onChange(colorStops, isInvalid(colorStops));
  };

  const handleStopChange = (stop: ColorStop, id: number) => {
    const newColorStops = [...colorStops];
    newColorStops.splice(id, 1, stop);
    handleOnChange(newColorStops);
  };

  const onFocusStop = (index: number) => {
    if (disabled || !wrapperRef) return;
    const toFocus = wrapperRef.querySelector<HTMLElement>(
      `[data-index=${STOP_ATTR}${index}]`
    );
    if (toFocus) {
      setHasFocus(false);
      setFocusedStopIndex(index);
      toFocus.focus();
    }
  };

  const onFocusWrapper = () => {
    setFocusedStopIndex(null);
    if (wrapperRef) {
      wrapperRef.focus();
    }
  };

  const onAdd = () => {
    const stops = sortedStops.map(({ color, stop }) => {
      return {
        color,
        stop,
      };
    });
    const newColorStops = addStop(stops, addColor, max || rangeMax);

    setFocusStopOnUpdate(newColorStops[colorStops.length].stop);
    handleOnChange(newColorStops);
  };

  const onRemove = (index: number) => {
    const newColorStops = removeStop(colorStops, index);

    onFocusWrapper();
    handleOnChange(newColorStops);
  };

  const handleAddHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isNotInteractive || !wrapperRef) return;
    const stop = getStopFromMouseLocationFn({ x: e.pageX, y: e.pageY });
    const position = getPositionFromStopFn(stop);

    setAddTargetPosition(position);
  };

  const handleAddClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isNotInteractive || isTargetAThumb(e.target) || !wrapperRef) return;
    const newStop = getStopFromMouseLocationFn({ x: e.pageX, y: e.pageY });
    const newColorStops = addDefinedStop(colorStops, newStop, addColor);

    setFocusStopOnUpdate(newStop);
    handleOnChange(newColorStops);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    switch (e.keyCode) {
      case keyCodes.ESCAPE:
        onFocusWrapper();
        break;

      case keyCodes.ENTER:
        if (readOnly || !hasFocus) return;
        onAdd();
        break;

      case keyCodes.BACKSPACE:
        if (readOnly || hasFocus || focusedStopIndex == null) return;
        if (isTargetAThumb(e.target)) {
          if (
            (min == null && focusedStopIndex === 0) ||
            (max == null && focusedStopIndex === sortedStops.length - 1)
          ) {
            return;
          }
          const index = sortedStops[focusedStopIndex].id;
          onRemove(index);
        }
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

  const thumbs = sortedStops.map((colorStop, index) => (
    <EuiColorStopThumb
      isRangeMin={min == null && colorStop.stop === rangeMin}
      isRangeMax={max == null && colorStop.stop === rangeMax}
      data-index={`${STOP_ATTR}${index}`}
      key={colorStop.id}
      globalMin={min || rangeMin}
      globalMax={max || rangeMax}
      min={min}
      max={max}
      localMin={index === 0 ? min || rangeMin : sortedStops[index - 1].stop + 1}
      localMax={
        index === sortedStops.length - 1
          ? max || rangeMax
          : sortedStops[index + 1].stop - 1
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
      disabled={disabled}
      readOnly={readOnly}
      aria-valuetext={`Stop: ${colorStop.stop}, Color: ${
        colorStop.color
      } (${index + 1} of ${colorStops.length})`}
      isPopoverOpen={colorStop.stop === focusStopOnUpdate}
    />
  ));

  const positions = wrapperRef
    ? sortedStops.map(({ stop }) => getPositionFromStopFn(stop))
    : [];
  const gradientStop = (colorStop: ColorStop, index: number) => {
    if (index === 0) {
      return `currentColor, currentColor ${positions[index]}%, ${
        colorStop.color
      } ${positions[index]}%`;
    }
    return `${colorStop.color} ${positions[index]}%`;
  };
  const fixedStop = (colorStop: ColorStop, index: number) => {
    if (index === sortedStops.length - 1) {
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
  const background = `linear-gradient(to right,${linearGradient})`;

  return (
    <EuiRangeWrapper
      data-test-subj="euiColorStops"
      ref={setWrapperRef}
      className={classes}
      fullWidth={fullWidth}
      tabIndex={disabled ? -1 : 0}
      onMouseDown={() => !disabled && setIsHoverDisabled(true)}
      onMouseUp={() => !disabled && setIsHoverDisabled(false)}
      onMouseLeave={() => !disabled && setIsHoverDisabled(false)}
      onKeyDown={handleKeyDown}
      onFocus={e => {
        if (e.target === wrapperRef) {
          setHasFocus(true);
        }
      }}
      onBlur={() => setHasFocus(false)}>
      <EuiScreenReaderOnly>
        <p aria-live="polite">
          <EuiI18n
            values={{
              label,
              disabled: disabled ? 'Disabled.' : '',
              readOnly: readOnly ? 'Read-only.' : '',
            }}
            token="euiColorStops.screenReaderAnnouncement"
            default="{label}: {readOnly} {disabled} Color stop picker. Each stop consists of a number and corresponding color value. Use the Down and Up arrow keys to select individual stops. Press the Enter key to create a new stop."
          />
        </p>
      </EuiScreenReaderOnly>
      <EuiRangeTrack
        min={min || rangeMin}
        max={max || rangeMax}
        compressed={compressed}
        disabled={disabled}
        step={1}>
        <EuiRangeHighlight
          className="euiColorStops__highlight"
          min={min || rangeMin}
          max={max || rangeMax}
          lowerValue={min || rangeMin}
          upperValue={max || rangeMax}
          background={background}
          compressed={compressed}
        />
        <div
          data-test-subj="euiColorStopsAdd"
          className={classNames('euiColorStops__addContainer', {
            'euiColorStops__addContainer-isDisabled':
              isHoverDisabled || disabled || readOnly,
          })}
          onClick={handleAddClick}
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

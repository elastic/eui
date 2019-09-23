import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import { keyCodes } from '../../../services';
import { EuiColorStopThumb, ColorStop } from './color_stop_thumb';
import {
  DEFAULT_COLOR,
  addStop,
  removeStop,
  isInvalid,
  calculateScale,
} from './utils';

import { EuiColorPickerProps } from '../';
import { EuiRangeWrapper } from '../../form/range/range_wrapper';

interface EuiColorStopsProps extends CommonProps {
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

export const EuiColorStops: FunctionComponent<EuiColorStopsProps> = ({
  max,
  min,
  mode = 'default',
  colorStops = [{ stop: 0, color: DEFAULT_COLOR }],
  onChange,
  fullWidth,
  className,
  stopType = 'gradient',
  swatches,
}) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [focusedStop, setFocusedStop] = useState<number | null>(null);
  const [wrapperRef, setWrapperRef] = useState<
    HTMLDivElement | null | undefined
  >(null);
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
        toFocus = wrapperRef.querySelector<HTMLElement>(`#stop_${index}`);
      }
    }
    if (toFocus) {
      setHasFocus(false);
      setFocusedStop(index);
      toFocus.focus();
    }
  };

  const onAdd = (index: number = colorStops.length - 1) => {
    const newColorStops = addStop(colorStops, index);

    handleOnChange(newColorStops);
  };

  const onRemove = (index: number) => {
    const newColorStops = removeStop(colorStops, index);

    setFocusedStop(null);
    if (wrapperRef) {
      wrapperRef.focus();
    }
    handleOnChange(newColorStops);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    switch (e.keyCode) {
      case keyCodes.TAB:
        break;

      case keyCodes.ENTER:
        if (!hasFocus) return;
        onAdd();
        break;

      case keyCodes.BACKSPACE:
        if (hasFocus || focusedStop == null) return;
        const index = sortedStops[focusedStop].id;
        onRemove(index);
        break;

      case keyCodes.UP:
        if (target === wrapperRef || target.id.indexOf('stop_') > -1) {
          e.preventDefault();
          if (focusedStop == null) {
            onFocusStop(0);
          } else {
            const next =
              focusedStop === sortedStops.length - 1
                ? focusedStop
                : focusedStop + 1;
            onFocusStop(next);
          }
        }
        break;

      case keyCodes.DOWN:
        if (target === wrapperRef || target.id.indexOf('stop_') > -1) {
          e.preventDefault();
          if (focusedStop == null) {
            onFocusStop(0);
          } else {
            const next = focusedStop === 0 ? focusedStop : focusedStop - 1;
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
      id={`stop_${index}`}
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
      onFocus={() => setFocusedStop(index)}
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
  const gradientStops = (colorStop: ColorStop, index: number) => {
    return `${colorStop.color} ${positions[index]}%`;
  };
  const fixedStops = (colorStop: ColorStop, index: number) => {
    if (index === 0) {
      return `${colorStop.color}, ${colorStop.color} ${positions[index + 1]}%`;
    } else if (index === sortedStops.length - 1) {
      return `${colorStop.color} ${positions[index]}%`;
    } else {
      return `${colorStop.color} ${positions[index]}%, ${colorStop.color} ${
        positions[index + 1]
      }%`;
    }
  };
  const linearGradient = sortedStops.map(
    stopType === 'gradient' ? gradientStops : fixedStops
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
      onKeyDown={handleKeyDown}
      onClick={e => console.log(e)}
      onFocus={e => {
        if (e.target === wrapperRef) {
          setHasFocus(true);
        }
      }}
      onBlur={() => setHasFocus(false)}>
      {/* TODO: Use euiRangeHighlight / euiRangeTrack */}
      <div className="euiRangeTrack">
        <div className="euiRangeHighlight">
          <div
            className="euiRangeHighlight__progress"
            style={{
              width: '100%',
              background: background,
            }}
          />
        </div>
        {thumbs}
      </div>
    </EuiRangeWrapper>
  );
};

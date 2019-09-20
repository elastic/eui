import React, {
  FunctionComponent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import { CommonProps } from '../../common';
import { isColorInvalid, isStopInvalid } from './utils';
import { getEventPosition, useMouseMove } from '../utils';

import { EuiButtonIcon } from '../../button';
import { EuiColorPicker, EuiColorPickerProps } from '../color_picker';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
// @ts-ignore
import { EuiFieldNumber, EuiFieldText, EuiFormRow } from '../../form';
import { EuiRangeThumb } from '../../form/range/range_thumb';
import { EuiPopover } from '../../popover';
import { EuiSpacer } from '../../spacer';

export interface ColorStop {
  stop: number;
  color: string;
}

interface EuiColorStopThumbProps extends CommonProps, ColorStop {
  id?: string;
  onChange: (colorStop: ColorStop) => void;
  onFocus?: () => void;
  onRemove?: () => void;
  globalMin: number;
  globalMax: number;
  min: number;
  max: number;
  parentRef: RefObject<HTMLDivElement>;
  colorPickerMode: EuiColorPickerProps['mode'];
  colorPickerSwatches?: EuiColorPickerProps['swatches'];
}

export const EuiColorStopThumb: FunctionComponent<EuiColorStopThumbProps> = ({
  id,
  stop,
  color,
  onChange,
  onFocus,
  onRemove,
  globalMin,
  globalMax,
  min,
  max,
  parentRef,
  colorPickerMode,
  colorPickerSwatches,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [colorIsInvalid, setColorIsInvalid] = useState(isColorInvalid(color));
  const [stopIsInvalid, setStopIsInvalid] = useState(isStopInvalid(stop));
  const [numberInputRef, setNumberInputRef] = useState();
  const popoverRef = useRef<EuiPopover>(null);

  useEffect(() => {
    if (isPopoverOpen && popoverRef && popoverRef.current) {
      popoverRef.current.positionPopoverFixed();
    }
  }, [stop]);

  const openPopover = () => setIsPopoverOpen(true);

  const closePopover = () => setIsPopoverOpen(false);

  const handleColorChange = (value: ColorStop['color']) => {
    setColorIsInvalid(isColorInvalid(value));
    propagateChange({ stop, color: value });
  };

  const handleStopChange = (
    value: ColorStop['stop'],
    isDrag: boolean = false
  ) => {
    const willBeInvalid = value > max || value < min;

    if (isDrag && willBeInvalid) {
      if (value > max) {
        value = max;
      }
      if (value < min) {
        value = min;
      }
    }
    setStopIsInvalid(isStopInvalid(value));
    propagateChange({ stop: value, color });
  };

  const handleStopInputChange = (value: ColorStop['stop']) => {
    const willBeInvalid = value > globalMax || value < globalMin;

    if (willBeInvalid) {
      if (value > globalMax) {
        value = globalMax;
      }
      if (value < globalMin) {
        value = globalMin;
      }
    }
    setStopIsInvalid(isStopInvalid(value));
    propagateChange({ stop: value, color });
  };

  const propagateChange = (newColor: ColorStop) => {
    onChange(newColor);
  };

  const handleChange = (
    location: { x: number; y: number },
    isFirstInteraction?: boolean
  ) => {
    if (isFirstInteraction) return;
    if (parentRef == null || parentRef.current == null) {
      return;
    }
    const box = getEventPosition(location, parentRef.current);
    const newStop = Math.round((box.left / box.width) * 100);
    handleStopChange(newStop, true);
  };

  const [handleMouseDown, handleInteraction] = useMouseMove<HTMLButtonElement>(
    handleChange
  );

  return (
    <EuiPopover
      ref={popoverRef}
      className="euiColorStopPopover"
      panelPaddingSize="m"
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      ownFocus={true}
      initialFocus={numberInputRef}
      style={{
        left: `${Math.round(
          ((stop - globalMin) / (globalMax - globalMin)) * 100
        )}%`,
      }}
      button={
        <EuiRangeThumb
          id={id}
          min={min}
          max={max}
          value={stop}
          onClick={openPopover}
          onFocus={onFocus}
          onMouseDown={handleMouseDown}
          onTouchStart={handleInteraction}
          onTouchMove={handleInteraction}
          className="euiColorStopThumb"
          tabIndex={-1}
          style={{
            background: color,
          }}
        />
      }>
      <div className="euiColorStop">
        <EuiFlexGroup gutterSize="s">
          <EuiFlexItem>
            <EuiFormRow
              label="Stop value"
              display="rowCompressed"
              isInvalid={stopIsInvalid}
              error={stopIsInvalid ? 'Value is out of range' : null}>
              <EuiFieldNumber
                inputRef={setNumberInputRef}
                compressed={true}
                min={min}
                max={max}
                value={isStopInvalid(stop) ? '' : stop}
                isInvalid={stopIsInvalid}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleStopInputChange(parseFloat(e.target.value))
                }
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFormRow grow="false" display="rowCompressed" hasEmptyLabelSpace>
              <EuiButtonIcon
                iconType="trash"
                color="danger"
                aria-label="Remove this stop"
                title="Remove this stop"
                disabled={!onRemove}
                onClick={onRemove}
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        <EuiColorPicker
          onChange={handleColorChange}
          color={color}
          mode={colorPickerMode}
          swatches={colorPickerSwatches}
          display="inline"
        />
        {colorPickerMode !== 'swatch' && (
          <React.Fragment>
            <EuiSpacer size="s" />
            <EuiFormRow
              label="Hex color"
              display="rowCompressed"
              isInvalid={colorIsInvalid}
              error={colorIsInvalid ? 'Invalid hex value' : null}>
              <EuiFieldText
                compressed={true}
                value={color}
                isInvalid={colorIsInvalid}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleColorChange(e.target.value)
                }
              />
            </EuiFormRow>
          </React.Fragment>
        )}
      </div>
    </EuiPopover>
  );
};

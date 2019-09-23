import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

import { CommonProps } from '../../common';
import { isColorInvalid, isStopInvalid, calculateScale } from './utils';
import { getEventPosition, useMouseMove } from '../utils';
import { keyCodes } from '../../../services';

import { EuiButtonIcon } from '../../button';
import { EuiColorPicker, EuiColorPickerProps } from '../color_picker';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
// @ts-ignore
import { EuiFieldNumber, EuiFieldText, EuiFormRow } from '../../form';
import { EuiI18n } from '../../i18n';
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
  parentRef?: HTMLDivElement | null;
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
    onChange({ stop, color: value });
  };

  const handleStopChange = (
    value: ColorStop['stop'],
    shouldRespectBoundaries: boolean = false
  ) => {
    const willBeInvalid = value > max || value < min;

    if (shouldRespectBoundaries && willBeInvalid) {
      if (value > max) {
        value = max;
      }
      if (value < min) {
        value = min;
      }
    }
    setStopIsInvalid(isStopInvalid(value));
    onChange({ stop: value, color });
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
    onChange({ stop: value, color });
  };

  const handlePointerChange = (
    location: { x: number; y: number },
    isFirstInteraction?: boolean
  ) => {
    if (isFirstInteraction) return; // Prevents change on the inital MouseDown event
    if (parentRef == null) {
      return;
    }
    const box = getEventPosition(location, parentRef);
    const newStop = Math.round(
      (box.left / box.width) * (globalMax - globalMin) + globalMin
    );
    handleStopChange(newStop, true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (e.keyCode) {
      case keyCodes.LEFT:
        e.preventDefault();
        handleStopChange(stop - 1, true);
        break;

      case keyCodes.RIGHT:
        e.preventDefault();
        handleStopChange(stop + 1, true);
        break;
    }
  };

  const [handleMouseDown, handleInteraction] = useMouseMove<HTMLButtonElement>(
    handlePointerChange
  );

  return (
    <EuiPopover
      ref={popoverRef}
      className="euiColorStopPopover"
      anchorClassName="euiColorStopPopover__anchor"
      panelPaddingSize="m"
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      ownFocus={true}
      initialFocus={numberInputRef}
      style={{
        left: `${Math.round(
          ((stop - globalMin) / (globalMax - globalMin)) *
            calculateScale(parentRef ? parentRef.clientWidth : 100)
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
          onKeyDown={handleKeyDown}
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
        <EuiFlexGroup gutterSize="s" responsive={false}>
          <EuiFlexItem>
            <EuiI18n
              tokens={[
                'euiColorStopThumb.stopLabel',
                'euiColorStopThumb.stopErrorMessage',
              ]}
              defaults={['Stop value', 'Value is out of range']}>
              {([stopLabel, stopErrorMessage]: React.ReactChild[]) => (
                <EuiFormRow
                  label={stopLabel}
                  display="rowCompressed"
                  isInvalid={stopIsInvalid}
                  error={stopIsInvalid ? stopErrorMessage : null}>
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
              )}
            </EuiI18n>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFormRow
              grow="false"
              display="rowCompressed"
              hasEmptyLabelSpace={true}>
              <EuiI18n
                token="euiColorStopThumb.removeLabel"
                default="Remove this stop">
                {(removeLabel: string) => (
                  <EuiButtonIcon
                    iconType="trash"
                    color="danger"
                    aria-label={removeLabel}
                    title={removeLabel}
                    disabled={!onRemove}
                    onClick={onRemove}
                  />
                )}
              </EuiI18n>
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
            <EuiI18n
              tokens={[
                'euiColorStopThumb.hexLabel',
                'euiColorStopThumb.hexErrorMessage',
              ]}
              defaults={['Hex color', 'Invalid hex value']}>
              {([hexLabel, hexErrorMessage]: React.ReactChild[]) => (
                <EuiFormRow
                  label={hexLabel}
                  display="rowCompressed"
                  isInvalid={colorIsInvalid}
                  error={colorIsInvalid ? hexErrorMessage : null}>
                  <EuiFieldText
                    compressed={true}
                    value={color}
                    isInvalid={colorIsInvalid}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleColorChange(e.target.value)
                    }
                  />
                </EuiFormRow>
              )}
            </EuiI18n>
          </React.Fragment>
        )}
      </div>
    </EuiPopover>
  );
};

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
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import chroma, { ColorSpaces } from 'chroma-js';

import { CommonProps } from '../common';

import { EuiScreenReaderOnly } from '../accessibility';
import { EuiColorPickerSwatch } from './color_picker_swatch';
import { EuiFocusTrap } from '../focus_trap';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import {
  EuiFieldText,
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
  EuiFormRow,
  EuiRange,
} from '../form';
import { EuiI18n } from '../i18n';
import { EuiPopover } from '../popover';
import { EuiSpacer } from '../spacer';
import { VISUALIZATION_COLORS, keys } from '../../services';

import { EuiHue } from './hue';
import { EuiSaturation } from './saturation';
import {
  getChromaColor,
  parseColor,
  HEX_FALLBACK,
  HSV_FALLBACK,
  RGB_FALLBACK,
  RGB_JOIN,
} from './utils';

type EuiColorPickerDisplay = 'default' | 'inline';
type EuiColorPickerMode = 'default' | 'swatch' | 'picker' | 'secondaryInput';

export interface EuiColorPickerOutput {
  rgba: ColorSpaces['rgba'];
  hex: string;
  isValid: boolean;
}

interface HTMLDivElementOverrides {
  /**
   * hex (string)
   * RGB (as comma separated string)
   * RGBa (as comma separated string)
   * Empty string will register as 'transparent'
   */
  color?: string | null;
  onBlur?: () => void;
  /**
   * text (string, as entered or selected)
   * hex (8-digit hex if alpha < 1, otherwise 6-digit hex)
   * RGBa (as array; values of NaN if color is invalid)
   * isValid (boolean signifying if the input text is a valid color)
   */
  onChange: (text: string, output: EuiColorPickerOutput) => void;
  onFocus?: () => void;
}
export interface EuiColorPickerProps
  extends CommonProps,
    Omit<HTMLAttributes<HTMLDivElement>, keyof HTMLDivElementOverrides>,
    HTMLDivElementOverrides {
  /**
   *  Custom element to use instead of text input
   */
  button?: ReactElement;
  /**
   *  Use the compressed style for EuiFieldText
   */
  compressed?: boolean;
  display?: EuiColorPickerDisplay;
  disabled?: boolean;
  fullWidth?: boolean;
  id?: string;
  /**
   *  Custom validation flag
   */
  isInvalid?: boolean;
  /**
   * Choose between swatches with gradient picker (default), swatches only, gradient picker only, or secondary input only.
   */
  mode?: EuiColorPickerMode;
  /**
   *  Custom z-index for the popover
   */
  popoverZIndex?: number;
  readOnly?: boolean;
  /**
   *  Array of hex strings (3 or 6 character) to use as swatch options. Defaults to EUI visualization colors
   */
  swatches?: string[];

  /**
   * Creates an input group with element(s) coming before input. It only shows when the `display` is set to `default`.
   * `string` | `ReactElement` or an array of these
   */
  prepend?: EuiFormControlLayoutProps['prepend'];

  /**
   * Creates an input group with element(s) coming after input. It only shows when the `display` is set to `default`.
   * `string` | `ReactElement` or an array of these
   */
  append?: EuiFormControlLayoutProps['append'];
  /**
   * Whether to render the alpha channel (opacity) value range slider.
   */
  showAlpha?: boolean;
  /**
   * Will format the text input in the provided format when possible (hue and saturation selection)
   * Exceptions: Manual text input and swatches will display as-authored
   * Default is to display the last format entered by the user
   */
  format?: 'hex' | 'rgba';
  /**
   * Placement option for a secondary color value input.
   */
  secondaryInputDisplay?: 'top' | 'bottom' | 'none';
  /**
   * Add a button to the primary input to clear its value.
   */
  isClearable?: boolean;
  /**
   * Text to replace the default 'Transparent' placeholder for unset color values.
   */
  placeholder?: string;
}

function isKeyboardEvent(
  event: React.MouseEvent | React.KeyboardEvent
): event is React.KeyboardEvent {
  return typeof event === 'object' && 'key' in event;
}

const getOutput = (
  text: string | null,
  showAlpha: boolean = false
): EuiColorPickerOutput => {
  const color = getChromaColor(text, true);
  let isValid = true;
  if (!showAlpha && color !== null) {
    isValid = color.alpha() === 1;
  }
  // Note that if a consumer has disallowed opacity,
  // we still return the color with an alpha channel, but mark it as invalid
  return color
    ? {
        rgba: color.rgba(),
        hex: color.hex(),
        isValid,
      }
    : {
        rgba: RGB_FALLBACK,
        hex: HEX_FALLBACK,
        isValid: false,
      };
};

const getHsv = (hsv?: number[], fallback: number = 0) => {
  // Chroma's passthrough (RGB) parsing determines that black/white/gray are hue-less and returns `NaN`
  // For our purposes we can process `NaN` as `0` if necessary
  if (!hsv) return HSV_FALLBACK;
  const hue = isNaN(hsv[0]) ? fallback : hsv[0];
  return [hue, hsv[1], hsv[2]] as ColorSpaces['hsv'];
};

export const EuiColorPicker: FunctionComponent<EuiColorPickerProps> = ({
  button,
  className,
  color,
  compressed = false,
  disabled,
  display = 'default',
  fullWidth = false,
  id,
  isInvalid,
  mode = 'default',
  onBlur,
  onChange,
  onFocus,
  readOnly = false,
  swatches = VISUALIZATION_COLORS,
  popoverZIndex,
  prepend,
  append,
  showAlpha = false,
  format,
  secondaryInputDisplay = 'none',
  isClearable = false,
  placeholder,
  'data-test-subj': dataTestSubj,
}) => {
  const preferredFormat = useMemo(() => {
    if (format) return format;
    const parsed = parseColor(color);
    return parsed != null && typeof parsed === 'object' ? 'rgba' : 'hex';
  }, [color, format]);
  const chromaColor = useMemo(() => getChromaColor(color, showAlpha), [
    color,
    showAlpha,
  ]);
  const [alphaRangeValue, setAlphaRangeValue] = useState('100');
  const alphaChannel = useMemo(() => {
    return chromaColor ? chromaColor.alpha() : 1;
  }, [chromaColor]);

  useEffect(() => {
    const percent = (alphaChannel * 100).toFixed();
    setAlphaRangeValue(percent);
  }, [alphaChannel]);

  const [isColorSelectorShown, setIsColorSelectorShown] = useState(false);
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null); // Ideally this is uses `useRef`, but `EuiFieldText` isn't ready for that
  const [popoverShouldOwnFocus, setPopoverShouldOwnFocus] = useState(false);

  const prevColor = useRef(chromaColor ? chromaColor.rgba().join() : null);
  const [colorAsHsv, setColorAsHsv] = useState<ColorSpaces['hsv']>(
    chromaColor ? getHsv(chromaColor.hsv()) : HSV_FALLBACK
  );
  const usableHsv: ColorSpaces['hsv'] = useMemo(() => {
    if (chromaColor && chromaColor.rgba().join() !== prevColor.current) {
      const [h, s, v] = chromaColor.hsv();
      const hue = isNaN(h) ? colorAsHsv[0] : h;
      return [hue, s, v];
    }
    return colorAsHsv;
  }, [chromaColor, colorAsHsv]);

  const satruationRef = useRef<HTMLDivElement>(null);
  const swatchRef = useRef<HTMLButtonElement>(null);

  const testSubjAnchor = classNames('euiColorPickerAnchor', dataTestSubj);

  const updateColorAsHsv = ([h, s, v]: ColorSpaces['hsv']) => {
    setColorAsHsv(getHsv([h, s, v], usableHsv[0]));
  };

  const classes = classNames('euiColorPicker', className);
  const popoverClass = 'euiColorPicker__popoverAnchor';
  const panelClasses = classNames('euiColorPicker__popoverPanel', {
    'euiColorPicker__popoverPanel--pickerOnly':
      mode === 'picker' && secondaryInputDisplay !== 'bottom',
    'euiColorPicker__popoverPanel--customButton': button,
  });
  const swatchClass = 'euiColorPicker__swatchSelect';
  const inputClasses = classNames('euiColorPicker__input', {
    'euiColorPicker__input--inGroup': prepend || append,
  });

  const handleOnChange = (text: string) => {
    const output = getOutput(text, showAlpha);
    if (output.isValid) {
      prevColor.current = output.rgba.join();
    }
    onChange(text, output);
  };

  const handleOnBlur = () => {
    // `onBlur` also gets called when the popover is closing
    // so prevent a second `onBlur` if the popover is open
    if (!isColorSelectorShown && onBlur) {
      onBlur();
    }
  };

  const closeColorSelector = (shouldDelay = false) => {
    if (onBlur) {
      onBlur();
    }

    if (shouldDelay) {
      setTimeout(() => setIsColorSelectorShown(false));
    } else {
      setIsColorSelectorShown(false);
    }
  };

  const showColorSelector = (shouldFocusInside = false) => {
    if (isColorSelectorShown || readOnly) return;
    if (onFocus) {
      onFocus();
    }

    setPopoverShouldOwnFocus(shouldFocusInside);
    setIsColorSelectorShown(true);
  };

  const handleToggle = () => {
    if (isColorSelectorShown) {
      closeColorSelector();
    } else {
      showColorSelector(true);
    }
  };

  const handleFinalSelection = () => {
    // When the trigger is an input, focus the input so you can adjust
    if (inputRef) {
      inputRef.focus();
    }

    closeColorSelector(true);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === keys.ENTER) {
      if (isColorSelectorShown) {
        handleFinalSelection();
      } else {
        showColorSelector();
      }
    }
  };

  const handleInputActivity = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLInputElement>
  ) => {
    if (isKeyboardEvent(event)) {
      if (event.key === keys.ENTER) {
        event.preventDefault();
        handleToggle();
      }
    } else {
      showColorSelector();
    }
  };

  const handleToggleOnKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === keys.ARROW_DOWN) {
      event.preventDefault();
      if (isColorSelectorShown) {
        const nextFocusEl = mode !== 'swatch' ? satruationRef : swatchRef;
        if (nextFocusEl.current) {
          nextFocusEl.current.focus();
        }
      } else {
        showColorSelector(true);
      }
    }
  };

  const handleColorInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleOnChange(event.target.value);
    const newColor = getChromaColor(event.target.value, showAlpha);
    if (newColor) {
      updateColorAsHsv(newColor.hsv());
    }
  };

  const handleClearInput = () => {
    handleOnChange('');
    if (secondaryInputDisplay === 'none' && isColorSelectorShown) {
      closeColorSelector();
    }
  };

  const updateWithHsv = (hsv: ColorSpaces['hsv']) => {
    const color = chroma.hsv(...hsv).alpha(alphaChannel);
    let formatted;
    if (preferredFormat === 'rgba') {
      formatted =
        alphaChannel < 1
          ? color.rgba().join(RGB_JOIN)
          : color.rgb().join(RGB_JOIN);
    } else {
      formatted = color.hex();
    }
    handleOnChange(formatted);
    updateColorAsHsv(hsv);
  };

  const handleColorSelection = (color: ColorSpaces['hsv']) => {
    const [h] = usableHsv;
    const [, s, v] = color;
    const newHsv: ColorSpaces['hsv'] = [h, s, v];
    updateWithHsv(newHsv);
  };

  const handleHueSelection = (hue: number) => {
    const [, s, v] = usableHsv;
    const newHsv: ColorSpaces['hsv'] = [hue, s, v];
    updateWithHsv(newHsv);
  };

  const handleSwatchSelection = (color: string) => {
    const newColor = getChromaColor(color, showAlpha);
    handleOnChange(color);
    if (newColor) {
      updateColorAsHsv(newColor.hsv());
    }

    handleFinalSelection();
  };

  const handleAlphaSelection = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>,
    isValid: boolean
  ) => {
    const target = e.target as HTMLInputElement;
    setAlphaRangeValue(target.value || '');
    if (isValid) {
      const alpha = parseInt(target.value, 10) / 100;
      const newColor = chromaColor ? chromaColor.alpha(alpha) : null;
      const hex = newColor ? newColor.hex() : HEX_FALLBACK;
      const rgba = newColor ? newColor.rgba() : RGB_FALLBACK;
      let text;
      if (preferredFormat === 'rgba') {
        text =
          alpha < 1 ? rgba.join(RGB_JOIN) : rgba.slice(0, 3).join(RGB_JOIN);
      } else {
        text = hex;
      }
      onChange(text, { hex, rgba, isValid: !!newColor });
    }
  };

  const inlineInput = secondaryInputDisplay !== 'none' && (
    <EuiI18n
      tokens={[
        'euiColorPicker.colorLabel',
        'euiColorPicker.colorErrorMessage',
        'euiColorPicker.transparent',
      ]}
      defaults={['Color value', 'Invalid color value', 'Transparent']}>
      {([colorLabel, colorErrorMessage, transparent]: string[]) => (
        <EuiFormRow
          display="rowCompressed"
          isInvalid={isInvalid}
          error={isInvalid ? colorErrorMessage : null}>
          <EuiFormControlLayout
            clear={
              isClearable && color && !readOnly && !disabled
                ? { onClick: handleClearInput }
                : undefined
            }
            readOnly={readOnly}
            compressed={compressed}>
            <EuiFieldText
              compressed={true}
              value={color ? color.toUpperCase() : HEX_FALLBACK}
              placeholder={!color ? placeholder || transparent : undefined}
              onChange={handleColorInput}
              isInvalid={isInvalid}
              disabled={disabled}
              readOnly={readOnly}
              aria-label={colorLabel}
              autoComplete="off"
              data-test-subj={`euiColorPickerInput_${secondaryInputDisplay}`}
            />
          </EuiFormControlLayout>
        </EuiFormRow>
      )}
    </EuiI18n>
  );

  const showSecondaryInputOnly = mode === 'secondaryInput';
  const showPicker = mode !== 'swatch' && !showSecondaryInputOnly;
  const showSwatches = mode !== 'picker' && !showSecondaryInputOnly;

  const composite = (
    <>
      {secondaryInputDisplay === 'top' && (
        <>
          {inlineInput}
          <EuiSpacer size="s" />
        </>
      )}
      {showPicker && (
        <div onKeyDown={handleOnKeyDown}>
          <EuiSaturation
            id={id}
            color={usableHsv}
            hex={chromaColor ? chromaColor.hex() : undefined}
            onChange={handleColorSelection}
            ref={satruationRef}
          />
          <EuiHue
            id={id}
            hue={usableHsv[0]}
            hex={chromaColor ? chromaColor.hex() : undefined}
            onChange={handleHueSelection}
          />
        </div>
      )}
      {showSwatches && (
        <EuiFlexGroup wrap responsive={false} gutterSize="s" role="listbox">
          {swatches.map((swatch, index) => (
            <EuiFlexItem grow={false} key={swatch}>
              <EuiI18n
                token="euiColorPicker.swatchAriaLabel"
                values={{ swatch }}
                default="Select {swatch} as the color">
                {(swatchAriaLabel: string) => (
                  <EuiColorPickerSwatch
                    className={swatchClass}
                    color={swatch}
                    onClick={() => handleSwatchSelection(swatch)}
                    aria-label={swatchAriaLabel}
                    role="option"
                    ref={index === 0 ? swatchRef : undefined}
                  />
                )}
              </EuiI18n>
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>
      )}
      {secondaryInputDisplay === 'bottom' && (
        <>
          {mode !== 'picker' && <EuiSpacer size="s" />}
          {inlineInput}
        </>
      )}
      {showAlpha && (
        <>
          <EuiSpacer size="s" />
          <EuiI18n
            token="euiColorPicker.alphaLabel"
            default="Alpha channel (opacity) value">
            {(alphaLabel: string) => (
              <EuiRange
                className="euiColorPicker__alphaRange"
                data-test-subj="euiColorPickerAlpha"
                compressed={true}
                showInput={true}
                max={100}
                min={0}
                value={alphaRangeValue}
                append="%"
                onChange={handleAlphaSelection}
                aria-label={alphaLabel}
              />
            )}
          </EuiI18n>
        </>
      )}
    </>
  );

  let buttonOrInput;
  if (button) {
    buttonOrInput = cloneElement(button, {
      onClick: handleToggle,
      id: id,
      disabled: disabled,
      'data-test-subj': testSubjAnchor,
    });
  } else {
    const colorStyle = chromaColor ? chromaColor.css() : undefined;
    buttonOrInput = (
      <EuiFormControlLayout
        icon={
          !readOnly
            ? {
                type: 'arrowDown',
                side: 'right',
              }
            : undefined
        }
        clear={
          isClearable && color && !readOnly && !disabled
            ? { onClick: handleClearInput }
            : undefined
        }
        readOnly={readOnly}
        fullWidth={fullWidth}
        compressed={compressed}
        onKeyDown={handleToggleOnKeyDown}
        prepend={prepend}
        append={append}>
        <div
          // Used to pass the chosen color through to form layout SVG using currentColor
          style={{
            color: colorStyle,
          }}>
          <EuiI18n
            tokens={[
              'euiColorPicker.openLabel',
              'euiColorPicker.closeLabel',
              'euiColorPicker.transparent',
            ]}
            defaults={[
              'Press the escape key to close the popover',
              'Press the down key to open a popover containing color options',
              'Transparent',
            ]}>
            {([openLabel, closeLabel, transparent]: string[]) => (
              <EuiFieldText
                className={inputClasses}
                onClick={handleInputActivity}
                onKeyDown={handleInputActivity}
                onBlur={handleOnBlur}
                value={color ? color.toUpperCase() : HEX_FALLBACK}
                placeholder={!color ? placeholder || transparent : undefined}
                id={id}
                onChange={handleColorInput}
                icon={chromaColor ? 'swatchInput' : 'stopSlash'}
                inputRef={setInputRef}
                isInvalid={isInvalid}
                compressed={compressed}
                disabled={disabled}
                readOnly={readOnly}
                fullWidth={fullWidth}
                autoComplete="off"
                data-test-subj={testSubjAnchor}
                aria-label={isColorSelectorShown ? openLabel : closeLabel}
              />
            )}
          </EuiI18n>
        </div>
      </EuiFormControlLayout>
    );
  }

  return display === 'inline' ? (
    <div className={classes}>{composite}</div>
  ) : (
    <EuiPopover
      ownFocus={popoverShouldOwnFocus}
      initialFocus={
        (mode !== 'swatch' ? satruationRef.current : swatchRef.current) ??
        undefined
      }
      button={buttonOrInput}
      isOpen={isColorSelectorShown}
      closePopover={handleFinalSelection}
      zIndex={popoverZIndex}
      className={popoverClass}
      panelClassName={panelClasses}
      display={button ? 'inlineBlock' : 'block'}
      attachToAnchor={button ? false : true}
      anchorPosition="downLeft"
      panelPaddingSize="s">
      <div className={classes} data-test-subj="euiColorPickerPopover">
        <EuiFocusTrap clickOutsideDisables={true}>
          <EuiScreenReaderOnly>
            <p aria-live="polite">
              <EuiI18n
                token="euiColorPicker.screenReaderAnnouncement"
                default="A popup with a range of selectable colors opened.
                Tab forward to cycle through colors choices or press
                escape to close this popup."
              />
            </p>
          </EuiScreenReaderOnly>
          {composite}
        </EuiFocusTrap>
      </div>
    </EuiPopover>
  );
};

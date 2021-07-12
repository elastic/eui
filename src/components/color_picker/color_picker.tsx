/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
import {
  EuiFieldText,
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
  EuiFormRow,
  EuiRange,
} from '../form';
import { useEuiI18n } from '../i18n';
import { EuiPopover } from '../popover';
import { EuiSpacer } from '../spacer';
import { VISUALIZATION_COLORS, keys } from '../../services';

import { EuiColorPickerSwatch } from './color_picker_swatch';
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
  const [
    popoverLabel,
    colorLabel,
    colorErrorMessage,
    transparent,
    alphaLabel,
    openLabel,
    closeLabel,
  ] = useEuiI18n(
    [
      'euiColorPicker.popoverLabel',
      'euiColorPicker.colorLabel',
      'euiColorPicker.colorErrorMessage',
      'euiColorPicker.transparent',
      'euiColorPicker.alphaLabel',
      'euiColorPicker.openLabel',
      'euiColorPicker.closeLabel',
    ],
    [
      'Color selection dialog',
      'Color value',
      'Invalid color value',
      'Transparent',
      'Alpha channel (opacity) value',
      'Press the escape key to close the popover',
      'Press the down key to open a popover containing color options',
    ]
  );

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

  const saturationRef = useRef<HTMLDivElement>(null);
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

  const showColorSelector = () => {
    if (isColorSelectorShown || readOnly) return;
    if (onFocus) {
      onFocus();
    }

    setIsColorSelectorShown(true);
  };

  const handleToggle = () => {
    if (isColorSelectorShown) {
      closeColorSelector();
    } else {
      showColorSelector();
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
        const nextFocusEl = mode !== 'swatch' ? saturationRef : swatchRef;
        if (nextFocusEl.current) {
          nextFocusEl.current.focus();
        }
      } else {
        showColorSelector();
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
            ref={saturationRef}
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
        <ul className="euiColorPicker__swatches">
          {swatches.map((swatch, index) => (
            <li className="euiColorPicker__swatch-item" key={swatch}>
              <EuiColorPickerSwatch
                className={swatchClass}
                color={swatch}
                onClick={() => handleSwatchSelection(swatch)}
                ref={index === 0 ? swatchRef : undefined}
              />
            </li>
          ))}
        </ul>
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
        </div>
      </EuiFormControlLayout>
    );
  }

  return display === 'inline' ? (
    <div className={classes}>{composite}</div>
  ) : (
    <EuiPopover
      initialFocus={inputRef ?? undefined}
      button={buttonOrInput}
      isOpen={isColorSelectorShown}
      closePopover={handleFinalSelection}
      zIndex={popoverZIndex}
      className={popoverClass}
      panelClassName={panelClasses}
      display={button ? 'inlineBlock' : 'block'}
      attachToAnchor={button ? false : true}
      anchorPosition="downLeft"
      panelPaddingSize="s"
      tabIndex={-1}
      aria-label={popoverLabel}
      focusTrapProps={inputRef ? { shards: [inputRef] } : undefined}>
      <div className={classes} data-test-subj="euiColorPickerPopover">
        {composite}
      </div>
    </EuiPopover>
  );
};

import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactChild,
  ReactElement,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { CommonProps, Omit } from '../common';

import { EuiScreenReaderOnly } from '../accessibility';
import { EuiColorPickerSwatch } from './color_picker_swatch';
import { EuiFocusTrap } from '../focus_trap';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
// @ts-ignore
import { EuiFieldText } from '../form/field_text';
import { EuiFormControlLayout } from '../form/form_control_layout';
import { EuiI18n } from '../i18n';
import { EuiPopover } from '../popover';
import {
  HSV,
  VISUALIZATION_COLORS,
  keyCodes,
  hexToHsv,
  hsvToHex,
  isValidHex,
} from '../../services';

import { EuiHue } from './hue';
import { EuiSaturation } from './saturation';

type EuiColorPickerDisplay = 'default' | 'inline';
type EuiColorPickerMode = 'default' | 'swatch' | 'picker';

interface HTMLDivElementOverrides {
  /**
   *  Hex string (3 or 6 character). Empty string will register as 'transparent'
   */
  color?: string | null;
  onBlur?: () => void;
  onChange: (hex: string) => void;
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
   *  Renders inline, without an input element or popover
   */
  inline?: boolean;
  /**
   * Choose between swatches with gradient picker (default), swatches only, or gradient picker only.
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
}

function isKeyboardEvent(
  event: React.MouseEvent | React.KeyboardEvent
): event is React.KeyboardEvent {
  return typeof event === 'object' && 'keyCode' in event;
}

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
}) => {
  const [isColorSelectorShown, setIsColorSelectorShown] = useState(false);
  const [colorAsHsv, setColorAsHsv] = useState(
    color ? hexToHsv(color) : hexToHsv('')
  );
  const [lastHex, setLastHex] = useState(color);
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null); // Ideally this is uses `useRef`, but `EuiFieldText` isn't ready for that
  const [popoverShouldOwnFocus, setPopoverShouldOwnFocus] = useState(false);

  const satruationRef = useRef<HTMLDivElement>(null);
  const swatchRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Mimics `componentDidMount` and `componentDidUpdate`
    if (lastHex !== color) {
      // Only react to outside changes
      const newColorAsHsv = color ? hexToHsv(color) : hexToHsv('');
      setColorAsHsv(newColorAsHsv);
    }
  }, [color]);

  const classes = classNames('euiColorPicker', className);
  const panelClasses = classNames('euiColorPicker__popoverPanel', {
    'euiColorPicker__popoverPanel--pickerOnly': mode === 'picker',
    'euiColorPicker__popoverPanel--customButton': button,
  });
  const swatchClass = 'euiColorPicker__swatchSelect';
  const testSubjAnchor = 'colorPickerAnchor';
  const testSubjPopover = 'colorPickerPopover';

  const handleOnChange = (hex: string) => {
    setLastHex(hex);
    onChange(hex);
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

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === keyCodes.ENTER) {
      if (isColorSelectorShown) {
        handleFinalSelection();
      } else {
        showColorSelector();
      }
    }
  };

  const handleInputActivity = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLInputElement>
  ) => {
    if (isKeyboardEvent(e)) {
      if (e.keyCode === keyCodes.ENTER) {
        e.preventDefault();
        handleToggle();
      }
    } else {
      showColorSelector();
    }
  };

  const handleToggleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === keyCodes.DOWN) {
      e.preventDefault();
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

  const handleColorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOnChange(e.target.value);
    if (isValidHex(e.target.value)) {
      setColorAsHsv(hexToHsv(e.target.value));
    }
  };

  const handleColorSelection = (color: HSV) => {
    const { h } = colorAsHsv;
    const hue = h ? h : 1;
    const newHsv = { ...color, h: hue };
    handleOnChange(hsvToHex(newHsv));
    setColorAsHsv(newHsv);
  };

  const handleHueSelection = (hue: number) => {
    const { s, v } = colorAsHsv;
    const satVal = s && v ? { s, v } : { s: 1, v: 1 };
    const newHsv = { ...satVal, h: hue };
    handleOnChange(hsvToHex(newHsv));
    setColorAsHsv(newHsv);
  };

  const handleSwatchSelection = (color: string) => {
    handleOnChange(color);
    setColorAsHsv(hexToHsv(color));

    handleFinalSelection();
  };

  const composite = (
    <React.Fragment>
      {mode !== 'swatch' && (
        <div onKeyDown={handleOnKeyDown}>
          <EuiSaturation
            id={id}
            color={typeof colorAsHsv === 'object' ? colorAsHsv : undefined}
            hex={color || undefined}
            onChange={handleColorSelection}
            ref={satruationRef}
          />
          <EuiHue
            id={id}
            hue={typeof colorAsHsv === 'object' ? colorAsHsv.h : undefined}
            hex={color || undefined}
            onChange={handleHueSelection}
          />
        </div>
      )}
      {mode !== 'picker' && (
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
    </React.Fragment>
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
    const showColor = color && isValidHex(color);
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
        readOnly={readOnly}
        fullWidth={fullWidth}
        compressed={compressed}
        onKeyDown={handleToggleOnKeyDown}>
        <div
          // Used to pass the chosen color through to form layout SVG using currentColor
          style={{ color: showColor && color ? color : undefined }}>
          <EuiI18n
            tokens={['euiColorPicker.openLabel', 'euiColorPicker.closeLabel']}
            defaults={[
              'Press the escape key to close the popover',
              'Press the down key to open a popover containing color options',
            ]}>
            {([openLabel, closeLabel]: ReactChild[]) => (
              <EuiFieldText
                className="euiColorPicker__input"
                onClick={handleInputActivity}
                onKeyDown={handleInputActivity}
                value={color ? color.toUpperCase() : ''}
                placeholder={!color ? 'Transparent' : undefined}
                id={id}
                onChange={handleColorInput}
                maxLength={7}
                icon={showColor ? 'swatchInput' : 'stopSlash'}
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
      button={buttonOrInput}
      isOpen={isColorSelectorShown}
      closePopover={handleFinalSelection}
      zIndex={popoverZIndex}
      panelClassName={panelClasses}
      display={button ? 'inlineBlock' : 'block'}
      attachToAnchor={button ? false : true}
      anchorPosition="downLeft"
      panelPaddingSize="s">
      <div className={classes} data-test-subj={testSubjPopover}>
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

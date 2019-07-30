import React, { cloneElement, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiScreenReaderOnly } from '../accessibility';
import { EuiColorPickerSwatch } from './color_picker_swatch';
import { EuiFocusTrap } from '../focus_trap';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiFieldText, EuiFormControlLayout } from '../form';
import { EuiI18n } from '../i18n';
import { EuiPopover } from '../popover';
import {
  VISUALIZATION_COLORS,
  keyCodes,
  hexToHsv,
  hsvToHex,
  isValidHex,
} from '../../services';

import { EuiHue } from './hue';
import { EuiSaturation } from './saturation';

export const EuiColorPicker = ({
  button,
  className,
  color,
  compressed = false,
  disabled,
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
  const [inputRef, setInputRef] = useState(null); // Ideally this is uses `useRef`, but `EuiFieldText` isn't ready for that
  const [popoverShouldOwnFocus, setPopoverShouldOwnFocus] = useState(false);

  const satruationRef = useRef(null);
  const swatchRef = useRef(null);

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

  const handleOnChange = hex => {
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

  const handleOnKeyDown = e => {
    if (e.keyCode === keyCodes.ENTER) {
      if (isColorSelectorShown) {
        handleFinalSelection();
      } else {
        showColorSelector();
      }
    }
  };

  const handleInputActivity = e => {
    if (e.keyCode === keyCodes.ENTER) {
      e.preventDefault();
      handleToggle();
    } else if (!e.keyCode) {
      showColorSelector();
    }
  };

  const handleToggleOnKeyDown = e => {
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

  const handleColorInput = e => {
    handleOnChange(e.target.value);
    if (isValidHex(e.target.value)) {
      setColorAsHsv(hexToHsv(e.target.value));
    }
  };

  const handleColorSelection = color => {
    const { h } = colorAsHsv;
    const hue = h ? h : 1;
    const newHsv = { ...color, h: hue };
    handleOnChange(hsvToHex(newHsv));
    setColorAsHsv(newHsv);
  };

  const handleHueSelection = hue => {
    const { s, v } = colorAsHsv;
    const satVal = s && v ? { s, v } : { s: 1, v: 1 };
    const newHsv = { ...satVal, h: hue };
    handleOnChange(hsvToHex(newHsv));
    setColorAsHsv(newHsv);
  };

  const handleSwatchSelection = color => {
    handleOnChange(color);
    setColorAsHsv(hexToHsv(color));

    handleFinalSelection();
  };

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
            : null
        }
        readOnly={readOnly}
        fullWidth={fullWidth}
        compressed={compressed}
        onKeyDown={handleToggleOnKeyDown}>
        <div
          // Used to pass the chosen color through to form layout SVG using currentColor
          style={{ color: showColor ? color : undefined }}>
          <EuiI18n
            tokens={['euiColorPicker.openLabel', 'euiColorPicker.closeLabel']}
            defaults={[
              'Press the escape key to close the popover',
              'Press the down key to open a popover containing color options',
            ]}>
            {([openLabel, closeLabel]) => (
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

  return (
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
          {mode !== 'swatch' && (
            <div onKeyDown={handleOnKeyDown}>
              <EuiSaturation
                id={id}
                color={typeof colorAsHsv === 'object' ? colorAsHsv : undefined}
                hex={color}
                onChange={handleColorSelection}
                ref={satruationRef}
              />
              <EuiHue
                id={id}
                hue={typeof colorAsHsv === 'object' ? colorAsHsv.h : undefined}
                hex={color}
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
                    {swatchAriaLabel => (
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
        </EuiFocusTrap>
      </div>
    </EuiPopover>
  );
};

EuiColorPicker.propTypes = {
  /**
   *  Custom element to use instead of text input
   */
  button: PropTypes.node,
  className: PropTypes.string,
  /**
   *  Hex string (3 or 6 character). Empty string will register as 'transparent'
   */
  color: PropTypes.string,
  /**
   *  Use the compressed style for EuiFieldText
   */
  compressed: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  /**
   *  Custom validation flag
   */
  isInvalid: PropTypes.bool,
  /**
   * Choose between swatches with gradient picker (default), swatches only, or gradient picker only.
   */
  mode: PropTypes.oneOf(['default', 'swatch', 'picker']),
  /**
   * Function called when the popover closes
   */
  onBlur: PropTypes.func,
  /**
   *  (hex: string) => void
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Function called when the popover opens
   */
  onFocus: PropTypes.func,
  /**
   *  Array of hex strings (3 or 6 character) to use as swatch options. Defaults to EUI visualization colors
   */
  swatches: PropTypes.arrayOf(PropTypes.string),
  /**
   *  Custom z-index for the popover
   */
  popoverZIndex: PropTypes.number,
};

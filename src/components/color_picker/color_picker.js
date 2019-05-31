import React, {
  Fragment,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiScreenReaderOnly } from '../accessibility';
import { EuiColorPickerSwatch } from './color_picker_swatch';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiFocusTrap } from '../focus_trap';
import { EuiFieldText } from '../form';
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
  popoverZIndex = 1,
}) => {
  const [isColorSelectorShown, setIsColorSelectorShown] = useState(false);
  const [colorAsHsv, setColorAsHsv] = useState(
    color ? hexToHsv(color) : hexToHsv('')
  );
  const [lastHex, setLastHex] = useState(color);
  const [inputRef, setInputRef] = useState(null); // Ideally this is uses `useRef`, but `EuiFieldText` isn't ready for that

  const containerRef = useRef(null);

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
  const popoverClasses = classNames('euiColorPicker__popoverContainer', {
    'euiColorPicker__popoverContainer--customButton': button,
  });
  const anchorClasses = classNames('euiColorPicker__popoverAnchor', {
    'euiColorPicker__popoverAnchor--customButton': button,
  });
  const swatchClass = 'euiColorPicker__swatchSelect';
  const testSubjAnchor = 'colorPickerAnchor';
  const testSubjPopover = 'colorPickerPopover';

  const handleOnChange = hex => {
    setLastHex(hex);
    onChange(hex);
  };

  const closeColorSelector = shouldDelay => {
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

  const handleButtonClick = e => {
    if (e.detail === 0) return; // Enter key used; we'll handle it with handleOnKeyDown
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

  const handleOnKeyDown = e => {
    if (e.keyCode === keyCodes.ENTER) {
      if (isColorSelectorShown) {
        if (e.target && e.target.classList.contains(swatchClass)) return; // Swatches handle themselves
        handleFinalSelection();
      } else {
        showColorSelector();
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
      onClick: handleButtonClick,
      id: id,
      disabled: disabled,
      'data-test-subj': testSubjAnchor,
    });
  } else {
    const showColor = color && isValidHex(color);
    buttonOrInput = (
      <div
        // Used to pass the chosen color through to form layout SVG using currentColor
        style={{ color: showColor ? color : undefined }}>
        <EuiFieldText
          onFocus={showColorSelector}
          onClick={showColorSelector}
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
        />
      </div>
    );
  }

  return (
    <EuiFocusTrap disabled={!isColorSelectorShown} returnFocus={false}>
      <div ref={containerRef} onKeyDown={handleOnKeyDown}>
        <EuiPopover
          button={buttonOrInput}
          isOpen={isColorSelectorShown}
          closePopover={handleFinalSelection}
          zIndex={popoverZIndex}
          className={popoverClasses}
          anchorClassName={anchorClasses}
          panelClassName={panelClasses}
          attachToAnchor={button ? false : true}
          anchorPosition="downLeft"
          panelPaddingSize="s"
          insert={{
            position: 'after',
            sibling: containerRef.current,
          }}>
          <div className={classes} data-test-subj={testSubjPopover}>
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
              <Fragment>
                <EuiSaturation
                  id={id}
                  color={
                    typeof colorAsHsv === 'object' ? colorAsHsv : undefined
                  }
                  hex={color}
                  onChange={handleColorSelection}
                />
                <EuiHue
                  id={id}
                  hue={
                    typeof colorAsHsv === 'object' ? colorAsHsv.h : undefined
                  }
                  hex={color}
                  onChange={handleHueSelection}
                />
              </Fragment>
            )}
            {mode !== 'picker' && (
              <EuiFlexGroup
                wrap
                responsive={false}
                gutterSize="s"
                role="listbox">
                {swatches.map(swatch => (
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
                        />
                      )}
                    </EuiI18n>
                  </EuiFlexItem>
                ))}
              </EuiFlexGroup>
            )}
          </div>
        </EuiPopover>
      </div>
    </EuiFocusTrap>
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

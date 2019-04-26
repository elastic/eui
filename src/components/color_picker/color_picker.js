import React, {
  Component,
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiColorPickerSwatch } from './color_picker_swatch';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiFieldText } from '../form';
import { EuiPopover } from '../popover';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiSpacer } from '../spacer';
import { VISUALIZATION_COLORS, keyCodes, hexToHsl, hslToHex } from '../../services';

import { EuiHue } from './hue';
import { EuiSaturation } from './saturation';

export class EuiColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showColorSelector: false,
      colorAsHsl: hexToHsl(props.color)
    };

  }

  closeColorSelector = () => {
    // To do proper label coloring if used as a child of EuiFormRow
    if (this.props.onBlur) {
      this.props.onBlur();
    }

    this.setState({ showColorSelector: false });
  };

  showColorSelector = () => {
    // To do proper label coloring if used as a child of EuiFormRow
    if (this.props.onFocus) {
      this.props.onFocus();
    }

    this.setState({ showColorSelector: true });
  };

  handleColorInput = (e) => {
    this.props.onChange(e.target.value);
    this.setState({ colorAsHsl: hexToHsl(e.target.value) });
  };

  handleColorSelection = (color) => {
    this.props.onChange(hslToHex(color));
    this.setState({ colorAsHsl: color });
  };

  handleSwatchSelection(color) {
    this.props.onChange(color);
    this.setState({ colorAsHsl: hexToHsl(color) });

    // When the trigger is an input, focus the input so you can adjust
    if (this.input) {
      this.input.focus();
    }

    // When the trigger is a button it makes sense to close the popover
    if (this.props.button) {
      this.closeColorSelector();
    }
  }

  onKeyDown = event => {
    if (event.keyCode === keyCodes.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      this.closeColorSelector();
    }
  };

  render() {
    const {
      className,
      color,
      compressed,
      disabled,
      id,
      isInvalid,
      swatches,
      button,
    } = this.props;
    const classes = classNames('euiColorPicker', className);
    const swatchOptions = swatches || VISUALIZATION_COLORS;

    const swatchButtons = swatchOptions.map((swatch) => (
      <EuiFlexItem grow={false} key={swatch}>
        <EuiColorPickerSwatch
          className="euiColorPicker__swatchSelect"
          color={swatch}
          onClick={this.handleSwatchSelection.bind(this, swatch)}
          aria-label={`Select ${swatch} as the color`}
        />
      </EuiFlexItem>
    ));

    const input = (
      <div style={{ color: color }}>
        <EuiFieldText
          onFocus={this.showColorSelector}
          value={color ? color.toUpperCase() : ''}
          placeholder={!color ? 'Transparent' : null}
          id={id}
          onChange={this.handleColorSelection}
          maxLength="7"
          icon={color ? 'stopFilled' : 'stopSlash'}
          inputRef={(input) => { this.input = input; }}
          isInvalid={isInvalid}
          compressed={compressed}
          disabled={disabled}
        />
      </div>
    );

    let buttonOrInput;
    if (button) {
      buttonOrInput = (
        cloneElement(button, {
          onClick: this.state.showColorSelector ? this.closeColorSelector : this.showColorSelector,
          id: id,
          disabled: disabled
        }
        ));
    } else {
      buttonOrInput = input;
    }

    return (
      <div onKeyDown={this.onKeyDown}>
        <EuiPopover
          id="popover"
          button={buttonOrInput}
          isOpen={this.state.showColorSelector}
          closePopover={this.closeColorSelector}
        >
          <div className={classes}>
            <EuiScreenReaderOnly>
              <p aria-live="polite">
                A popup with a range of selectable colors opened.
                Tab forward to cycle through colors choices or press
                escape to close this popup.
              </p>
            </EuiScreenReaderOnly>
            <EuiFlexGroup wrap responsive={false} gutterSize="s">
              {swatchButtons}
            </EuiFlexGroup>
            <EuiSpacer size="s" />
            <EuiSaturation
              color={this.state.colorAsHsl}
              onChange={this.handleColorSelection}
            />
            <EuiSpacer size="s" />
            <EuiHue
              hue={this.state.colorAsHsl.h}
              onChange={
                (hue) => this.handleColorSelection({ ...this.state.colorAsHsl, h: hue })
              }
            />
          </div>
        </EuiPopover>
      </div>
    );
  }
}

EuiColorPicker.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

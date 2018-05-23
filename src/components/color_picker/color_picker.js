import React, {
  Component,
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiFieldText } from '../form'
import { EuiPanel } from '../panel'
import { EuiOutsideClickDetector } from '../outside_click_detector'
import { EuiFlexGroup, EuiFlexItem } from '../flex'
import { VISUALIZATION_COLORS, keyCodes } from '../../services';

export class EuiColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showColorSelector: false,
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

  handleColorSelection = (e) => {
    this.props.onChange(e.target.value);
  };

  handleSwatchSelection(color) {
    this.props.onChange(color);
    if (this.input) {
      this.input.focus();
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
        <button
          className="euiColorPicker__swatchSelect"
          style={{ background: swatch }}
          onClick={this.handleSwatchSelection.bind(this, swatch)}
        />
      </EuiFlexItem>
    ));

    let swatchesPanel;
    if (this.state.showColorSelector) {
      swatchesPanel = (
        <EuiPanel
          className="euiColorPicker__panel"
          paddingSize="s"
        >
          <EuiFlexGroup wrap responsive={false} gutterSize="s">
            {swatchButtons}
          </EuiFlexGroup>
        </EuiPanel>
      );
    }

    const input = (
      <div style={{ color: color }}>
        <EuiFieldText
          onFocus={this.showColorSelector}
          value={color ? color.toUpperCase() : ""}
          placeholder={!color ? "Transparent" : null}
          id={id}
          onChange={this.handleColorSelection}
          maxLength="7"
          icon={color ? "stopFilled" : "stopSlash"}
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
          onClick: this.showColorSelector,
          id: id,
          disabled: disabled
        }
      ));
    } else {
      buttonOrInput = input;
    }

    return (
      <div
        className={classes}
        onKeyDown={this.onKeyDown}
      >
        <EuiOutsideClickDetector onOutsideClick={this.closeColorSelector}>
          <div>
            {buttonOrInput}
            {swatchesPanel}
          </div>
        </EuiOutsideClickDetector>
      </div>
    );
  }
}

EuiColorPicker.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

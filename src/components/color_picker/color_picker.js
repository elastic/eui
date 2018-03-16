import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { rgbToHex } from '../../../src/services'

import makeId from '../form/form_row/make_id';

import lightColors from '!!sass-vars-to-js-loader!../../../src/global_styling/variables/_colors.scss'

import { SketchPicker } from 'react-color';

import { EuiOutsideClickDetector } from '../outside_click_detector';

import { EuiColorPickerSwatch } from './color_picker_swatch';

import { EuiPopover } from '../popover';

export class EuiColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showColorSelector: false,
      id: this.props.id || makeId(),
    };
  }

  closeColorSelector = () => {
    this.setState({ showColorSelector: false });
  };

  toggleColorSelector = () => {
    this.setState({ showColorSelector: !this.state.showColorSelector });
  };

  handleColorSelection = (color) => {
    this.props.onChange(color.hex);
  };

  getColorLabel() {
    const { color } = this.props;
    const colorValue = color === null ? '(transparent)' : color.toUpperCase();
    return (
      <span
        className="euiColorPicker__label"
        aria-label={`Color selection is ${ colorValue }`}
      >
        { colorValue }
      </span>
    );
  }

  render() {
    const { color, className, showColorLabel } = this.props;
    const classes = classNames('euiColorPicker', className);

    const allowedColors = [
      'euiColorVis0',
      'euiColorVis1',
      'euiColorVis2',
      'euiColorVis3',
      'euiColorVis4',
      'euiColorVis5',
      'euiColorVis6',
      'euiColorVis7',
      'euiColorVis8',
      'euiColorVis9',
    ]

    let colorSwatches = [];

    allowedColors.map(function(color, index) {
      colorSwatches.push(rgbToHex(lightColors[color].rgba))
    });

    const button = (
      <button
        className="euiColorPicker__preview euiFieldText"
        onClick={this.toggleColorSelector}
      >
        <EuiColorPickerSwatch color={color} aria-label={this.props['aria-label']} />
        { showColorLabel ? this.getColorLabel() : null }
      </button>
    );

    return (
      <EuiOutsideClickDetector onOutsideClick={this.closeColorSelector}>
        <div
          className={classes}
          data-test-subj={this.props['data-test-subj']}
        >
          <EuiPopover
            id={this.state.id}
            data-test-subj="colorPickerPopup"
            button={button}
            isOpen={this.state.showColorSelector}
            closePopover={this.closeColorSelector}
            anchorPosition="downLeft"
            panelPaddingSize="none"
            ownFocus
          >
            <SketchPicker
              triangle="hide"
              color={color ? color : '#ffffff'}
              disableAlpha={true}
              onChange={this.handleColorSelection}
              presetColors={colorSwatches}
              role="dialog"
              aria-labelledby={this.state.id}
            />
          </EuiPopover>
        </div>
      </EuiOutsideClickDetector>
    );
  }
}

EuiColorPicker.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  showColorLabel: PropTypes.bool,
};

EuiColorPicker.defaultProps = {
  'aria-label': 'Select a color',
  showColorLabel: true,
};

import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChromePicker } from 'react-color';

import { EuiOutsideClickDetector } from '../outside_click_detector';

import { EuiColorPickerSwatch } from './color_picker_swatch';

export class EuiColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showColorSelector: false,
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
    const colorValue = color === null ? '(transparent)' : color;
    return (
      <div
        className="euiColorPicker__label"
        aria-label={`Color selection is ${ colorValue }`}
      >
        { colorValue }
      </div>
    );
  }

  render() {
    const { color, className, showColorLabel } = this.props;
    const classes = classNames('euiColorPicker', className);
    return (
      <EuiOutsideClickDetector onOutsideClick={this.closeColorSelector}>
        <div
          className={classes}
          data-test-subj={this.props['data-test-subj']}
        >
          <div
            className="euiColorPicker__preview"
            onClick={this.toggleColorSelector}
          >
            <EuiColorPickerSwatch color={color} aria-label={this.props['aria-label']} />
            { showColorLabel ? this.getColorLabel() : null }
          </div>
          {
            this.state.showColorSelector ?
              <div className="euiColorPickerPopUp" data-test-subj="colorPickerPopup">
                <ChromePicker
                  color={color ? color : '#ffffff'}
                  disableAlpha={true}
                  onChange={this.handleColorSelection}
                />
              </div>
              : null
          }
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

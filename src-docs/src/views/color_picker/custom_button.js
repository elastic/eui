import React, { Component, Fragment } from 'react';

import {
  EuiColorPicker,
  EuiFormRow,
  EuiColorPickerSwatch,
  EuiBadge,
  EuiSpacer,
} from '../../../../src/components';

import { isValidHex } from '../../../../src/services';

export class CustomButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: null,
    };
  }

  handleChange = value => {
    this.setState({ color: value });
  };

  render() {
    const hasErrors = !isValidHex(this.state.color) && this.state.color !== '';

    let errors;
    if (hasErrors) {
      errors = ['Provide a valid hex value'];
    }

    return (
      <Fragment>
        <EuiFormRow label="Pick a color" error={errors}>
          <EuiColorPicker
            onChange={this.handleChange}
            color={this.state.color}
            button={
              <EuiColorPickerSwatch
                color={this.state.color}
                aria-label="Select a new color"
              />
            }
          />
        </EuiFormRow>
        <EuiSpacer />
        <EuiColorPicker
          onChange={this.handleChange}
          color={this.state.color}
          isInvalid={hasErrors}
          button={
            <EuiBadge
              color={this.state.color ? this.state.color : 'hollow'}
              onClickAriaLabel="Select a new color">
              Color this badge
            </EuiBadge>
          }
        />
      </Fragment>
    );
  }
}

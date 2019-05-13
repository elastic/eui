import PropTypes from 'prop-types';
import React, { Component } from 'react';
import dateMath from '@elastic/datemath';

import { EuiFlexGroup, EuiFlexItem } from '../../../flex';
import {
  EuiForm,
  EuiFormRow,
  EuiSelect,
  EuiFieldNumber,
  EuiFieldText,
  EuiSwitch,
} from '../../../form';
import { EuiSpacer } from '../../../spacer';

import { timeUnits } from '../time_units';
import { relativeOptions } from '../relative_options';
import {
  parseRelativeParts,
  toRelativeStringFromParts,
} from '../relative_utils';

export class EuiRelativeTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...parseRelativeParts(this.props.value),
    };
  }

  onCountChange = evt => {
    const sanitizedValue = parseInt(evt.target.value, 10);
    this.setState(
      {
        count: isNaN(sanitizedValue) ? '' : sanitizedValue,
      },
      this.handleChange
    );
  };

  onUnitChange = evt => {
    this.setState(
      {
        unit: evt.target.value,
      },
      this.handleChange
    );
  };

  onRoundChange = evt => {
    this.setState(
      {
        round: evt.target.checked,
      },
      this.handleChange
    );
  };

  handleChange = () => {
    if (this.state.count === '' || this.state.count < 0) {
      return;
    }
    this.props.onChange(toRelativeStringFromParts(this.state));
  };

  render() {
    const isInvalid = this.state.count < 0;
    const parsedValue = dateMath.parse(this.props.value, {
      roundUp: this.props.roundUp,
    });
    const formatedValue =
      isInvalid || !parsedValue || !parsedValue.isValid()
        ? ''
        : parsedValue.format(this.props.dateFormat);
    return (
      <EuiForm className="euiDatePopoverContent__padded">
        <EuiFlexGroup gutterSize="s" responsive={false}>
          <EuiFlexItem>
            <EuiFormRow
              isInvalid={isInvalid}
              error={isInvalid ? 'Must be >= 0' : null}>
              <EuiFieldNumber
                aria-label="Count of"
                data-test-subj={`superDatePickerRelativeDateInputNumber`}
                value={this.state.count}
                onChange={this.onCountChange}
                isInvalid={isInvalid}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow>
              <EuiSelect
                data-test-subj={`superDatePickerRelativeDateInputUnitSelector`}
                value={this.state.unit}
                options={relativeOptions}
                onChange={this.onUnitChange}
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="s" />
        <EuiSwitch
          data-test-subj={`superDatePickerRelativeDateRoundSwitch`}
          label={`Round to the ${timeUnits[this.state.unit.substring(0, 1)]}`}
          checked={this.state.round}
          onChange={this.onRoundChange}
        />
        <EuiSpacer size="m" />
        <EuiFieldText value={formatedValue} readOnly />
      </EuiForm>
    );
  }
}

EuiRelativeTab.propTypes = {
  dateFormat: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  roundUp: PropTypes.bool,
};

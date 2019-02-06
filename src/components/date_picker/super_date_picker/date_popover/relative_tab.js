
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
  EuiSwitch
} from '../../../form';

import { timeUnits } from '../time_units';
import { relativeOptions } from '../relative_options';
import { parseRelativeParts, toRelativeStringFromParts } from '../relative_utils';

export class EuiRelativeTab extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...parseRelativeParts(this.props.value),
    };
  }

  onCountChange = (evt) => {
    const sanitizedValue = parseInt(evt.target.value, 10);
    this.setState({
      count: isNaN(sanitizedValue) ? '' : sanitizedValue,
    }, this.handleChange);
  }

  onUnitChange = (evt) => {
    this.setState({
      unit: evt.target.value,
    }, this.handleChange);
  }

  onRoundChange = (evt) => {
    this.setState({
      round: evt.target.checked,
    }, this.handleChange);
  };

  handleChange = () => {
    if (this.state.count === '') {
      return;
    }
    this.props.onChange(toRelativeStringFromParts(this.state));
  }

  render() {
    const formatedValue = dateMath.parse(this.props.value).format(this.props.dateFormat);
    return (
      <EuiForm className="euiDatePopoverContent__padded">
        <EuiFlexGroup gutterSize="s" responsive={false}>
          <EuiFlexItem>
            <EuiFormRow>
              <EuiFieldNumber
                aria-label="Count of"
                value={this.state.count}
                onChange={this.onCountChange}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow>
              <EuiSelect
                value={this.state.unit}
                options={relativeOptions}
                onChange={this.onUnitChange}
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFormRow>
          <EuiFieldText value={formatedValue} readOnly />
        </EuiFormRow>
        <EuiFormRow>
          <EuiSwitch
            label={`Round to the ${timeUnits[this.state.unit.substring(0, 1)]}`}
            checked={this.state.round}
            onChange={this.onRoundChange}
          />
        </EuiFormRow>
      </EuiForm>
    );
  }
}

EuiRelativeTab.propTypes = {
  dateFormat: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

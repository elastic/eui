import PropTypes from 'prop-types';
import React, { Component } from 'react';
import dateMath from '@elastic/datemath';
import { toSentenceCase } from '../../../../services/string/to_case';
import { htmlIdGenerator } from '../../../../services';
import { EuiFlexGroup, EuiFlexItem } from '../../../flex';
import {
  EuiForm,
  EuiFormRow,
  EuiSelect,
  EuiFieldNumber,
  EuiFieldText,
  EuiSwitch,
  EuiFormLabel,
} from '../../../form';
import { EuiSpacer } from '../../../spacer';

import { timeUnits } from '../time_units';
import { relativeOptions } from '../relative_options';
import {
  parseRelativeParts,
  toRelativeStringFromParts,
} from '../relative_utils';
import { EuiScreenReaderOnly } from '../../../accessibility';
import { EuiI18n } from '../../../i18n';

export class EuiRelativeTab extends Component {
  constructor(props) {
    super(props);
    const sentenceCasedPosition = toSentenceCase(props.position);

    this.state = {
      ...parseRelativeParts(this.props.value),
      sentenceCasedPosition,
    };
  }

  generateId = htmlIdGenerator();

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
    const relativeDateInputNumberDescriptionId = this.generateId();
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
            <EuiI18n
              tokens={[
                'euiRelativeTab.numberInputError',
                'euiRelativeTab.numberInputLabel',
              ]}
              defaults={['Must be >= 0', 'Time span amount']}>
              {([numberInputError, numberInputLabel]) => (
                <EuiFormRow
                  isInvalid={isInvalid}
                  error={isInvalid ? numberInputError : null}>
                  <EuiFieldNumber
                    compressed
                    aria-label={numberInputLabel}
                    aria-describedby={relativeDateInputNumberDescriptionId}
                    data-test-subj={'superDatePickerRelativeDateInputNumber'}
                    value={this.state.count}
                    onChange={this.onCountChange}
                    isInvalid={isInvalid}
                  />
                </EuiFormRow>
              )}
            </EuiI18n>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiI18n
              token="euiRelativeTab.unitInputLabel"
              default="Relative time span">
              {unitInputLabel => (
                <EuiSelect
                  compressed
                  aria-label={unitInputLabel}
                  data-test-subj={
                    'superDatePickerRelativeDateInputUnitSelector'
                  }
                  value={this.state.unit}
                  options={relativeOptions}
                  onChange={this.onUnitChange}
                />
              )}
            </EuiI18n>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        <EuiI18n
          token="euiRelativeTab.roundingLabel"
          default="Round to the {unit}"
          values={{ unit: timeUnits[this.state.unit.substring(0, 1)] }}>
          {roundingLabel => (
            <EuiSwitch
              data-test-subj={'superDatePickerRelativeDateRoundSwitch'}
              label={roundingLabel}
              checked={this.state.round}
              onChange={this.onRoundChange}
            />
          )}
        </EuiI18n>

        <EuiSpacer size="m" />
        <EuiFieldText
          compressed
          value={formatedValue}
          readOnly
          prepend={
            <EuiFormLabel>
              <EuiI18n
                token="euiRelativeTab.relativeDate"
                default="{position} date"
                values={{ position: this.state.sentenceCasedPosition }}
              />
            </EuiFormLabel>
          }
        />
        <EuiScreenReaderOnly id={relativeDateInputNumberDescriptionId}>
          <p>
            <EuiI18n
              token="euiRelativeTab.fullDescription"
              default="The unit is changeable. Currently set to {unit}."
              values={{ unit: this.state.unit }}
            />
          </p>
        </EuiScreenReaderOnly>
      </EuiForm>
    );
  }
}

EuiRelativeTab.propTypes = {
  dateFormat: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  roundUp: PropTypes.bool,
  position: PropTypes.oneOf(['start', 'end']),
};

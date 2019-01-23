import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiRange,
  EuiSpacer,
  EuiFormHelpText,
  EuiCode,
  EuiText,
  EuiFormRow,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    this.levels = [
      {
        min: 0,
        max: 600,
        color: 'danger'
      },
      {
        min: 600,
        max: 2000,
        color: 'success'
      }
    ];

    this.state = {
      value: '120',
      validatedValue: '3000',
      validationErrorMsg: null,
    };
  }

  onChange = e => {
    // onChange called with Event
    this.setState({
      value: e.target.value,
    });
  };

  onValidatedChange = newValue => {
    // onValidatedChange called with Number (not Event like onChange)
    this.setState({
      validatedValue: newValue
    });
  };

  onValidationError = message => {
    this.setState({
      validationErrorMsg: message
    });
  }

  render() {
    return (
      <Fragment>
        <EuiRange
          id={makeId()}
          min={100}
          max={200}
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
          showLabels
          showValue
          name="firstRange"
        />

        <EuiSpacer size="xl" />

        <EuiRange
          id={makeId()}
          min={100}
          max={200}
          value={this.state.value}
          onChange={this.onChange}
          disabled
          aria-label="Use aria labels when no actual label is in use"
          showLabels
        />

        <EuiSpacer size="xl" />

        <EuiRange
          id={makeId()}
          min={100}
          max={200}
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
          showLabels
          showInput
          showRange
        />

        <EuiSpacer size="xl" />

        <EuiRange
          id={makeId()}
          min={0}
          max={2000}
          step={50}
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
          aria-describedby="levelsHelp"
          showLabels
          showInput
          compressed
          levels={this.levels}
        />
        <EuiFormHelpText id="levelsHelp">Recommended levels are 600 and above.</EuiFormHelpText>

        <EuiSpacer size="xl" />

        <EuiRange
          id={makeId()}
          min={0}
          max={2000}
          step={50}
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
          showTicks
          showRange
          showValue
          tickInterval={300}
        />

        <EuiSpacer size="xl" />

        <EuiRange
          id={makeId()}
          min={0}
          max={2000}
          step={50}
          value={this.state.value}
          onChange={this.onChange}
          aria-label="Use aria labels when no actual label is in use"
          aria-describedby="levelsHelp"
          showTicks
          showInput
          tickInterval={500}
          levels={this.levels}
        />

        <EuiSpacer size="xl" />

        <EuiText>
          <h3>Validation</h3>
          <p>
            <EuiCode>onChange</EuiCode> is called with the DOM Event and requires you to extract the value
            and validate that the value is a Number within the specified range.
          </p>
          <p>
            Use <EuiCode>onValidatedChange</EuiCode> callback to only receive updates when the value
            changes to a Number that is within the specified range and leave all that error checking
            to EuiRange.
          </p>
          <p>
            Provide <EuiCode>onValidationError</EuiCode> to receive validation error messages.
          </p>
        </EuiText>
        <EuiSpacer size="s" />
        <EuiFormRow
          isInvalid={this.state.validationErrorMsg == null ? false : true}
          error={this.state.validationErrorMsg}
        >
          <EuiRange
            id={makeId()}
            min={2000}
            max={5000}
            step={50}
            value={this.state.validatedValue}
            onValidatedChange={this.onValidatedChange}
            onValidationError={this.onValidationError}
            showInput
            showRange
            showTicks
            showValue
            tickInterval={500}
          />
        </EuiFormRow>

      </Fragment>
    );
  }
}

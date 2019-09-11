import React, { Component, Fragment } from 'react';

import {
  EuiButton,
  EuiForm,
  EuiSelect,
  EuiFormRow,
  EuiTextArea,
  EuiFieldText,
  EuiSpacer,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showErrors: true,
    };
  }

  onButtonClick() {
    this.setState({
      showErrors: !this.state.showErrors,
    });
  }

  render() {
    const button = (
      <EuiButton fill color="danger" onClick={this.onButtonClick.bind(this)}>
        Toggle errors
      </EuiButton>
    );

    let errors;

    if (this.state.showErrors) {
      errors = [
        "Here's an example of an error",
        'You might have more than one error, so pass an array.',
      ];
    }

    return (
      <Fragment>
        <EuiForm isInvalid={this.state.showErrors} error={errors}>
          <EuiFormRow label="Validation only" isInvalid={this.state.showErrors}>
            <EuiFieldText name="first" isInvalid={this.state.showErrors} />
          </EuiFormRow>

          <EuiFormRow
            label="Validation with help text and errors"
            helpText="I am some friendly help text."
            isInvalid={this.state.showErrors}
            error={errors}>
            <EuiFieldText name="text" isInvalid={this.state.showErrors} />
          </EuiFormRow>

          <EuiFormRow label="Text area" isInvalid={this.state.showErrors}>
            <EuiTextArea name="area" isInvalid={this.state.showErrors} />
          </EuiFormRow>

          <EuiFormRow label="Select" isInvalid={this.state.showErrors}>
            <EuiSelect
              options={[
                { value: 'option_one', text: 'Option one' },
                { value: 'option_two', text: 'Option two' },
                { value: 'option_three', text: 'Option three' },
              ]}
              isInvalid={this.state.showErrors}
            />
          </EuiFormRow>

          <EuiSpacer />

          {button}
        </EuiForm>
      </Fragment>
    );
  }
}

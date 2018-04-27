import React, {
  Component,
} from 'react';

import {
  EuiButton,
  EuiCheckboxGroup,
  EuiCode,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiDescriptiveFormRow,
  EuiFilePicker,
  EuiRange,
  EuiSelect,
  EuiSwitch,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    const idPrefix = makeId();

    this.state = {
      isSwitchChecked: false,
      checkboxes: [{
        id: `${idPrefix}0`,
        label: 'Option one',
      }, {
        id: `${idPrefix}1`,
        label: 'Option two is checked by default',
      }, {
        id: `${idPrefix}2`,
        label: 'Option three',
      }],
      checkboxIdToSelectedMap: {
        [`${idPrefix}1`]: true,
      },
      radios: [{
        id: `${idPrefix}4`,
        label: 'Option one',
      }, {
        id: `${idPrefix}5`,
        label: 'Option two is selected by default',
      }, {
        id: `${idPrefix}6`,
        label: 'Option three',
      }],
      radioIdSelected: `${idPrefix}5`,
    };
  }

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  }

  onCheckboxChange = optionId => {
    const newCheckboxIdToSelectedMap = ({ ...this.state.checkboxIdToSelectedMap, ...{
        [optionId]: !this.state.checkboxIdToSelectedMap[optionId],
      } });

    this.setState({
      checkboxIdToSelectedMap: newCheckboxIdToSelectedMap,
    });
  }

  onRadioChange = optionId => {
    this.setState({
      radioIdSelected: optionId,
    });
  }

  render() {
    return (
      <EuiForm>
        <EuiDescriptiveFormRow
          id="single-example"
          title="Single text field"
          text={
            <span>
              When using this with a single field where the text here serves as the help text for the input,
              it is a good idea to give it <EuiCode>someID</EuiCode> and pass <EuiCode>someID-legend-text</EuiCode>
              to the form row&apos;s <EuiCode>describedByIds</EuiCode> prop.
            </span>
          }
        >
          <EuiFormRow
            label="Text field"
            describedByIds={['single-example-legend-text']}
          >
            <EuiFieldText name="first" />
          </EuiFormRow>
        </EuiDescriptiveFormRow>

        <EuiDescriptiveFormRow
          title="Multiple fields"
          text="Here are three form rows. The first form row does not have a title."
        >
          <EuiFormRow
            hasEmptyLabelSpace
            helpText={
              <span>
                We do not pass <EuiCode>describedByIds</EuiCode> when there are multiple form rows.
              </span>
            }
          >
            <EuiSelect
              hasNoInitialSelection
              options={[
                { value: 'option_one', text: 'Option one' },
                { value: 'option_two', text: 'Option two' },
                { value: 'option_three', text: 'Option three' },
              ]}
            />
          </EuiFormRow>

          <EuiFormRow
            label="File picker"
          >
            <EuiFilePicker />
          </EuiFormRow>

          <EuiFormRow
            label="Range"
          >
            <EuiRange
              min={0}
              max={100}
              name="range"
              id="range"
            />
          </EuiFormRow>
        </EuiDescriptiveFormRow>

        <EuiDescriptiveFormRow
          title="Full width"
          text={
            <span>
              By default, <EuiCode>EuiDescriptiveFormRow</EuiCode> will be double the default width of form elements.
              However, you can pass <EuiCode>fullWidth</EuiCode> prop to this, the individual field and row components
              to expand to their container.
            </span>
          }
          fullWidth
        >
          <EuiFormRow
            label="Use a switch instead of a single checkbox"
            fullWidth
          >
            <EuiSwitch
              name="switch"
              label="Should we do this?"
              checked={this.state.isSwitchChecked}
              onChange={this.onSwitchChange}
              fullWidth
            />
          </EuiFormRow>

          <EuiFormRow>
            <EuiFieldText name="second" />
          </EuiFormRow>

          <EuiFormRow
            label="Checkboxes"
            fullWidth
          >
            <EuiCheckboxGroup
              options={this.state.checkboxes}
              idToSelectedMap={this.state.checkboxIdToSelectedMap}
              onChange={this.onCheckboxChange}
              fullWidth
            />
          </EuiFormRow>
        </EuiDescriptiveFormRow>

        <EuiButton type="submit" fill>
          Save form
        </EuiButton>
      </EuiForm>
    );
  }
}

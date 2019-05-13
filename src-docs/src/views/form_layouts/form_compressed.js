import React, { Component } from 'react';

import {
  EuiButton,
  EuiCheckboxGroup,
  EuiComboBox,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFilePicker,
  EuiRange,
  EuiSelect,
  EuiSwitch,
  EuiPanel,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    const idPrefix = makeId();

    this.state = {
      isSwitchChecked: false,
      checkboxes: [
        {
          id: `${idPrefix}0`,
          label: 'Option one',
        },
        {
          id: `${idPrefix}1`,
          label: 'Option two is checked by default',
        },
        {
          id: `${idPrefix}2`,
          label: 'Option three',
        },
      ],
      checkboxIdToSelectedMap: {
        [`${idPrefix}1`]: true,
      },
      radios: [
        {
          id: `${idPrefix}4`,
          label: 'Option one',
        },
        {
          id: `${idPrefix}5`,
          label: 'Option two is selected by default',
        },
        {
          id: `${idPrefix}6`,
          label: 'Option three',
        },
      ],
      radioIdSelected: `${idPrefix}5`,
      comboBoxSelectionOptions: [],
    };
  }

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  };

  onCheckboxChange = optionId => {
    const newCheckboxIdToSelectedMap = {
      ...this.state.checkboxIdToSelectedMap,
      ...{
        [optionId]: !this.state.checkboxIdToSelectedMap[optionId],
      },
    };

    this.setState({
      checkboxIdToSelectedMap: newCheckboxIdToSelectedMap,
    });
  };

  onRadioChange = optionId => {
    this.setState({
      radioIdSelected: optionId,
    });
  };

  render() {
    return (
      <EuiPanel style={{ maxWidth: 300 }}>
        <EuiForm>
          <EuiFormRow
            label="Text field"
            helpText="I am some friendly help text."
            compressed>
            <EuiFieldText name="first" isLoading />
          </EuiFormRow>

          <EuiFormRow label="Select" compressed>
            <EuiSelect
              options={[
                { value: 'option_one', text: 'Option one' },
                { value: 'option_two', text: 'Option two' },
                { value: 'option_three', text: 'Option three' },
              ]}
            />
          </EuiFormRow>

          <EuiFormRow label="File picker" compressed>
            <EuiFilePicker />
          </EuiFormRow>

          <EuiFormRow label="Combo box" compressed>
            <EuiComboBox
              options={[
                { label: 'Option one' },
                { label: 'Option two' },
                { label: 'Option three' },
              ]}
              selectedOptions={this.state.comboBoxSelectionOptions}
              onChange={comboBoxSelectionOptions =>
                this.setState({ comboBoxSelectionOptions })
              }
            />
          </EuiFormRow>

          <EuiFormRow label="Range" compressed>
            <EuiRange min={0} max={100} name="range" id="range" />
          </EuiFormRow>

          <EuiFormRow
            label="Use a switch instead of a single checkbox"
            compressed>
            <EuiSwitch
              label="Should we do this?"
              name="switch"
              checked={this.state.isSwitchChecked}
              onChange={this.onSwitchChange}
            />
          </EuiFormRow>

          <EuiFormRow label="Checkboxes" compressed>
            <EuiCheckboxGroup
              options={this.state.checkboxes}
              idToSelectedMap={this.state.checkboxIdToSelectedMap}
              onChange={this.onCheckboxChange}
            />
          </EuiFormRow>

          <EuiButton type="submit" size="s" fill>
            Save form
          </EuiButton>
        </EuiForm>
      </EuiPanel>
    );
  }
}

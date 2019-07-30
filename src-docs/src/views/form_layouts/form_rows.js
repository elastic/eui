import React, { Component } from 'react';

import {
  EuiButton,
  EuiCheckboxGroup,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFilePicker,
  EuiLink,
  EuiRange,
  EuiSelect,
  EuiSpacer,
  EuiSwitch,
  EuiText,
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
      <EuiForm>
        <EuiFormRow
          compressed
          label="Text field"
          helpText="I am some friendly help text.">
          <EuiFieldText name="first" compressed />
        </EuiFormRow>

        <EuiFormRow
          label="Select (with no initial selection)"
          compressed
          labelAppend={
            <EuiText size="xs">
              <EuiLink>Link to some help</EuiLink>
            </EuiText>
          }>
          <EuiSelect
            hasNoInitialSelection
            compressed
            options={[
              { value: 'option_one', text: 'Option one' },
              { value: 'option_two', text: 'Option two' },
              { value: 'option_three', text: 'Option three' },
            ]}
          />
        </EuiFormRow>

        <EuiFormRow label="File picker" compressed>
          <EuiFilePicker compressed />
        </EuiFormRow>

        <EuiFormRow label="Range" compressed>
          <EuiRange min={0} max={100} name="range" id="range" compressed />
        </EuiFormRow>

        <EuiFormRow
          label="Use a switch instead of a single checkbox"
          compressed>
          <EuiSwitch
            name="switch"
            label="Should we do this?"
            checked={this.state.isSwitchChecked}
            onChange={this.onSwitchChange}
            compressed
          />
        </EuiFormRow>

        <EuiFormRow
          label="Checkbox group labels should use a `legend` label type"
          labelType="legend"
          compressed>
          <EuiCheckboxGroup
            options={this.state.checkboxes}
            idToSelectedMap={this.state.checkboxIdToSelectedMap}
            onChange={this.onCheckboxChange}
            compressed
          />
        </EuiFormRow>

        <EuiSpacer />

        <EuiButton type="submit" fill>
          Save form
        </EuiButton>
      </EuiForm>
    );
  }
}

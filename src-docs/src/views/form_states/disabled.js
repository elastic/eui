import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiCheckboxGroup,
  EuiFieldNumber,
  EuiFieldPassword,
  EuiFieldSearch,
  EuiFieldText,
  EuiRange,
  EuiRadioGroup,
  EuiSelect,
  EuiSwitch,
  EuiTextArea,
  EuiFilePicker,
  EuiSpacer,
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
      <Fragment>
        <EuiFieldText disabled placeholder="Placeholder text" />

        <EuiSpacer size="s" />

        <EuiFieldText
          disabled
          defaultValue="Text field with customizable icon"
          icon="user"
        />

        <EuiSpacer size="s" />

        <EuiFieldNumber disabled defaultValue="23" />

        <EuiSpacer size="s" />

        <EuiFieldNumber
          defaultValue="23"
          icon="user"
          disabled
        />

        <EuiSpacer size="s" />

        <EuiFieldPassword disabled defaultValue="password" />

        <EuiSpacer size="s" />

        <EuiFieldSearch disabled defaultValue="Search field" />

        <EuiSpacer size="s" />

        <EuiTextArea disabled />

        <EuiSpacer size="s" />

        <EuiSelect
          options={[
            { value: 'option_one', text: 'Option one' },
            { value: 'option_two', text: 'Option two' },
            { value: 'option_three', text: 'Option three' },
          ]}
          disabled
        />

        <EuiSpacer size="s" />

        <EuiFilePicker disabled />

        <EuiSpacer size="s" />

        <EuiRange disabled />

        <EuiSpacer size="s" />

        <EuiSwitch
          label="Switch control"
          onChange={this.onSwitchChange}
          checked
          disabled
        />

        <EuiSpacer size="s" />

        <EuiCheckboxGroup
          options={this.state.checkboxes}
          idToSelectedMap={this.state.checkboxIdToSelectedMap}
          onChange={this.onCheckboxChange}
          disabled
        />

        <EuiSpacer size="s" />

        <EuiRadioGroup
          options={this.state.radios}
          idSelected={this.state.radioIdSelected}
          onChange={this.onRadioChange}
          disabled
        />
      </Fragment>
    );
  }
}

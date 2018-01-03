import React, {
  Component,
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
      <div>
        <EuiFieldText placeholder="Placeholder text" />

        <br />
        <br />

        <EuiFieldText
          defaultValue="Text field with customizable icon"
          icon="user"
        />

        <br />
        <br />

        <EuiFieldNumber defaultValue="23" />

        <br />
        <br />

        <EuiFieldNumber
          defaultValue="23"
          icon="user"
        />

        <br />
        <br />

        <EuiFieldPassword defaultValue="password" />

        <br />
        <br />

        <EuiFieldSearch defaultValue="Search field" />

        <br />
        <br />

        <EuiTextArea />

        <br />
        <br />

        <EuiSelect
          options={[
            { value: 'option_one', text: 'Option one' },
            { value: 'option_two', text: 'Option two' },
            { value: 'option_three', text: 'Option three' },
          ]}
        />

        <br />
        <br />

        <EuiRange />

        <br />
        <br />

        <EuiSwitch
          label="Switch control"
          checked={this.state.isSwitchChecked}
          onChange={this.onSwitchChange}
        />

        <br />
        <br />

        <EuiCheckboxGroup
          options={this.state.checkboxes}
          idToSelectedMap={this.state.checkboxIdToSelectedMap}
          onChange={this.onCheckboxChange}
        />

        <br />
        <br />

        <EuiRadioGroup
          options={this.state.radios}
          idSelected={this.state.radioIdSelected}
          onChange={this.onRadioChange}
        />
      </div>
    );
  }
}

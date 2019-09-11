import React, { Component } from 'react';

import {
  EuiComboBox,
  EuiFieldText,
  EuiFormRow,
  EuiFilePicker,
  EuiRange,
  EuiSelect,
  EuiSwitch,
  EuiPanel,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSwitchChecked: false,
      comboBoxSelectionOptions: [],
      value: '20',
    };
  }

  onRangeChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  };

  render() {
    return (
      <EuiPanel style={{ maxWidth: 300 }}>
        <EuiFormRow
          label="Text field"
          helpText="I am some friendly help text."
          display="columnCompressed">
          <EuiFieldText name="first" isLoading compressed />
        </EuiFormRow>

        <EuiFormRow label="Select" display="columnCompressed">
          <EuiSelect
            options={[
              { value: 'option_one', text: 'Option one' },
              { value: 'option_two', text: 'Option two' },
              { value: 'option_three', text: 'Option three' },
            ]}
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="File picker" display="columnCompressed">
          <EuiFilePicker compressed display="default" />
        </EuiFormRow>

        <EuiFormRow
          label="Comboboxwithalonglabelname"
          display="columnCompressed">
          <EuiComboBox
            options={[
              { label: 'Option one' },
              { label: 'Option two' },
              { label: 'Option three' },
            ]}
            compressed
            selectedOptions={this.state.comboBoxSelectionOptions}
            onChange={comboBoxSelectionOptions =>
              this.setState({ comboBoxSelectionOptions })
            }
          />
        </EuiFormRow>

        <EuiFormRow label="Range" display="columnCompressed">
          <EuiRange
            min={0}
            max={100}
            name="range"
            id="range"
            showInput
            compressed
            value={this.state.value}
            onChange={this.onRangeChange}
          />
        </EuiFormRow>

        <EuiFormRow display="columnCompressedSwitch" label="Swtich">
          <EuiSwitch
            name="switch"
            checked={this.state.isSwitchChecked}
            onChange={this.onSwitchChange}
          />
        </EuiFormRow>
      </EuiPanel>
    );
  }
}

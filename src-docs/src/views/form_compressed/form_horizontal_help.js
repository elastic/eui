import React, { Component } from 'react';

import {
  EuiFieldText,
  EuiFormRow,
  EuiSelect,
  EuiSwitch,
  EuiPanel,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSwitchChecked: false,
      value: '20',
    };
  }

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
          helpText="Only accepts zeros and ones."
          display="columnCompressed">
          <EuiFieldText name="first" compressed />
        </EuiFormRow>

        <EuiFormRow
          label="Select"
          display="columnCompressed"
          helpText={{
            tooltipContent:
              'This control can only be explained by the laws of physics.',
            inlineText: 'Only accepts zeros and ones.',
          }}>
          <EuiSelect
            options={[
              { value: 'option_one', text: 'Option one' },
              { value: 'option_two', text: 'Option two' },
              { value: 'option_three', text: 'Option three' },
            ]}
            compressed
          />
        </EuiFormRow>

        <EuiFormRow
          display="columnCompressedSwitch"
          label="Swtich"
          helpText={<span>Only accepts zeros and ones.</span>}>
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

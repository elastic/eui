import React, { Component } from 'react';

import {
  EuiFieldText,
  EuiFormRow,
  EuiSelect,
  EuiPanel,
  EuiIcon,
  EuiFormControlLayoutDelimited,
  EuiRange,
  EuiSuperSelect,
  EuiColorPicker,
  EuiFieldNumber,
  EuiToolTip,
  EuiButtonIcon,
} from '../../../../src/components';
import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);
    const idPrefix = makeId;

    this.toggleButtons = [
      {
        id: `${idPrefix}0`,
        label: 'coarse',
      },
      {
        id: `${idPrefix}1`,
        label: 'fine',
      },
      {
        id: `${idPrefix}2`,
        label: 'finest',
      },
    ];

    this.state = {
      isSwitchChecked: false,
      opacityValue: '20',
      buttonGroupIdSelected: `${idPrefix}1`,
      color: '#DB1374',
    };
  }

  onColorChange = value => {
    this.setState({ color: value });
  };

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  };

  onRangeChange = e => {
    this.setState({
      opacityValue: e.target.value,
    });
  };

  onChange = optionId => {
    this.setState({
      buttonGroupIdSelected: optionId,
    });
  };

  render() {
    return (
      <EuiPanel style={{ maxWidth: 432 }}>
        <EuiFormRow label="Name" display="columnCompressed">
          <EuiFieldText prepend="Label" placeholder="Input" compressed />
        </EuiFormRow>

        <EuiFormRow label="Visibility" display="columnCompressed">
          <EuiFormControlLayoutDelimited
            compressed
            prepend="Zoom levels"
            startControl={
              <input
                type="number"
                defaultValue={5}
                className="euiFieldNumber euiFieldNumber"
              />
            }
            endControl={
              <input
                type="number"
                defaultValue={10}
                className="euiFieldNumber"
              />
            }
          />
        </EuiFormRow>

        <EuiFormRow label="Opacity" display="columnCompressed">
          <EuiRange
            min={0}
            max={100}
            name="range"
            id="range"
            showInput
            compressed
            value={this.state.opacityValue}
            onChange={this.onRangeChange}
            // append="%"
          />
        </EuiFormRow>

        <EuiFormRow
          label={
            <EuiToolTip content="Otherwise use an EuiToolTip around the label of the form row.">
              <span>
                Label <EuiIcon type="questionInCircle" color="subdued" />
              </span>
            </EuiToolTip>
          }
          display="columnCompressed">
          <EuiSelect
            options={[
              { value: 'option_one', text: 'Option one' },
              { value: 'option_two', text: 'Option two' },
              { value: 'option_three', text: 'Option three' },
            ]}
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="Fill" display="columnCompressed">
          <EuiColorPicker
            onChange={this.onColorChange}
            color={this.state.color}
            compressed
          />
        </EuiFormRow>

        <EuiFormRow label="Border" display="columnCompressed">
          <EuiFieldNumber
            min={1}
            max={100}
            defaultValue={10}
            compressed
            prepend={
              <EuiButtonIcon
                iconType="magnet"
                aria-label="Dynamic toggle"
                title="Make dynamic"
              />
            }
            append="px"
          />
        </EuiFormRow>

        <EuiFormRow label="Fill" display="columnCompressed">
          <EuiSuperSelect
            options={[
              { value: 'option_one', inputDisplay: 'Option one' },
              { value: 'option_two', inputDisplay: 'Option two' },
              { value: 'option_three', inputDisplay: 'Option three' },
            ]}
            compressed
          />
        </EuiFormRow>
      </EuiPanel>
    );
  }
}

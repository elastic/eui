import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiFormRow,
  EuiComboBox,
  EuiButton,
  EuiSpacer,
  EuiSwitch,
  EuiFieldText,
} from '../../../../src/components';

const fieldOptions = [
  {
    label: 'Fields',
    isGroupLabelOption: true,
  },
  {
    label: 'field_1',
  },
  {
    label: 'field_2',
  },
  {
    label: 'field_3',
  },
  {
    label: 'field_4',
  },
];
const operatorOptions = [
  {
    label: 'Operators',
    isGroupLabelOption: true,
  },
  {
    label: 'IS',
  },
  {
    label: 'IS NOT',
  },
  {
    label: 'IS ONE OF',
  },
  {
    label: 'EXISTS',
  },
];
const valueOptions = [
  {
    label: 'Values',
    isGroupLabelOption: true,
  },
  {
    label: 'Value 1',
  },
  {
    label: 'Value 2',
  },
  {
    label: 'Value 3',
  },
  {
    label: 'Value 4',
  },
];

export default class GlobalFilterForm extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    selectedObject: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      fieldOptions: fieldOptions,
      operandOptions: operatorOptions,
      valueOptions: valueOptions,
      selectedField: this.props.selectedObject
        ? this.props.selectedObject.field
        : [],
      selectedOperand: this.props.selectedObject
        ? this.props.selectedObject.operand
        : [],
      selectedValues: this.props.selectedObject
        ? this.props.selectedObject.values
        : [],
      useCustomLabel: false,
      customLabel: '',
    };
  }

  onFieldChange = selectedOptions => {
    // We should only get back either 0 or 1 options.
    this.setState({
      selectedField: selectedOptions,
    });
  };

  onOperandChange = selectedOptions => {
    // We should only get back either 0 or 1 options.
    this.setState({
      selectedOperand: selectedOptions,
    });
  };

  onValuesChange = selectedOptions => {
    this.setState({
      selectedValues: selectedOptions,
    });
  };

  onCustomLabelSwitchChange = e => {
    this.setState({
      useCustomLabel: e.target.checked,
    });
  };

  onFieldSearchChange = searchValue => {
    this.setState({
      fieldOptions: fieldOptions.filter(option =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      ),
    });
  };

  onOperandSearchChange = searchValue => {
    this.setState({
      operandOptions: operatorOptions.filter(option =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      ),
    });
  };

  onValuesSearchChange = searchValue => {
    this.setState({
      valueOptions: valueOptions.filter(option =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      ),
    });
  };

  resetForm = () => {
    this.setState({
      selectedField: [],
      selectedOperand: [],
      selectedValues: [],
      useCustomLabel: false,
      customLabel: null,
    });
  };

  render() {
    const { onAdd, onCancel, selectedObject, ...rest } = this.props;

    return (
      <div {...rest}>
        <EuiFlexGroup>
          <EuiFlexItem style={{ maxWidth: '188px' }}>
            <EuiFormRow label="Field">
              <EuiComboBox
                placeholder={
                  this.state.selectedOperand.length < 1
                    ? 'Start here'
                    : 'Select a field'
                }
                options={this.state.fieldOptions}
                selectedOptions={this.state.selectedField}
                onChange={this.onFieldChange}
                onSearchChange={this.onFieldSearchChange}
                singleSelection={{ asPlainText: true }}
                isClearable={false}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem style={{ maxWidth: '188px' }}>
            <EuiFormRow label="Operand">
              <EuiComboBox
                placeholder={
                  this.state.selectedField.length < 1
                    ? 'Select a field first'
                    : 'Select an operand'
                }
                isDisabled={this.state.selectedField.length < 1}
                options={this.state.operandOptions}
                selectedOptions={this.state.selectedOperand}
                onChange={this.onOperandChange}
                onSearchChange={this.onOperandSearchChange}
                singleSelection={{ asPlainText: true }}
                isClearable={false}
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="m" />

        <div>
          <EuiFormRow label="Value(s)">
            <EuiComboBox
              placeholder={
                this.state.selectedField.length < 1 &&
                this.state.selectedOperand.length < 1
                  ? 'Waiting on previous selections'
                  : 'Select one or more values'
              }
              isDisabled={
                this.state.selectedField.length < 1 ||
                this.state.selectedOperand.length < 1
              }
              options={this.state.valueOptions}
              selectedOptions={this.state.selectedValues}
              onChange={this.onValuesChange}
              onSearchChange={this.onValuesSearchChange}
            />
          </EuiFormRow>
        </div>

        <EuiSpacer size="m" />

        <EuiSwitch
          label="Create custom label?"
          checked={this.state.useCustomLabel}
          onChange={this.onCustomLabelSwitchChange}
        />

        {this.state.useCustomLabel && (
          <div>
            <EuiSpacer size="m" />
            <EuiFormRow label="Custom label">
              <EuiFieldText
                value={this.state.customLabel}
                onChange={this.onCustomLabelChange}
              />
            </EuiFormRow>
          </div>
        )}

        <EuiSpacer size="m" />

        <EuiFlexGroup direction="rowReverse" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButton
              isDisabled={this.state.selectedValues.length < 1}
              fill
              onClick={onAdd}>
              Add
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty
              flush="right"
              onClick={selectedObject ? onCancel : this.resetForm}>
              {selectedObject ? 'Cancel' : 'Reset form'}
            </EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem />
          <EuiFlexItem grow={false}>
            {selectedObject && (
              <EuiButtonEmpty flush="left" color="danger">
                Delete
              </EuiButtonEmpty>
            )}
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}

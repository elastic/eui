import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { pull } from 'lodash';

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
      selectedField: this.props.selectedObject ? this.props.selectedObject.field : [],
      selectedOperand: this.props.selectedObject ? this.props.selectedObject.operand : [],
      selectedValues: this.props.selectedObject ? this.props.selectedObject.values : [],
      useCustomLabel: false,
      customLabel: null,
    };
  }

  // onComboBoxChange = selectedComboBoxOptions => {
  //   const selectedOptions = selectedComboBoxOptions || [];
  //   const numOfSelections = selectedOptions.length;
  //   const lastUpdate = selectedOptions[selectedOptions.length - 1];
  //   const current = {};

  //   // If length is less than 3, then move on to the next
  //   if (numOfSelections < 3) {
  //     switch (numOfSelections) {
  //       case 0:
  //         current.selectedComboBoxOptions = [];
  //         current.editingOption = 'field';
  //         current.comboBoxOptions = fieldOptions;
  //         break;
  //       case 1:
  //         current.selectedComboBoxOptions = selectedOptions;
  //         current.editingOption = 'operator';
  //         current.comboBoxOptions = operatorOptions;
  //         break;
  //       default:
  //         // 2 or more
  //         current.selectedComboBoxOptions = selectedOptions;
  //         current.editingOption = 'value';
  //         current.comboBoxOptions = valueOptions;
  //         break;
  //     }
  //   } else {
  //     // else stay on and just update the value
  //     switch (this.state.editingOption) {
  //       case 'field':
  //         pull(selectedOptions, lastUpdate);
  //         selectedOptions[0] = lastUpdate;
  //         break;
  //       case 'operator':
  //         pull(selectedOptions, lastUpdate);
  //         selectedOptions[1] = lastUpdate;
  //         break;
  //       default:
  //         // 'value'
  //         break;
  //     }

  //     current.selectedComboBoxOptions = selectedOptions;
  //   }

  //   // Add the appropriate click handlers to the first two selected options
  //   // (if they exist)
  //   if (numOfSelections > 0) {
  //     current.selectedComboBoxOptions[0].onClick = this.fieldClicked;
  //   }
  //   if (numOfSelections > 1) {
  //     current.selectedComboBoxOptions[1].onClick = this.opClicked;
  //   }

  //   this.setState({ ...current });
  // };

  // fieldClicked = () => {
  //   this.setState({
  //     comboBoxOptions: fieldOptions,
  //     editingOption: 'field',
  //   });
  // };

  // opClicked = () => {
  //   this.setState({
  //     comboBoxOptions: operatorOptions,
  //     editingOption: 'operator',
  //   });
  // };

  // eslint-disable-next-line no-unused-vars
  onSearchChange = searchValue => {
    //const options = this.state.comboBoxOptions;
    // this.setState({
    //   isComboBoxLoading: true,
    //   comboBoxOptions: [],
    // });
    // clearTimeout(this.searchTimeout);
    // if (this.state.selectedComboBoxOptions.length === 1) {
    //   options = operatorOptions;
    // } else if (this.state.selectedComboBoxOptions.length > 1) {
    //   options = valueOptions;
    // }
    // this.searchTimeout = setTimeout(() => {
    //   // Simulate a remotely-executed search.
    //this.setState({
    // isComboBoxLoading: false,
    //comboBoxOptions: options.filter(option => option.label.toLowerCase().includes(searchValue.toLowerCase())),
    //});
    // }, 200);
  };

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

  resetForm = () => {
    this.setState({
      selectedField: [],
      selectedOperand: [],
      selectedValues: [],
      useCustomLabel: false,
      customLabel: null,
    });
  }

  componentDidMount() {
    // Simulate initial load.
    //this.onSearchChange('');
    // this.onComboBoxChange(this.props.selectedObject);
  }

  render() {
    const {
      onAdd,
      onCancel,
      selectedObject,
      ...rest
    } = this.props;

    return (
      <div {...rest}>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow label="Field">
              <EuiComboBox
                placeholder={this.state.selectedOperand.length < 1 ? 'Start here' : 'Select a field'}
                options={fieldOptions}
                selectedOptions={this.state.selectedField}
                onChange={this.onFieldChange}
                onSearchChange={this.onFieldSearchChange}
                singleSelection={{ asPlainText: true }}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Operand">
              <EuiComboBox
                placeholder={
                  this.state.selectedField.length < 1 ? 'Select a field first' : 'Select an operand'
                }
                isDisabled={this.state.selectedField.length < 1}
                options={operatorOptions}
                selectedOptions={this.state.selectedOperand}
                onChange={this.onOperandChange}
                onSearchChange={this.onOperandSearchChange}
                singleSelection={{ asPlainText: true }}
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="m" />

        <div>
          <EuiFormRow label="Value(s)">
            <EuiComboBox
              placeholder={
                this.state.selectedField.length < 1 && this.state.selectedOperand.length < 1
                  ? 'Waiting on previous selections'
                  : 'Select one or more values'
              }
              isDisabled={this.state.selectedField.length < 1 || this.state.selectedOperand.length < 1}
              options={valueOptions}
              selectedOptions={this.state.selectedValues}
              onChange={this.onValuesChange}
              onSearchChange={this.onValuesSearchChange}
            />
          </EuiFormRow>
        </div>

        <EuiSpacer size="m" />

        <EuiSwitch label="Create custom label?" checked={this.state.useCustomLabel} onChange={this.onCustomLabelSwitchChange} />

        {this.state.useCustomLabel &&
          <div>
            <EuiSpacer size="m"/>
            <EuiFormRow label="Custom label">
              <EuiFieldText
                value={this.state.customLabel}
                onChange={this.onCustomLabelChange}
              />
            </EuiFormRow>
          </div>
        }

        <EuiSpacer size="m" />

        <EuiFlexGroup direction="rowReverse" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButton  isDisabled={this.state.selectedValues.length < 1}  fill onClick={onAdd}>
              Add
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty onClick={onCancel}>Cancel</EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem />
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty flush="left" onClick={selectedObject ? null : this.resetForm} color={selectedObject ? 'danger' : 'primary'}>
              {selectedObject ? 'Delete' : 'Reset form'}
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}

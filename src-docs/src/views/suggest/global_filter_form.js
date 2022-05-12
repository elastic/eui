import React, { useState } from 'react';
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

const fieldOption = [
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
const operatorOption = [
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
const valueOption = [
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

const GlobalFilterForm = (props) => {
  const [fieldOptions, setFieldOptions] = useState(fieldOption);
  const [operandOptions, setOperandOptions] = useState(operatorOption);
  const [valueOptions, setValueOptions] = useState(valueOption);
  const [selectedField, setSelectedField] = useState(
    props.selectedObject ? props.selectedObject.field : []
  );
  const [selectedOperand, setSelectedOperand] = useState(
    props.selectedObject ? props.selectedObject.operand : []
  );
  const [selectedValues, setSelectedValues] = useState(
    props.selectedObject ? props.selectedObject.values : []
  );
  const [useCustomLabel, setUseCustomLabel] = useState(false);
  const [customLabel, setCustomLabel] = useState('');

  const onFieldChange = (selectedOptions) => {
    // We should only get back either 0 or 1 options.
    setSelectedField(selectedOptions);
  };

  const onOperandChange = (selectedOptions) => {
    // We should only get back either 0 or 1 options.
    setSelectedOperand(selectedOptions);
  };

  const onValuesChange = (selectedOptions) => {
    setSelectedValues(selectedOptions);
  };

  const onCustomLabelSwitchChange = (e) => {
    setUseCustomLabel(e.target.checked);
  };

  const onFieldSearchChange = (searchValue) => {
    setFieldOptions(
      fieldOption.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const onOperandSearchChange = (searchValue) => {
    setOperandOptions(
      operatorOption.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const onValuesSearchChange = (searchValue) => {
    setValueOptions(
      valueOption.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const resetForm = () => {
    setSelectedField([]);
    setSelectedOperand([]);
    setSelectedValues([]);
    setUseCustomLabel(false);
    setCustomLabel('');
  };

  const onCustomLabelChange = (e) => {
    setCustomLabel(e.target.value);
  };

  const { onAdd, onCancel, selectedObject, ...rest } = props;

  return (
    <div {...rest}>
      <EuiFlexGroup>
        <EuiFlexItem style={{ maxWidth: '188px' }}>
          <EuiFormRow label="Field">
            <EuiComboBox
              placeholder={
                selectedOperand.length < 1 ? 'Start here' : 'Select a field'
              }
              options={fieldOptions}
              selectedOptions={selectedField}
              onChange={onFieldChange}
              onSearchChange={onFieldSearchChange}
              singleSelection={{ asPlainText: true }}
              isClearable={false}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: '188px' }}>
          <EuiFormRow label="Operand">
            <EuiComboBox
              placeholder={
                selectedField.length < 1
                  ? 'Select a field first'
                  : 'Select an operand'
              }
              isDisabled={selectedField.length < 1}
              options={operandOptions}
              selectedOptions={selectedOperand}
              onChange={onOperandChange}
              onSearchChange={onOperandSearchChange}
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
              selectedField.length < 1 && selectedOperand.length < 1
                ? 'Waiting on previous selections'
                : 'Select one or more values'
            }
            isDisabled={selectedField.length < 1 || selectedOperand.length < 1}
            options={valueOptions}
            selectedOptions={selectedValues}
            onChange={onValuesChange}
            onSearchChange={onValuesSearchChange}
          />
        </EuiFormRow>
      </div>

      <EuiSpacer size="m" />

      <EuiSwitch
        label="Create custom label?"
        checked={useCustomLabel}
        onChange={onCustomLabelSwitchChange}
      />

      {useCustomLabel && (
        <div>
          <EuiSpacer size="m" />
          <EuiFormRow label="Custom label">
            <EuiFieldText value={customLabel} onChange={onCustomLabelChange} />
          </EuiFormRow>
        </div>
      )}

      <EuiSpacer size="m" />

      <EuiFlexGroup direction="rowReverse" alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiButton
            isDisabled={selectedValues.length < 1 && customLabel.length === 0}
            fill
            onClick={onAdd}
          >
            Add
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonEmpty
            flush="right"
            onClick={selectedObject ? onCancel : resetForm}
          >
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
};

GlobalFilterForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedObject: PropTypes.object,
};

export default GlobalFilterForm;

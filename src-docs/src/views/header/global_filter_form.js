import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiFormRow,
  EuiComboBox,
  EuiButton,
  EuiLink,
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
  }

  constructor(props) {
    super(props);

    this.state = {
      isComboBoxLoading: false,
      selectedComboBoxOptions: [],
      comboBoxOptions: fieldOptions,
    };
  }

  onComboBoxChange = selectedComboBoxOptions => {
    let options = fieldOptions;
    if (selectedComboBoxOptions.length === 1) {
      options = operatorOptions;
    } else if (selectedComboBoxOptions.length > 1) {
      options = valueOptions;
    }

    this.setState({
      selectedComboBoxOptions,
      comboBoxOptions: options,
    });
  };

  // eslint-disable-next-line no-unused-vars
  onSearchChange = searchValue => {
    // let options = this.state.comboBoxOptions;
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
    //   this.setState({
    //     isComboBoxLoading: false,
    //     comboBoxOptions: options.filter(option => option.label.toLowerCase().includes(searchValue.toLowerCase())),
    //   });
    // }, 200);
  };

  componentDidMount() {
    // Simulate initial load.
    this.onSearchChange('');
  }

  render() {
    const { onAdd, onCancel, ...rest } = this.props;

    const label = (
      <EuiFlexGroup alignItems="baseline">
        <EuiFlexItem>Field, Operator, Value(s)</EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiLink>Edit as Query DSL</EuiLink>
        </EuiFlexItem>
      </EuiFlexGroup>
    );

    return (
      <div {...rest}>
        <EuiFormRow label={label}>
          <EuiComboBox
            placeholder="Start by selecting a field"
            async
            options={this.state.comboBoxOptions}
            selectedOptions={this.state.selectedComboBoxOptions}
            isLoading={this.state.isComboBoxLoading}
            onChange={this.onComboBoxChange}
            onSearchChange={this.onSearchChange}
          />
        </EuiFormRow>

        <EuiFlexGroup direction="rowReverse" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButton fill onClick={onAdd}>Add</EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty onClick={onCancel}>Cancel</EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem />
        </EuiFlexGroup>
      </div>
    );
  }
}

import React, { Component } from 'react';

import {
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiRadioGroup,
  EuiSuggest,
  EuiSpacer,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

const shortDescription = 'This is the description';

const sampleItems = [
  {
    type: { iconType: 'kqlField', color: 'tint4' },
    label: 'Field sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'kqlValue', color: 'tint0' },
    label: 'Value sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'kqlSelector', color: 'tint2' },
    label: 'Conjunction sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'kqlOperand', color: 'tint1' },
    label: 'Operator sample',
    description: shortDescription,
  },
  {
    type: { iconType: 'search', color: 'tint8' },
    label: 'Recent search',
  },
  {
    type: { iconType: 'save', color: 'tint3' },
    label: 'Saved search',
  },
];

export default class extends Component {
  constructor(props) {
    super(props);

    const idPrefix = makeId();

    this.radios = [
      { id: `${idPrefix}0`, value: 'notYetSaved', label: 'Not yet saved' },
      { id: `${idPrefix}1`, value: 'saved', label: 'Saved' },
      { id: `${idPrefix}2`, value: 'noNewChanges', label: 'No new changes' },
      { id: `${idPrefix}3`, value: 'isLoading', label: 'Loading' },
    ];

    this.state = {
      status: 'notYetSaved',
      radioIdSelected: `${idPrefix}0`,
      value: '',
    };
  }

  onChange = optionId => {
    this.setState({
      radioIdSelected: optionId,
      status: this.radios.find(x => x.id === optionId).value,
    });
  };

  onSelectChange(e) {
    this.setState({
      status: e.target.value,
    });
  }

  getInputValue(val) {
    this.setState({
      value: val,
    });
  }

  render() {
    const append = <EuiButtonEmpty>KQL</EuiButtonEmpty>;

    return (
      <div>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiRadioGroup
              options={this.radios}
              idSelected={this.state.radioIdSelected}
              onChange={this.onChange}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="xl" />
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiSuggest
              status={this.state.status}
              sendInputValue={this.getInputValue.bind(this)}
              append={append}
              suggestions={sampleItems}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}

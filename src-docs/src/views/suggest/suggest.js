import React, { Component } from 'react';

import {
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
      { id: `${idPrefix}0`, value: 'unchanged', label: 'No new changes' },
      { id: `${idPrefix}1`, value: 'unsaved', label: 'Not yet saved' },
      { id: `${idPrefix}2`, value: 'saved', label: 'Saved' },
      { id: `${idPrefix}3`, value: 'loading', label: 'Loading' },
    ];

    this.state = {
      status: 'unchanged',
      radioIdSelected: `${idPrefix}0`,
      value: '',
      tooltipContent: '',
    };
  }

  onChange = optionId => {
    this.setState({
      radioIdSelected: optionId,
      status: this.radios.find(x => x.id === optionId).value,
    });
  };

  onItemClick(item) {
    alert(`Item [${item.label}] was clicked`);
  }

  getInputValue = val => {
    this.setState({
      value: val,
    });
  };

  render() {
    return (
      <div>
        <EuiRadioGroup
          options={this.radios}
          idSelected={this.state.radioIdSelected}
          onChange={this.onChange}
        />
        <EuiSpacer size="xl" />
        <EuiSuggest
          status={this.state.status}
          onInputChange={this.getInputValue}
          onItemClick={this.onItemClick}
          placeholder="Enter query to display suggestions"
          suggestions={sampleItems}
        />
      </div>
    );
  }
}

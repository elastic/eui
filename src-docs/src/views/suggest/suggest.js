import React, { Component } from 'react';

import {
  EuiPopover,
  EuiSuggestItem,
  EuiSuggestInput,
  EuiSelect,
  EuiSpacer,
} from '../../../../src/components';

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

    this.options = [
      { value: 'notYetSaved', text: 'Not yet saved' },
      { value: 'saved', text: 'Saved' },
      { value: 'noNewChanges', text: 'No new changes' },
      { value: 'isLoading', text: 'Loading' },
    ];

    this.state = {
      isPopoverOpen: false,
      value: '',
      status: 'notYetSaved',
    };
  }

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  onFieldChange(e) {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
      value: e.target.value,
    });
  }

  onChange(e) {
    this.setState({
      status: e.target.value,
    });
  }

  render() {
    const suggestions = (sampleItems.map((item, index) => (
      <EuiSuggestItem
        type={item.type}
        key={index}
        label={item.label}
        description={item.description}
      />
    )));

    const button = (
      <EuiSuggestInput
        value={this.state.value}
        status={this.state.status}
        label={'KQL'}
        onChange={this.onFieldChange.bind(this)}
      />
    );

    return (
      <div>
        <EuiSelect
          options={this.options}
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          aria-label="Use aria labels when no actual label is in use"
        />
        <EuiSpacer size="m" />
        <EuiPopover
          id="popover"
          button={button}
          panelClassName="euiSuggestInput__popOverPanel"
          anchorPosition="downLeft"
          hasArrow={false}
          display="block"
          panelPaddingSize="none"
          isOpen={this.state.isPopoverOpen}
          closePopover={this.closePopover.bind(this)}>
          <div>{suggestions}</div>
        </EuiPopover>
      </div>
    );
  }
}

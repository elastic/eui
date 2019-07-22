import React, { Component } from 'react';

import {
  EuiPopover,
  EuiSuggestItem,
  EuiSuggestInput,
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

    this.state = {
      isPopoverOpen: false,
    };
  }

  // onButtonClick() {
  //   this.setState({
  //     isPopoverOpen: !this.state.isPopoverOpen,
  //   });
  // }

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  onFieldChange() {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
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
        value=""
        status="notYetSaved"
        label={'KQL'}
        onChange={this.onFieldChange.bind(this)}
      />
    );

    return (
      <EuiPopover
        id="popover"
        button={button}
        anchorPosition="downCenter"
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover.bind(this)}>
        <div style={{ width: '600px' }}>{suggestions}</div>
      </EuiPopover>
    );
  }
}
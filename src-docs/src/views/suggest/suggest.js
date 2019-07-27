import React, { Component } from 'react';

import {
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPopover,
  EuiSuggestItem,
  EuiSuggestInput,
  EuiSelect,
  EuiSpacer,
} from '../../../../src/components';

import { GlobalFilterBar } from './global_filter_bar';
import GlobalFilterOptions from './global_filter_options';

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
      isPopoverOpen: props.isOpen || false,
      value: '',
      status: 'notYetSaved',
      menuWidth: null,
      filters: [
        {
          id: 'filter0',
          field: '@tags.keyword',
          operator: 'IS',
          value: 'value',
          isDisabled: false,
          isPinned: true,
          isExcluded: false,
        },
        {
          id: 'filter1',
          field: '@tags.keyword',
          operator: 'IS',
          value: 'value',
          isDisabled: true,
          isPinned: false,
          isExcluded: false,
        },
        {
          id: 'filter2',
          field: '@tags.keyword',
          operator: 'IS NOT',
          value: 'value',
          isDisabled: false,
          isPinned: true,
          isExcluded: true,
        },
        {
          id: 'filter3',
          field: '@tags.keyword',
          operator: 'IS',
          value: 'value',
          isDisabled: false,
          isPinned: false,
          isExcluded: false,
        },
      ],
    };
  }

  openPopover = () => {
    this.setState({
      isPopoverOpen: true,
    });

    const focusSelected = () => {
      requestAnimationFrame(() => {
        this.setState({
          menuWidth: this.popoverRef.getBoundingClientRect().width - 85,
        });
      });
    };

    requestAnimationFrame(focusSelected);
  };

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  onFieldChange(e) {
    this.setState({
      value: e.target.value,
    });
    if (this.state.isPopoverOpen) {
      this.closePopover();
    } else {
      this.openPopover();
    }
  }

  onChange(e) {
    this.setState({
      status: e.target.value,
    });
  }

  setPopoverRef = ref => {
    this.popoverRef = ref;
  };

  render() {
    const suggestions = (sampleItems.map((item, index) => (
      <EuiSuggestItem
        type={item.type}
        key={index}
        label={item.label}
        description={item.description}
      />
    )));

    const hashtag = (
      <EuiButtonEmpty iconType="arrowDown" iconSide="right">
        <EuiIcon type="number" />
      </EuiButtonEmpty>
    );

    const button = (
      <EuiSuggestInput
        value={this.state.value}
        status={this.state.status}
        label={'KQL'}
        action={hashtag}
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
          popoverRef={this.setPopoverRef}
          isOpen={this.state.isPopoverOpen}
          closePopover={this.closePopover.bind(this)}>
          <div className="suggestions" style={{ width: this.state.menuWidth }}>{suggestions}</div>
        </EuiPopover>
        <EuiFlexGroup
          className="globalFilterGroup"
          gutterSize="none"
          alignItems="flexStart"
          responsive={false}>
          <EuiFlexItem className="globalFilterGroup__branch" grow={false}>
            <GlobalFilterOptions />
          </EuiFlexItem>

          <EuiFlexItem>
            <GlobalFilterBar
              className="globalFilterGroup__filterBar"
              filters={this.state.filters}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}

import React, { Component } from 'react';

import {
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSuggest,
  EuiSuperDatePicker,
} from '../../../../src/components';

import { GlobalFilterBar } from './global_filter_bar';
import GlobalFilterOptions from './global_filter_options';
import HashtagPopover from './hashtag_popover';

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
  state = {
    status: 'unchanged',
    value: '',
    hideDatepicker: false,
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

  onFieldFocus = () => {
    this.setState({
      hideDatepicker: true,
    });
  };

  onFieldBlur = () => {
    this.setState({
      hideDatepicker: false,
    });
  };

  getInputValue = val => {
    this.setState({
      value: val,
    });
  };

  onItemClick = item => {
    alert(`Item [${item.label}] was clicked`);
  };

  onTimeChange() {
    alert('Time changed');
  }

  render() {
    const append = <EuiButtonEmpty>KQL</EuiButtonEmpty>;

    return (
      <div className="savedQueriesInput">
        <EuiFlexGroup
          gutterSize="s"
          className={
            this.state.hideDatepicker ? 'savedQueriesInput__hideDatepicker' : ''
          }>
          <EuiFlexItem>
            <EuiSuggest
              status={this.state.status}
              onFocus={this.onFieldFocus}
              onBlur={this.onFieldBlur}
              prepend={<HashtagPopover value={this.state.value} />}
              append={append}
              suggestions={sampleItems}
              onItemClick={this.onItemClick}
              onInputChange={this.getInputValue}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false} className="savedQueriesInput__datepicker">
            <EuiSuperDatePicker onTimeChange={this.onTimeChange} />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup
          className="globalFilterGroup"
          gutterSize="none"
          alignItems="flexStart"
          responsive={false}>
          <EuiFlexItem className="globalFilterGroup__branch" grow={false}>
            <GlobalFilterOptions />
          </EuiFlexItem>
          <EuiFlexItem className="globalFilterGroup__filterFlexItem">
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

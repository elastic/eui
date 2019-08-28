import React, { Component } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiListGroup,
  EuiListGroupItem,
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiSuggest,
  EuiSuperDatePicker,
  EuiSelect,
  EuiSpacer,
  EuiText,
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
      isHashtagPopoverOpen: false,
      status: 'notYetSaved',
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
  }

  closeHashtagPopover() {
    this.setState({
      isHashtagPopoverOpen: false,
    });
  }

  onFieldFocus() {
    this.setState({
      hideDatepicker: true,
    });
  }

  onFieldBlur() {
    this.setState({
      hideDatepicker: false,
    });
  }

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

  onButtonClick() {
    this.setState({
      isHashtagPopoverOpen: !this.state.isHashtagPopoverOpen,
    });
  }

  onTimeChange() {
    alert('Time changed');
  }

  render() {
    const hashtagButton = (
      <EuiButtonEmpty
        onClick={this.onButtonClick.bind(this)}
        iconType="arrowDown"
        iconSide="right">
        <EuiIcon type="number" />
      </EuiButtonEmpty>
    );

    const hashtag = (
      <EuiPopover
        id="popover"
        button={hashtagButton}
        isOpen={this.state.isHashtagPopoverOpen}
        anchorPosition="downLeft"
        panelPaddingSize="none"
        closePopover={this.closeHashtagPopover.bind(this)}>
        <EuiPopoverTitle>SAVED QUERIES</EuiPopoverTitle>
        <div>
          <EuiText
            size="s"
            color="subdued"
            className="savedQueryManagement__text">
            <p>Save query text and filters that you want to use again.</p>
          </EuiText>
          <div className="savedQueryManagement__listWrapper">
            <EuiListGroup className="savedQueryManagement__list" flush={true}>
              <EuiListGroupItem
                extraAction={{
                  color: 'danger',
                  iconType: 'trash',
                  iconSize: 's',
                }}
                href="#"
                label="Popular shoes in America"
              />
              <EuiListGroupItem
                extraAction={{
                  color: 'danger',
                  iconType: 'trash',
                  iconSize: 's',
                }}
                href="#"
                label="Popular shirts in Canada"
              />
            </EuiListGroup>
          </div>
          {this.state.value !== '' ? (
            <EuiPopoverFooter>
              <EuiFlexGroup direction="rowReverse" alignItems="center">
                <EuiFlexItem grow={false}>
                  <EuiButton fill>Save</EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPopoverFooter>
          ) : (
            undefined
          )}
        </div>
      </EuiPopover>
    );

    const append = <EuiButtonEmpty>KQL</EuiButtonEmpty>;

    return (
      <div className="savedQueriesInput">
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiSelect
              options={this.options}
              value={this.state.status}
              onChange={this.onSelectChange.bind(this)}
              aria-label="Use aria labels when no actual label is in use"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="xl" />
        <EuiFlexGroup
          className={this.state.hideDatepicker ? 'hideDatepicker' : ''}>
          <EuiFlexItem
            onFocus={this.onFieldFocus.bind(this)}
            onBlur={this.onFieldBlur.bind(this)}>
            <EuiSuggest
              status={this.state.status}
              prefix={hashtag}
              append={append}
              suggestions={sampleItems}
              sendInputValue={this.getInputValue.bind(this)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false} className="datepicker">
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

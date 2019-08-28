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
  EuiSelect,
  EuiSpacer,
  EuiText,
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
      isHashtagPopoverOpen: false,
      status: 'notYetSaved',
      value: '',
    };
  }

  closeHashtagPopover() {
    this.setState({
      isHashtagPopoverOpen: false,
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
      <div>
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
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiSuggest
              status={this.state.status}
              prefix={hashtag}
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

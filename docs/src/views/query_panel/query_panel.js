import React, { Component } from 'react';

import {
  EuiQueryPanel,
  EuiQueryPanelBar,
  EuiQueryPanelSearchInput,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiTogglePill,
  EuiPopover,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFormRow,
  EuiFieldText,
  EuiFieldNumber,
  EuiHorizontalRule,
  EuiSelect,
  EuiButton,
  EuiButtonEmpty,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
      isCreateOpen: false,
    };
  }

  onButtonClick = () => {
    this.setState(prevState => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  onCreateClick = () => {
    this.setState(prevState => ({
      isCreateOpen: !prevState.isCreateOpen,
    }));
  };

  closeCreate = () => {
    this.setState({
      isCreateOpen: false,
    });
  };

  render() {
    const items = [(
      <div>
        <div style={{ padding: '16px 16px 0px 16px'}}>
          <EuiFormRow
            id="asdf"
            label="Filter name"
          >
            <EuiFieldText name="label" value="Some complicated filter"/>
          </EuiFormRow>
        </div>
        <EuiHorizontalRule margin="m" style={{ marginBottom: 0 }}/>
      </div>
    ), (
      <EuiContextMenuItem
        key="pin"
        icon="bullseye"
        onClick={() => { this.closePopover(); window.alert('pin'); }}
      >
        Pin for use across pages
      </EuiContextMenuItem>
    ), (
      <EuiContextMenuItem
        key="edit"
        icon="pencil"
        onClick={() => { this.closePopover(); window.alert('edit'); }}
      >
        Edit filter
      </EuiContextMenuItem>
    ), (
      <EuiContextMenuItem
        key="invert"
        icon="sortUp"
        onClick={() => { this.closePopover(); window.alert('invert'); }}
      >
        De-invert this filter
      </EuiContextMenuItem>
    ), (
      <EuiContextMenuItem
        key="disable"
        icon="faceSad"
        onClick={() => { this.closePopover(); window.alert('disable'); }}
      >
        Temporarily disable
      </EuiContextMenuItem>
    ), (
      <EuiContextMenuItem
        key="remove"
        icon="trash"
        onClick={() => { this.closePopover(); window.alert('delete'); }}
      >
        Delete
      </EuiContextMenuItem>
    )];

    return (
      <EuiQueryPanel>
        <EuiQueryPanelBar>
          <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
            <EuiFlexItem grow={false}>
              <EuiIcon type="search" />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiQueryPanelSearchInput />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiQueryPanelBar>
        <EuiQueryPanelBar>
          <EuiPopover
            button={
              <EuiTogglePill active toggleText="active, inverted" onClick={this.onButtonClick}>
                Some complicated filter
              </EuiTogglePill>
            }
            isOpen={this.state.isPopoverOpen}
            closePopover={this.closePopover}
            panelPaddingSize="none"
            anchorPosition="downCenter"
            withTitle
            ownFocus
          >
            <EuiContextMenuPanel
              title="Adjust this filter"
              items={items}
            />
          </EuiPopover>
          <EuiTogglePill toggleText="inactive">
            type:"someExtremelyLongValueThatNeedsTruncation"
          </EuiTogglePill>
          <EuiTogglePill toggleText="inactive">
            type:"someExtremelyLongValueThatNeedsTruncation"
          </EuiTogglePill>
          <EuiPopover
            button={
              <EuiIcon type="plusInCircle" onClick={this.onCreateClick} />
            }
            isOpen={this.state.isCreateOpen}
            closePopover={this.closeCreate}
            anchorPosition="leftCenter"
            ownFocus
          >
            <div style={{ width: 300}}>
              <EuiTitle size="m">
                <h4>New filter</h4>
              </EuiTitle>

              <EuiSpacer size="m" />

              <EuiFormRow
                id="asdfasdf1"
                label="Field"
              >
                <EuiSelect
                  options={[
                    { value: 'option_one', text: 'someNumericalField' },
                    { value: 'option_two', text: 'Option two' },
                    { value: 'option_three', text: 'Option three' },
                  ]}
                />
              </EuiFormRow>
              <EuiFormRow
                id="asdfasdf2"
                label="Operand"
              >
                <EuiSelect
                  options={[
                    { value: 'option_three', text: 'is between' },
                    { value: 'option_one', text: 'is' },
                    { value: 'option_two', text: 'is not' },
                  ]}
                />
              </EuiFormRow>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFormRow
                    id="asdfasdf3"
                    label="From"
                  >
                    <EuiFieldNumber
                      placeholder="1"
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiFormRow
                    id="asdfasdf4"
                    label="To"
                  >
                    <EuiFieldNumber
                      placeholder="999"
                    />
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer />
              <EuiFlexGroup justifyContent="spaceBetween">
                <EuiFlexItem grow={false}>
                  <EuiButton size="s">Create filter</EuiButton>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButtonEmpty size="s">Edit DSL</EuiButtonEmpty>
                </EuiFlexItem>
              </EuiFlexGroup>
            </div>
          </EuiPopover>
        </EuiQueryPanelBar>
      </EuiQueryPanel>
    );
  }
}

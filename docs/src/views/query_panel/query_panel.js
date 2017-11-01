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
  EuiHorizontalRule,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
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
        <EuiHorizontalRule margin="m" />
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
          <EuiFlexGroup alignItems="center" gutterSize="s">
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
            Something else
          </EuiTogglePill>
          <EuiIcon type="plusInCircle" />
        </EuiQueryPanelBar>
      </EuiQueryPanel>
    );
  }
}

import React, { Component } from 'react';

import {
  EuiQueryPanel,
  EuiQueryPanelFilters,
  EuiQueryPanelSearch,
  EuiQueryPanelSearchInput,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiStatusPill,
  EuiPopover,
  EuiContextMenuItem,
  EuiContextMenu,
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

function flattenPanelTree(tree, array = []) {
  array.push(tree);

  if (tree.items) {
    tree.items.forEach(item => {
      if (item.panel) {
        flattenPanelTree(item.panel, array);
        item.panel = item.panel.id;
      }
    });
  }

  return array;
}

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
      isCreateOpen: false,
    };

    const createForm = (
      <div>
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
    );

    const panelTree = {
      id: 0,
      title: 'Adjust this filter',
      items: [{
        name: 'Pin across all pages',
        icon: (
          <EuiIcon
            type="pin"
          />
        ),
        onClick: () => { this.closePopover(); window.alert('Pinned'); },
      }, {
        name: 'Edit filter query',
        icon: 'pencil',
        panel: {
          id: 1,
          title: 'Edit filter query',
          content: (
            <div style={{ padding: 16}}>
              {createForm}
            </div>
          ),
        },
      }, {
        name: 'Invert results',
        icon: 'invert',
        onClick: () => { this.closePopover(); window.alert('invert'); },
      }, {
        name: 'Temporarily disable',
        icon: 'minusInCircle',
        onClick: () => { this.closePopover(); window.alert('disable'); },
      }, {
        name: 'Delete',
        icon: 'trash',
        onClick: () => { this.closePopover(); window.alert('Delete'); },
      }],
    };

    const filterTree = {
      id: 0,
      title: 'Manage filters',
      items: [{
        name: 'Add new filter',
        icon: 'plusInCircle',
        panel: {
          id: 1,
          title: 'Add new filter',
          content: (
            <div style={{ padding: 16}}>
              {createForm}
            </div>
          ),
        },
      }, {
        name: 'Pin all filters',
        icon: (
          <EuiIcon
            type="pin"
          />
        ),
        onClick: () => { this.closePopover(); window.alert('Pinned'); },
      }, {
        name: 'Invert all filters',
        icon: 'invert',
        onClick: () => { this.closePopover(); window.alert('invert'); },
      }, {
        name: 'Disable all filters',
        icon: 'minusInCircle',
        onClick: () => { this.closePopover(); window.alert('disable'); },
      }, {
        name: 'Delete all filters',
        icon: 'trash',
        onClick: () => { this.closePopover(); window.alert('Delete'); },
      }],
    };

    this.filterPanels = flattenPanelTree(filterTree);
    this.panels = flattenPanelTree(panelTree);
    this.createForm = createForm;

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
        icon="pin"
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
        icon="invert"
        onClick={() => { this.closePopover(); window.alert('invert'); }}
      >
        Invert the results
      </EuiContextMenuItem>
    ), (
      <EuiContextMenuItem
        key="disable"
        icon="minusInCircle"
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
        <EuiQueryPanelFilters>
          <EuiPopover
            button={
              <EuiStatusPill
                status={<EuiIcon type="pin" />}
                onClick={this.onButtonClick}
              >
                Some complicated filter
              </EuiStatusPill>
            }
            isOpen={this.state.isPopoverOpen}
            id="someRandomId"
            closePopover={this.closePopover}
            panelPaddingSize="none"
            anchorPosition="downCenter"
            withTitle
            ownFocus
          >
            <EuiContextMenu
              initialPanelId={0}
              panels={this.panels}
            />
          </EuiPopover>
          <EuiStatusPill
            status={<EuiIcon type="invert" />}
            onClick={() => window.alert('Menu would appear')}
          >
            type:"someExtremelyLongValueThatNeedsTruncation"
          </EuiStatusPill>
          <EuiPopover
            button={
              <EuiButtonEmpty iconType="plusInCircle" size="xs" onClick={this.onCreateClick}>
                Filter your search
              </EuiButtonEmpty>
            }
            isOpen={this.state.isCreateOpen}
            closePopover={this.closeCreate}
            anchorPosition="downRight"
            panelPaddingSize="none"
            withTitle
            id="anotherRandomPopover"
            ownFocus
          >
            <EuiContextMenu
              initialPanelId={0}
              panels={this.filterPanels}
            />
          </EuiPopover>
        </EuiQueryPanelFilters>
      </EuiQueryPanel>
    );
  }
}

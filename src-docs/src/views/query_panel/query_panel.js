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
  EuiContextMenu,
  EuiFormRow,
  EuiFieldNumber,
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
      isPillAdded: false,
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
            <EuiButton size="s" onClick={this.addPill}>Create filter</EuiButton>
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
            <div style={{ padding: 16 }}>
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
        onClick: () => { this.removePill(); },
      }],
    };

    this.panels = flattenPanelTree(panelTree);
    this.createForm = createForm;

  }

  addPill = () => {
    this.setState({ isPillAdded: true });
  };

  removePill = () => {
    this.setState({ isPillAdded: false });
  };

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

    const addFilter = (
      <EuiPopover
        button={
          <EuiButtonEmpty iconType="plusInCircle" size="xs" onClick={this.onCreateClick}>
            Add filter
          </EuiButtonEmpty>
        }
        isOpen={this.state.isCreateOpen}
        closePopover={this.closeCreate}
        anchorPosition="downRight"
        ownFocus
        id="test"
      >
        <div style={{ width: 300 }}>
          <EuiTitle>
            <h4>New filter</h4>
          </EuiTitle>
          <EuiSpacer size="m" />
          {this.createForm}
        </div>
      </EuiPopover>
    );

    let optionaPillBar;

    if (this.state.isPillAdded) {
      optionaPillBar = (
        <EuiQueryPanelFilters animateIn>
          <EuiPopover
            button={
              <EuiStatusPill
                onClick={this.onButtonClick}
              >
                Some complicated filter
              </EuiStatusPill>
            }
            isOpen={this.state.isPopoverOpen}
            closePopover={this.closePopover}
            panelPaddingSize="none"
            anchorPosition="downCenter"
            withTitle
            id="test2"
            ownFocus
          >
            <EuiContextMenu
              initialPanelId={0}
              panels={this.panels}
            />
          </EuiPopover>
          {addFilter}
        </EuiQueryPanelFilters>
      );
    }

    let optionalAddFilter;

    if (!this.state.isPillAdded) {
      optionalAddFilter = (
        <EuiFlexItem grow={false}>
          {addFilter}
        </EuiFlexItem>
      );
    }


    return (
      <EuiQueryPanel>
        <EuiQueryPanelSearch>
          <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
            <EuiFlexItem grow={false}>
              <EuiIcon type="search" />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiQueryPanelSearchInput />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              {optionalAddFilter}
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiQueryPanelSearch>
        {optionaPillBar}
      </EuiQueryPanel>
    );
  }
}

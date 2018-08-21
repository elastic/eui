import React, { Component } from 'react';

import {
  EuiFilterButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiBadge,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiPopover,
  EuiContextMenu,
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
      isFiltersVisible: true,
      filters: [
        {
          id: 'filter0',
          field: '@tags.keyword',
          value: 'value',
          disabled: false,
          pinned: true,
          excluded: false,
        }, {
          id: 'filter1',
          field: '@tags.keyword',
          value: 'value',
          disabled: true,
          pinned: false,
          excluded: false,
        }, {
          id: 'filter2',
          field: '@tags.keyword',
          value: 'value',
          disabled: false,
          pinned: true,
          excluded: true,
        }, {
          id: 'filter3',
          field: '@tags.keyword',
          value: 'value',
          disabled: false,
          pinned: false,
          excluded: false,
        },
      ],
      query: '',
      idOfOpenPopover: null,
    };
  }

  toggleFilterVisibility = () => {
    this.setState(prevState => ({
      isFiltersVisible: !prevState.isFiltersVisible,
    }));
  };

  onQueryChange = e => {
    this.setState({
      query: e.target.value,
    });
  };

  togglePopover = (id) => {
    this.setState(prevState => ({
      idOfOpenPopover: prevState.idOfOpenPopover === null || prevState.idOfOpenPopover !== id  ? id : null
    }));
  }

  closePopover = () => {
    //this.setState({ idOfOpenPopover: null });
  }

  render() {
    const filterTriggerButton = (
      <EuiFilterButton
        onClick={this.toggleFilterVisibility}
        isSelected={this.state.isFiltersVisible}
        hasActiveFilters={this.state.filters.length > 0}
        numFilters={this.state.filters.length > 0 ? this.state.filters.length : null}
      >
        Filters
      </EuiFilterButton>
    );

    const pinnedFilters = this.state.filters.filter(filter => filter.pinned);
    const unpinnedFilters = this.state.filters.filter(filter => !filter.pinned);

    return (
      <React.Fragment>
        <EuiFieldText
          value={this.state.query}
          onChange={this.onQueryChange}
          aria-label="Search using query syntax"
          prepend={filterTriggerButton}
          fullWidth
          icon="console"
        />
        {this.state.isFiltersVisible &&
          <GlobalFilterGroup>
            {pinnedFilters.length && // Show pinned filters first and in a specific group
              <EuiFlexItem title="This group is pinned" grow={false} style={{ background: 'aquamarine', padding: 4 }}>
                <EuiFlexGroup justifyContent="flexStart" gutterSize="xs">
                  <EuiFlexItem grow={false}>
                    <EuiButtonIcon style={{ margin: '-3px 0' }} color="text" iconType="pin" />
                  </EuiFlexItem>

                  {this.renderFilterItems(pinnedFilters)}

                </EuiFlexGroup>
              </EuiFlexItem>
            }
            {this.renderFilterItems(unpinnedFilters)}
          </GlobalFilterGroup>
        }
      </React.Fragment>
    );
  }

  /**
   * Rendering of items
   */

  renderFilterItems = (filters) => {
    return filters.map((filter, index) => {
      let icon;
      let badgeColor = 'hollow';

      if (filter.disabled) {
        icon = 'eyeClosed';
        badgeColor = 'default';
      } else if (filter.excluded) {
        icon = 'minusInCircle';
        badgeColor = 'danger';
      }

      const badge = (
        <EuiBadge iconType={icon} color={badgeColor} onClick={() => this.togglePopover(filter.id)}>
          <span>{filter.field}: </span>
          <span>&quot;{filter.value}&quot;</span>
        </EuiBadge>
      );

      return (
        <EuiFlexItem key={index} grow={false}>
          {this._createFilterContextMenu(filter, index, badge)}
        </EuiFlexItem>
      );
    });
  }

  _createFilterContextMenu = (filter, index, button) => {
    const panelTree = {
      id: 0,
      items: [{
        name: `${filter.disabled ? 'Enable' : 'Disable'}`,
        icon: `${filter.disabled ? 'eye' : 'eyeClosed'}`,
        onClick: () => { this.closePopover(); },
      }, {
        name: `${filter.pinned ? 'Unpin' : 'Pin'}`,
        icon: 'pin',
        onClick: () => { this.closePopover(); },
      }, {
        name: `${filter.excluded ? 'Include' : 'Exclude'}`,
        icon: `${filter.excluded ? 'plusInCircle' : 'minusInCircle'}`,
        onClick: () => { this.closePopover(); },
      }, {
        name: 'Remove',
        icon: 'trash',
        onClick: () => { this.closePopover(); },
      }, {
        name: 'Edit',
        icon: 'pencil',
        panel: {
          id: 1,
          content: (
            <div style={{ padding: 16 }}>
              Form here
            </div>
          ),
        },
      }],
    };

    const panels = flattenPanelTree(panelTree);

    return (
      <EuiPopover
        key={index}
        id={filter.id}
        isOpen={this.state.idOfOpenPopover === filter.id}
        closePopover={this.closePopover}
        button={button}
        anchorPosition="downCenter"
        panelPaddingSize="none"
      >
        <EuiContextMenu
          initialPanelId={0}
          panels={panels}
        />
      </EuiPopover>
    );
  }
}

function GlobalFilterGroup({ children }) {
  return (
    <EuiFlexGroup gutterSize="none" alignItems="flexStart">
      <EuiFlexItem grow={false}>
        <svg width="33" height="48" viewBox="0 0 33 48" xmlns="http://www.w3.org/2000/svg">
          <rect fillOpacity="0" width="33" height="48" />
          <path
            d="M17,28 L17,-9.18485099e-17 L18,9.18485099e-17 L18,28 L33,28 L33,29 L17,29 L17,28 Z"
            fill="#D8D8D8"
          />
        </svg>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFlexGroup
          className="euiGenericFormStyle euiGenericFormStyle--fullWidth"
          wrap={true}
          gutterSize="xs"
          style={{ marginTop: 8 }}
        >

          {children}

          <EuiFlexItem>
            <EuiFlexGroup justifyContent="spaceBetween" gutterSize="xs">
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty iconType="arrowDown" iconSide="right" size="xs">Add filter</EuiButtonEmpty>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonIcon color="text" iconType="gear" />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>

        </EuiFlexGroup>

      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

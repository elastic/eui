import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  EuiToolTip,
  EuiPopoverTitle,
  EuiFormRow,
  EuiComboBox,
  EuiButton,
} from '../../../../src/components';

const fieldOptions = [
  {
    label: 'Fields',
    isGroupLabelOption: true,
  },
  {
    label: 'field_1',
  },
  {
    label: 'field_2',
  },
  {
    label: 'field_3',
  },
  {
    label: 'field_4',
  },
];
const operatorOptions = [
  {
    label: 'Operators',
    isGroupLabelOption: true,
  },
  {
    label: 'IS',
  },
  {
    label: 'IS NOT',
  },
  {
    label: 'IS ONE OF',
  },
  {
    label: 'EXISTS',
  },
];
const valueOptions = [
  {
    label: 'Values',
    isGroupLabelOption: true,
  },
  {
    label: 'Value 1',
  },
  {
    label: 'Value 2',
  },
  {
    label: 'Value 3',
  },
  {
    label: 'Value 4',
  },
];

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
        },
        {
          id: 'filter1',
          field: '@tags.keyword',
          value: 'value',
          disabled: true,
          pinned: false,
          excluded: false,
        },
        {
          id: 'filter2',
          field: '@tags.keyword',
          value: 'value',
          disabled: false,
          pinned: true,
          excluded: true,
        },
        {
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
      addFilterMenuWidth: null,
      addFilterMenuIsOpen: false,
      isComboBoxLoading: false,
      isComboBoxOpen: false,
      selectedComboBoxOptions: [],
      comboBoxOptions: fieldOptions,
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

  togglePopover = id => {
    this.setState(prevState => ({
      idOfOpenPopover:
        prevState.idOfOpenPopover === null || prevState.idOfOpenPopover !== id ? id : null,
    }));
  };

  toggleAddFilterMenu = () => {
    this.setState(prevState => ({
      addFilterMenuIsOpen: !prevState.addFilterMenuIsOpen,
    }));
  };

  onComboBoxChange = selectedComboBoxOptions => {
    let options = fieldOptions;
    if (selectedComboBoxOptions.length === 1) {
      options = operatorOptions;
    } else if (selectedComboBoxOptions.length > 1) {
      options = valueOptions;
    }

    this.setState({
      selectedComboBoxOptions,
      comboBoxOptions: options,
    });
  };

  onSearchChange = () => {
    // let options = this.state.comboBoxOptions;
    // this.setState({
    //   isComboBoxLoading: true,
    //   comboBoxOptions: [],
    // });
    // clearTimeout(this.searchTimeout);
    // if (this.state.selectedComboBoxOptions.length === 1) {
    //   options = operatorOptions;
    // } else if (this.state.selectedComboBoxOptions.length > 1) {
    //   options = valueOptions;
    // }
    // this.searchTimeout = setTimeout(() => {
    //   // Simulate a remotely-executed search.
    //   this.setState({
    //     isComboBoxLoading: false,
    //     comboBoxOptions: options.filter(option => option.label.toLowerCase().includes(searchValue.toLowerCase())),
    //   });
    // }, 200);
  };

  closePopover = () => {
    //this.setState({ idOfOpenPopover: null });
  };

  componentDidMount() {
    // Simulate initial load.
    this.onSearchChange('');
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
        {this.state.isFiltersVisible && (
          <GlobalFilterGroup
            allFiltersButton={this._createFilterBarContextMenu()}
            addFilterButton={this._createFilterBarAddMenu()}
          >
            {pinnedFilters.length && ( // Show pinned filters first and in a specific group
              <EuiFlexItem
                title="This group is pinned"
                grow={false}
                style={{ background: 'aquamarine', padding: 4 }}
              >
                <EuiFlexGroup justifyContent="flexStart" gutterSize="xs">
                  <EuiFlexItem grow={false}>
                    <EuiToolTip content="Unpin all">
                      <EuiButtonIcon style={{ margin: '-2px 0' }} color="text" iconType="pin" />
                    </EuiToolTip>
                  </EuiFlexItem>

                  {this.renderFilterItems(pinnedFilters)}
                </EuiFlexGroup>
              </EuiFlexItem>
            )}
            {this.renderFilterItems(unpinnedFilters)}
          </GlobalFilterGroup>
        )}
      </React.Fragment>
    );
  }

  /**
   * Rendering of items
   */

  renderFilterItems = filters => {
    return filters.map((filter, index) => {
      let icon;
      let badgeColor = 'hollow';
      const style = {};

      if (filter.disabled) {
        icon = 'eyeClosed';
        badgeColor = 'default';
        style.fontStyle = 'italic';
        style.fontWeight = '400';
      } else if (filter.excluded) {
        icon = 'minusInCircle';
        style.textDecoration = 'line-through';
      }

      const badge = (
        <EuiBadge
          iconType={icon}
          color={badgeColor}
          style={style}
          onClick={() => this.togglePopover(filter.id)}
        >
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
  };

  _createFilterContextMenu = (filter, index, button) => {
    const panelTree = {
      id: 0,
      items: [
        {
          name: `${filter.disabled ? 'Enable' : 'Disable'}`,
          icon: `${filter.disabled ? 'eye' : 'eyeClosed'}`,
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: `${filter.pinned ? 'Unpin' : 'Pin'}`,
          icon: 'pin',
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: `${filter.excluded ? 'Include' : 'Exclude'}`,
          icon: `${filter.excluded ? 'plusInCircle' : 'minusInCircle'}`,
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: 'Remove',
          icon: 'trash',
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: 'Edit',
          icon: 'pencil',
          panel: {
            id: 1,
            content: <div style={{ padding: 16 }}>Form here</div>,
          },
        },
      ],
    };

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
        <EuiContextMenu initialPanelId={0} panels={flattenPanelTree(panelTree)} />
      </EuiPopover>
    );
  };

  _createFilterBarContextMenu = () => {
    const menuId = 'GlobalFilterBarContextMenu';
    const panelTree = {
      id: 0,
      items: [
        {
          name: 'Enable',
          icon: 'eye',
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: 'Disable',
          icon: 'eyeClosed',
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: 'Pin',
          icon: 'pin',
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: 'Unpin',
          icon: 'pin',
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: 'Invert',
          icon: 'invert',
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: 'Toggle visibility',
          icon: 'eye',
          onClick: () => {
            this.closePopover();
          },
        },
        {
          name: 'Remove all',
          icon: 'trash',
          onClick: () => {
            this.closePopover();
          },
        },
      ],
    };

    return (
      <EuiPopover
        id={menuId}
        isOpen={this.state.idOfOpenPopover === menuId}
        closePopover={this.closePopover}
        button={
          <EuiButtonIcon
            onClick={() => this.togglePopover(menuId)}
            color="text"
            iconType="gear"
            aria-label="Change all filters"
          />
        }
        anchorPosition="downCenter"
        panelPaddingSize="none"
        withTitle
      >
        <EuiPopoverTitle>Change all filters</EuiPopoverTitle>
        <EuiContextMenu initialPanelId={0} panels={flattenPanelTree(panelTree)} />
      </EuiPopover>
    );
  };

  _createFilterBarAddMenu = () => {
    const label = (
      <EuiFlexGroup alignItems="baseline">
        <EuiFlexItem>Field, Operator, Value(s)</EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonEmpty size="xs" flush="right">
            Edit as Query DSL
          </EuiButtonEmpty>
        </EuiFlexItem>
      </EuiFlexGroup>
    );

    return (
      <EuiPopover
        isOpen={this.state.addFilterMenuIsOpen}
        closePopover={() => this.setState({ addFilterMenuIsOpen: false })}
        button={
          <EuiButtonEmpty onClick={this.toggleAddFilterMenu} size="xs">
            + Add filter
          </EuiButtonEmpty>
        }
        anchorPosition="downCenter"
        withTitle
      >
        <EuiPopoverTitle>Add a filter</EuiPopoverTitle>
        <div style={{ width: 400 }}>
          <EuiFormRow label={label}>
            <EuiComboBox
              placeholder="Start by selecting a field"
              async
              options={this.state.comboBoxOptions}
              selectedOptions={this.state.selectedComboBoxOptions}
              isLoading={this.state.isComboBoxLoading}
              onChange={this.onComboBoxChange}
              onSearchChange={this.onSearchChange}
            />
          </EuiFormRow>
          {/* <EuiFormRow>
            <EuiSwitch label="Customize filter label?" />
          </EuiFormRow>
          <EuiFormRow label="Label">
            <EuiFieldText />
          </EuiFormRow> */}

          <EuiFlexGroup direction="rowReverse" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButton fill>Add</EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty>Cancel</EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem />
          </EuiFlexGroup>
        </div>
      </EuiPopover>
    );
  };
}

// eslint-disable-next-line react/no-multi-comp, react/prefer-stateless-function
class GlobalFilterGroup extends Component {
  static propTypes = {
    children: PropTypes.node,
    allFiltersButton: PropTypes.node,
    addFilterButton: PropTypes.node,
  };

  render() {
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
            {this.props.children}

            <EuiFlexItem>
              <EuiFlexGroup justifyContent="spaceBetween" gutterSize="xs">
                <EuiFlexItem grow={false}>{this.props.addFilterButton}</EuiFlexItem>
                <EuiFlexItem grow={false}>{this.props.allFiltersButton}</EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>

    );
  }
}

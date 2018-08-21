import React, { Component } from 'react';

import {
  EuiFilterButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiBadge,
  EuiButtonEmpty,
  EuiButtonIcon,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFiltersVisible: true,
      filters: [1, 2, 3, 4, 5, 6],
      query: '',
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
        {this.state.isFiltersVisible && <GlobalFilterGroup filters={this.state.filters} />}
      </React.Fragment>
    );
  }
}

function GlobalFilterGroup({ filters }) {
  const filterItems = filters.map((filter, index) => {
    return (
      <EuiFlexItem key={index} grow={false}>
        <EuiBadge color="hollow">@tags.keyword: &quot;late&quot;</EuiBadge>
      </EuiFlexItem>
    );
  });

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

          <EuiFlexItem title="This group is pinned" grow={false} style={{ background: 'aquamarine', padding: 4 }}>
            <EuiFlexGroup justifyContent="flexStart" gutterSize="xs">
              <EuiFlexItem grow={false}>
                <EuiButtonIcon style={{ margin: '-3px 0' }} color="text" iconType="pin" />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiBadge color="hollow">@tags.keyword: &quot;late&quot;</EuiBadge>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiBadge color="hollow">@tags.keyword: &quot;late&quot;</EuiBadge>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>

          {filterItems}

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

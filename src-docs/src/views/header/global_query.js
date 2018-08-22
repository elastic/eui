import React, { Component } from 'react';

import {
  EuiFilterButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

import { GlobalFilterBar } from './global_filter_bar';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFiltersVisible: true,
      filters: [
        {
          id: 'filter0',
          field: '@tags.keyword',
          operator: 'AND',
          value: 'value',
          isDisabled: false,
          isPinned: true,
          isExcluded: false,
        },
        {
          id: 'filter1',
          field: '@tags.keyword',
          operator: 'AND',
          value: 'value',
          isDisabled: true,
          isPinned: false,
          isExcluded: false,
        },
        {
          id: 'filter2',
          field: '@tags.keyword',
          operator: 'AND',
          value: 'value',
          isDisabled: false,
          isPinned: true,
          isExcluded: true,
        },
        {
          id: 'filter3',
          field: '@tags.keyword',
          operator: 'AND',
          value: 'value',
          isDisabled: false,
          isPinned: false,
          isExcluded: false,
        },
      ],
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

        {this.state.isFiltersVisible &&
          <EuiFlexGroup gutterSize="none" alignItems="flexStart" responsive={false}>
            <EuiFlexItem grow={false}>
              <svg className="globalFilterGroup__branch" width="33" height="48" viewBox="0 0 33 48" xmlns="http://www.w3.org/2000/svg">
                <rect fillOpacity="0" width="33" height="48" />
                <path d="M17,28 L17,-9.18485099e-17 L18,9.18485099e-17 L18,28 L33,28 L33,29 L17,29 L17,28 Z" />
              </svg>
            </EuiFlexItem>

            <EuiFlexItem>
              <GlobalFilterBar className="globalFilterGroup__filterBar" filters={this.state.filters} />
            </EuiFlexItem>
          </EuiFlexGroup>
        }

      </React.Fragment>
    );
  }
}

import React, { Component } from 'react';
import classNames from 'classnames';

import {
  EuiFilterButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiMutationObserver,
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
      query: '',
    };
  }

  setFilterBarHeight = () => {
    requestAnimationFrame(() => {
      const height = this.filterBar && this.state.isFiltersVisible ? this.filterBar.clientHeight + 4 : 0;
      this.filterBarWrapper && this.filterBarWrapper.setAttribute('style', `height: ${height}px`);
    });
  }

  componentDidMount() {
    this.setFilterBarHeight();
  }

  componentDidUpdate() {
    this.setFilterBarHeight();
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

  setFilterBarRef = (node) => {
    this.filterBar = node;
  }

  render() {
    const filterTriggerButton = (
      <EuiFilterButton
        onClick={this.toggleFilterVisibility}
        isSelected={this.state.isFiltersVisible}
        hasActiveFilters={this.state.isFiltersVisible}
        numFilters={this.state.filters.length > 0 ? this.state.filters.length : null}
        aria-controls="GlobalFilterGroup"
        aria-expanded={!!this.state.isFiltersVisible}
      >
        Filters
      </EuiFilterButton>
    );

    const classes = classNames(
      'globalFilterGroup__wrapper',
      {
        'globalFilterGroup__wrapper-isVisible': this.state.isFiltersVisible,
      },
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

        <div
          id="GlobalFilterGroup"
          ref={node => { this.filterBarWrapper = node; }}
          className={classes}
        >
          <EuiMutationObserver
            observerOptions={{ childList: true, subtree: true }}
            onMutation={this.setFilterBarHeight}
          >
            <div ref={this.setFilterBarRef}>
              <EuiFlexGroup
                className="globalFilterGroup"
                gutterSize="none"
                alignItems="flexStart"
                responsive={false}
              >
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
            </div>

          </EuiMutationObserver>
        </div>

      </React.Fragment>
    );
  }
}

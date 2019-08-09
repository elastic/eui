import React, { Component } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'resize-observer-polyfill';
import {
  EuiFilterButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

import { GlobalFilterBar } from './global_filter_bar';
import GlobalFilterOptions from './global_filter_options';

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
          value:
            'This documents a visual pattern for the eventual replacement of Kibanas global query and filter bars. The filter bar has been broken down into multiple components. There are still bugs and not all the logic is well-formed.',
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

    this.ro = new ResizeObserver(this.setFilterBarHeight);
  }

  setFilterBarHeight = () => {
    requestAnimationFrame(() => {
      const height =
        this.filterBar && this.state.isFiltersVisible
          ? this.filterBar.clientHeight + 4
          : 0;
      this.filterBarWrapper &&
        this.filterBarWrapper.setAttribute('style', `height: ${height}px`);
    });
  };

  componentDidMount() {
    this.setFilterBarHeight();
    this.ro.observe(this.filterBar);
  }

  componentDidUpdate() {
    this.setFilterBarHeight();
    this.ro.unobserve(this.filterBar);
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

  setFilterBarRef = node => {
    this.filterBar = node;
  };

  render() {
    const filterButtonTitle = `${
      this.state.filters.length
    } filters applied. Select to ${
      this.state.isFiltersVisible ? 'hide' : 'show'
    }.`;

    const filterTriggerButton = (
      <EuiFilterButton
        onClick={this.toggleFilterVisibility}
        isSelected={this.state.isFiltersVisible}
        hasActiveFilters={this.state.isFiltersVisible}
        numFilters={
          this.state.filters.length > 0 ? this.state.filters.length : null
        }
        aria-controls="GlobalFilterGroup"
        aria-expanded={!!this.state.isFiltersVisible}
        title={filterButtonTitle}>
        Filters
      </EuiFilterButton>
    );

    const classes = classNames('globalFilterGroup__wrapper', {
      'globalFilterGroup__wrapper-isVisible': this.state.isFiltersVisible,
    });

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
          ref={node => {
            this.filterBarWrapper = node;
          }}
          className={classes}>
          <div ref={this.setFilterBarRef}>
            <EuiFlexGroup
              className="globalFilterGroup"
              gutterSize="none"
              alignItems="flexStart"
              responsive={false}>
              <EuiFlexItem className="globalFilterGroup__branch" grow={false}>
                <GlobalFilterOptions />
              </EuiFlexItem>

              <EuiFlexItem className="globalFilterGroup__filterFlexItem">
                <GlobalFilterBar
                  className="globalFilterGroup__filterBar"
                  filters={this.state.filters}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiFlexGroup, EuiFlexItem } from '../../../../src/components';
import GlobalFilterAdd from './global_filter_add';
import { GlobalFilterItem } from './global_filter_item';

export const GlobalFilterBar = ({ filters, className, ...rest }) => {
  const classes = classNames('globalFilterBar', className);

  const pinnedFilters = filters
    .filter(filter => filter.isPinned)
    .map(filter => {
      return (
        <EuiFlexItem key={filter.id} grow={false}>
          <GlobalFilterItem {...filter} />
        </EuiFlexItem>
      );
    });

  const unpinnedFilters = filters
    .filter(filter => !filter.isPinned)
    .map(filter => {
      return (
        <EuiFlexItem key={filter.id} grow={false}>
          <GlobalFilterItem {...filter} />
        </EuiFlexItem>
      );
    });

  return (
    <EuiFlexGroup
      className={classes}
      wrap={true}
      responsive={false}
      gutterSize="xs"
      alignItems="center"
      {...rest}>
      {/* Show pinned filters first and in a specific group */}
      {pinnedFilters}
      {unpinnedFilters}

      <EuiFlexItem grow={false}>
        <GlobalFilterAdd />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

GlobalFilterBar.propTypes = {
  filters: PropTypes.array,
};

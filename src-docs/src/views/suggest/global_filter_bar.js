import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiBadgeGroup } from '../../../../src/components';
import GlobalFilterAdd from './global_filter_add';
import { GlobalFilterItem } from './global_filter_item';

export const GlobalFilterBar = ({ filters, className, ...rest }) => {
  const classes = classNames('globalFilterBar', className);

  const pinnedFilters = filters
    .filter(filter => filter.isPinned)
    .map(filter => {
      return <GlobalFilterItem key={filter.id} {...filter} />;
    });

  const unpinnedFilters = filters
    .filter(filter => !filter.isPinned)
    .map(filter => {
      return <GlobalFilterItem key={filter.id} {...filter} />;
    });

  return (
    <EuiBadgeGroup className={classes} {...rest}>
      {/* Show pinned filters first and in a specific group */}
      {pinnedFilters}
      {unpinnedFilters}
      <GlobalFilterAdd />
    </EuiBadgeGroup>
  );
};

GlobalFilterBar.propTypes = {
  filters: PropTypes.array,
};

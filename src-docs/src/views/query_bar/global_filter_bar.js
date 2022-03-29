import React from 'react';
import classNames from 'classnames';

import { EuiBadgeGroup } from '../../../../src/components';
import { GlobalFilterItem } from './global_filter_item';

const filters = [
  {
    id: 'filter0',
    field: '@tags.keyword',
    operator: 'IS',
    value: 'value',
    isPinned: true,
  },
  {
    id: 'filter1',
    field:
      'Filter with a very long title to test if the badge will properly get truncated in the separate set of filter badges that are not quite as long but man does it really need to be long',
    operator: 'IS',
    value: 'value',
    isDisabled: true,
  },
  {
    id: 'filter2',
    field: '@tags.keyword',
    operator: 'IS NOT',
    value: 'value',
    isPinned: true,
    isExcluded: true,
  },
  {
    id: 'filter3',
    field: '@tags.keyword',
    operator: 'IS',
    value: 'value',
  },
  {
    id: 'filter4',
    field: '@tags.keyword',
    operator: 'IS NOT',
    value: 'value',
    isExcluded: true,
  },
];

export const GlobalFilterBar = ({
  className,
  filterMenu,
  timeBadge,
  ...rest
}) => {
  const classes = classNames('globalFilterBar', className);

  const pinnedFilters = filters
    .filter((filter) => filter.isPinned)
    .map((filter) => {
      return <GlobalFilterItem key={filter.id} {...filter} />;
    });

  const unpinnedFilters = filters
    .filter((filter) => !filter.isPinned)
    .map((filter) => {
      return <GlobalFilterItem key={filter.id} {...filter} />;
    });

  return (
    <EuiBadgeGroup className={classes} {...rest}>
      {filterMenu}
      {/* Show pinned filters first and in a specific group */}
      {pinnedFilters}
      {unpinnedFilters}
      {timeBadge}
    </EuiBadgeGroup>
  );
};

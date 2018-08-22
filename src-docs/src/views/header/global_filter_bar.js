import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiToolTip,
  EuiButtonIcon,
} from '../../../../src/components';
import GlobalFilterAdd from './global_filter_add';
import GlobalFilterOptions from './global_filter_options';
import { GlobalFilterItem } from './global_filter_item';

export const GlobalFilterBar = ({
  filters,
  className,
  ...rest,
}) => {

  const classes = classNames(
    'globalFilterBar',
    className,
  );

  const pinnedFilters = filters.filter(filter => filter.isPinned).map((filter) => {
    return (
      <EuiFlexItem key={filter.id} grow={false}>
        <GlobalFilterItem {...filter} />
      </EuiFlexItem>
    );
  });

  const unpinnedFilters = filters.filter(filter => !filter.isPinned).map((filter) => {
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
      {...rest}
    >
      {pinnedFilters.length && ( // Show pinned filters first and in a specific group
        <EuiFlexItem
          className="globalFilterBar__pinned"
          title="This group is pinned"
          grow={false}
        >
          <EuiFlexGroup justifyContent="flexStart" gutterSize="xs" wrap={true} responsive={false}>
            <EuiFlexItem grow={false}>
              <EuiToolTip content="Unpin all">
                <EuiButtonIcon aria-label="Unpin all" className="globalFilterBar__pinnedIcon" color="text" iconType="pin" />
              </EuiToolTip>
            </EuiFlexItem>

            {pinnedFilters}

          </EuiFlexGroup>
        </EuiFlexItem>
      )}

      {unpinnedFilters}

      <EuiFlexItem>
        <EuiFlexGroup justifyContent="spaceBetween" gutterSize="xs" responsive={false}>
          <EuiFlexItem grow={false}><GlobalFilterAdd /></EuiFlexItem>
          <EuiFlexItem grow={false}><GlobalFilterOptions /></EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};


GlobalFilterBar.propTypes = {
  filters: PropTypes.array,
};

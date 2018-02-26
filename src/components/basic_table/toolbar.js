import React from 'react';
import PropTypes from 'prop-types';
import {
  EuiFlexGroup,
  EuiFlexItem
} from '../flex';
import { ContextualActionType, CustomContextualAction, DefaultContextualAction } from './action';
import { EuiSearchBar, QueryType } from '../search_bar';
import { SearchBarPropTypes } from '../search_bar/search_bar';

const renderTools = (table, tools, id) => {
  if (!tools || tools.length === 0) {
    return;
  }
  const controls = tools.reduce((controls, tool, index) => {
    const available = tool.available ? tool.available(table) : true;
    if (!available) {
      return controls;
    }
    const enabled = tool.enabled ? tool.enabled(table) : true;

    if (tool.render) {
      // custom tool
      controls.push(
        <EuiFlexItem key={`${id}_action_${index}`} grow={false}>
          <CustomContextualAction
            action={tool}
            actionContext={table}
            enabled={enabled}
          />
        </EuiFlexItem>
      );
      return controls;
    }

    // default action
    controls.push(
      <EuiFlexItem key={`${id}_action_${index}`} grow={false}>
        <DefaultContextualAction
          action={tool}
          actionContext={table}
          enabled={enabled}
          size="l"
        />
      </EuiFlexItem>
    );
    return controls;

  }, []);
  return controls.length > 0 ? controls : undefined;
};

const renderSearchBar = (table, search) => {
  if (search) {
    return (
      <EuiFlexItem key={`search_bar`} grow={true}>
        <EuiSearchBar
          onChange={search.onChange}
          box={search.box}
          filters={search.filters}
        />
      </EuiFlexItem>
    );
  }
};

export const Toolbar = ({
  table,
  leftTools,
  search,
  rightTools
}) => {
  const leftControls = renderTools(table, leftTools, 'left');
  const searchBar = renderSearchBar(table, search);
  const rightControls = renderTools(table, rightTools, 'right');
  return (
    <EuiFlexGroup>
      {leftControls}
      {searchBar}
      {rightControls}
    </EuiFlexGroup>
  );
};

Toolbar.propTypes = {
  table: PropTypes.shape({
    refresh: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    selection: PropTypes.array,
    query: QueryType
  }),
  leftTools: PropTypes.arrayOf(ContextualActionType),
  rightTools: PropTypes.arrayOf(ContextualActionType),
  search: PropTypes.shape(SearchBarPropTypes)
};

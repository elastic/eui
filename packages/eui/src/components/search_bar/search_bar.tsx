/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement, useState } from 'react';

import { useEuiTheme, useGeneratedHtmlId } from '../../services';
import { isString } from '../../services/predicate';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiToolTip } from '../tool_tip';
import { EuiSearchBox } from './search_box';
import { EuiSearchBarFilters, SearchFilterConfig } from './search_filters';
import { Query } from './query';
import { CommonProps } from '../common';
import { EuiFieldSearchProps } from '../form/field_search';
import { EuiInputPopoverProps } from '../popover';

import {
  euiSearchBar__searchHolder,
  euiSearchBar__filtersHolder,
} from './search_bar.styles';
export { Query, AST as Ast } from './query';

export type QueryType = Query | string;

type Tools = ReactElement | ReactElement[];

interface ArgsWithQuery {
  query: Query;
  queryText: string;
  error: null;
}

/**
 * When `searchFormat` is 'text', `query` is null and the search is performed
 * on the `queryText` directly without EQL parsing
 */
interface ArgsWithPlainText {
  query: null;
  queryText: string;
  error: null;
}

interface ArgsWithError {
  query: null;
  queryText: string;
  error: Error;
}

export interface SchemaType {
  strict?: boolean;
  fields?: any;
  flags?: string[];
  // Controls which phrases will be parsed as field clauses
  recognizedFields?: string[];
}

export type EuiSearchBarOnChangeArgs =
  | ArgsWithQuery
  | ArgsWithPlainText
  | ArgsWithError;

type HintPopOverProps = Partial<
  Pick<
    EuiInputPopoverProps,
    | 'isOpen'
    | 'closePopover'
    | 'fullWidth'
    | 'disableFocusTrap'
    | 'panelClassName'
    | 'panelPaddingSize'
    | 'panelStyle'
    | 'panelProps'
    | 'popoverScreenReaderText'
    | 'repositionOnScroll'
    | 'zIndex'
    | 'data-test-subj'
  >
>;

export interface EuiSearchBarProps extends CommonProps {
  onChange?: (args: EuiSearchBarOnChangeArgs) => void | boolean;

  /**
   * The initial query the bar will hold when first mounted
   */
  defaultQuery?: QueryType;

  /**
   * If you wish to use the search bar as a controlled component, continuously pass the query via this prop.
   */
  query?: QueryType;

  /**
   * Configures the search box. Set `placeholder` to change the placeholder text in the box and `incremental` to support incremental (as you type) search.
   */
  box?: EuiFieldSearchProps & {
    // Boolean values are not meaningful to this EuiSearchBox, but are allowed so that other
    // components can use e.g. a true value to mean "auto-derive a schema". See EuiInMemoryTable.
    // Admittedly, this is a bit of a hack.
    schema?: SchemaType | boolean;
  };

  /**
   * An array of search filters. See {@link SearchFilterConfig}.
   */
  filters?: SearchFilterConfig[];

  /**
   * Tools which go to the left of the search bar.
   */
  toolsLeft?: Tools;

  /**
   * Tools which go to the right of the search bar.
   */
  toolsRight?: Tools;

  /**
   * Date formatter to use when parsing date values
   */
  dateFormat?: object;

  /**
   * Hint to render below the search bar
   */
  hint?: {
    content: React.ReactNode;
    popoverProps?: HintPopOverProps;
  };

  /**
   * When `true`, creates a shorter height search bar and filters
   */
  compressed?: boolean;

  /**
   * Disables the built-in tooltip that appears when an invalid query is typed.
   * Useful when consumers render their own custom error UI.
   */
  isInvalidTooltipDisabled?: boolean;
}

const parseQuery = (
  query: QueryType | undefined,
  props: EuiSearchBarProps
): Query => {
  let schema: SchemaType | undefined = undefined;
  if (props.box?.schema && typeof props.box?.schema === 'object') {
    schema = props.box.schema;
  }
  const dateFormat = props.dateFormat;
  const parseOptions = { schema, dateFormat };
  if (!query) {
    return Query.parse('', parseOptions);
  }
  return isString(query) ? Query.parse(query, parseOptions) : query;
};

interface State {
  query: Query;
  queryText: string;
  error: null | Error;
  isHintVisible: boolean;
}

type NotifyControllingParent = Pick<State, 'queryText' | 'error'> & {
  query: Query | null; // `state.query` is never null, but can be passed as `null` when an error is present
};

function renderTools(tools?: Tools) {
  if (!tools) {
    return undefined;
  }

  if (Array.isArray(tools)) {
    return tools.map((tool) => (
      <EuiFlexItem grow={false} key={tool.key == null ? undefined : tool.key}>
        {tool}
      </EuiFlexItem>
    ));
  }

  return <EuiFlexItem grow={false}>{tools}</EuiFlexItem>;
}

function notifyControllingParent(
  oldState: NotifyControllingParent,
  newState: NotifyControllingParent,
  onChange?: EuiSearchBarProps['onChange']
) {
  if (!onChange) {
    return;
  }
  const { query, queryText, error } = newState;

  const isQueryDifferent = oldState.queryText !== queryText;

  const oldError = oldState.error ? oldState.error.message : null;
  const newError = error ? error.message : null;
  const isErrorDifferent = oldError !== newError;

  if (isQueryDifferent || isErrorDifferent) {
    if (error == null) {
      onChange({ query: query!, queryText, error });
    } else {
      onChange({ query: null, queryText, error });
    }
  }
}

export const EuiSearchBar = (props: EuiSearchBarProps) => {
  const {
    box: { schema, ...box } = { schema: '' }, // strip `schema` out to prevent passing it to EuiSearchBox
    filters,
    toolsLeft,
    toolsRight,
    hint,
    compressed,
    isInvalidTooltipDisabled = false,
  } = props;

  const theme = useEuiTheme();
  const hintId = useGeneratedHtmlId({ prefix: '__hint' });
  const [query, setQuery] = useState<Query>(() =>
    parseQuery(props.defaultQuery || props.query, props)
  );
  const [queryText, setQueryText] = useState<string>(query.text);
  const [error, setError] = useState<null | Error>(null);
  const [isHintVisibleState, setIsHintVisibleState] = useState<boolean>(false);
  const [prevPropsQuery, setPrevPropsQuery] = useState(props.query);

  if (props.query !== prevPropsQuery) {
    const nextQuery = props.query;
    const prevQuery = query;

    const shouldUpdate =
      (nextQuery || nextQuery === '') &&
      ((typeof nextQuery !== 'string' && nextQuery.text !== prevQuery.text) ||
        (typeof nextQuery === 'string' && nextQuery !== prevQuery.text));

    if (shouldUpdate) {
      setPrevPropsQuery(props.query);
      const parsedQuery = parseQuery(nextQuery, props);
      setQuery(parsedQuery);
      setQueryText(parsedQuery.text);
      setError(null);
    }
  }

  function onSearch(newQueryText: string) {
    const oldState: NotifyControllingParent = { query, queryText, error };

    try {
      const newQuery = parseQuery(newQueryText, props);

      notifyControllingParent(
        oldState,
        { query: newQuery, queryText: newQueryText, error: null },
        props.onChange
      );
      setQuery(newQuery);
      setQueryText(newQuery.text);
      setError(null);
    } catch (e) {
      const error: Error =
        e instanceof Error
          ? { name: e.name, message: e.message }
          : { name: 'Unexpected error', message: String(e) };
      notifyControllingParent(
        oldState,
        { query: null, queryText: newQueryText, error },
        props.onChange
      );
      setQueryText(newQueryText);
      setError(error);
    }
  }

  function onFiltersChange(newQuery: Query) {
    notifyControllingParent(
      { query, queryText, error },
      { query: newQuery, queryText: newQuery.text, error: null },
      props.onChange
    );
    setQuery(newQuery);
    setQueryText(newQuery.text);
    setError(null);
  }

  const isHintVisible = hint?.popoverProps?.isOpen ?? isHintVisibleState;
  const toolsLeftEl = renderTools(toolsLeft);
  const toolsRightEl = renderTools(toolsRight);

  const searchBox = (
    <EuiSearchBox
      compressed={compressed}
      {...box}
      query={queryText}
      onSearch={onSearch}
      isInvalid={error != null}
      aria-describedby={isHintVisible ? `${hintId}` : undefined}
      hint={
        hint
          ? {
              isVisible: isHintVisible,
              setIsVisible: (isVisible: boolean) => {
                setIsHintVisibleState(isVisible);
              },
              id: hintId,
              ...hint,
            }
          : undefined
      }
    />
  );

  return (
    <EuiFlexGroup gutterSize="s" alignItems="center" wrap>
      {toolsLeftEl}
      <EuiFlexItem
        className="euiSearchBar__searchHolder"
        css={euiSearchBar__searchHolder(theme)}
        grow={true}
      >
        {isInvalidTooltipDisabled ? (
          searchBox
        ) : (
          <EuiToolTip content={error?.message} display="block">
            {searchBox}
          </EuiToolTip>
        )}
      </EuiFlexItem>
      {filters && (
        <EuiFlexItem
          className="euiSearchBar__filtersHolder"
          css={euiSearchBar__filtersHolder(theme)}
          grow={false}
        >
          <EuiSearchBarFilters
            filters={filters}
            query={query}
            onChange={onFiltersChange}
            compressed={compressed}
          />
        </EuiFlexItem>
      )}
      {toolsRightEl}
    </EuiFlexGroup>
  );
};

EuiSearchBar.Query = Query;

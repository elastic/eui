/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
  FormEvent,
  FunctionComponent,
  useState,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../common';

import { EuiIcon } from '../icon';
import { useEuiI18n } from '../i18n';
import { EuiInputPopover } from '../popover';
import {
  EuiSelectable,
  EuiSelectableOption,
  EuiSelectableSearchableSearchProps,
} from '../selectable';
import { EuiToolTip } from '../tool_tip';

import { EuiSuggestItem, _EuiSuggestItemPropsBase } from './suggest_item';
import { EuiSuggestStatus, _EuiSuggestStatusMap } from './types';

const statusMap: _EuiSuggestStatusMap = {
  unsaved: {
    icon: 'dot',
    color: 'accent',
  },
  saved: {
    icon: 'checkInCircleFilled',
    color: 'success',
  },
  unchanged: {
    icon: '',
    color: 'success',
  },
  loading: {},
};

// keys of _EuiSuggestItemPropsBase
const suggestItemPropsKeys = [
  'label',
  'type',
  'description',
  'labelDisplay',
  'labelWidth',
  'descriptionDisplay',
];

export type EuiSuggestionProps = CommonProps & _EuiSuggestItemPropsBase;

type _EuiSuggestProps = CommonProps &
  Omit<
    EuiSelectableSearchableSearchProps<{}>,
    'isLoading' // status.loading should be used instead for consistency
  > & {
    /**
     * List of suggestions to display using EuiSuggestItem.
     * Accepts props from #EuiSuggestItemProps
     */
    suggestions: EuiSuggestionProps[];

    /**
     * Changes the content of the tooltip that wraps the status icon
     */
    tooltipContent?: string;

    /**
     * Status of the current query 'unsaved', 'saved', 'unchanged' or 'loading'.
     */
    status?: EuiSuggestStatus;

    /**
     * Element to be appended to the input bar.
     */
    append?: JSX.Element;

    /**
     * Handler for click on an EuiSuggestItem.
     */
    onItemClick?: (item: EuiSuggestionProps) => void;

    /**
     * Callback function called when the input changes.
     */
    onInput?: (target: EventTarget) => void;

    /**
     * Callback function called when the search changes.
     */
    onSearch?: (value: string) => void;

    /**
     * Use virtualized rendering for list items with `react-window`.
     * Best used when there are a lot of items.
     */
    isVirtualized?: boolean;

    /**
     * Maximum height to set for the list.
     * Default is `60vh`
     */
    maxHeight?: CSSProperties['maxHeight'];

    /**
     * Control whether or not options get filtered internally or if consumer will filter.
     * Default `false`
     */
    isPreFiltered?: boolean;
  };

export type EuiSuggestProps = _EuiSuggestProps &
  ExclusiveUnion<
    {
      'aria-label': string;
      'aria-labelledby'?: string;
    },
    {
      'aria-label'?: string;
      'aria-labelledby': string;
    }
  >;

export const EuiSuggest: FunctionComponent<EuiSuggestProps> = ({
  onItemClick,
  onBlur,
  onFocus,
  onInput,
  onSearch,
  status = 'unchanged',
  append,
  tooltipContent,
  suggestions,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': labelId,
  isPreFiltered = false,
  isVirtualized = false,
  fullWidth = true,
  maxHeight = '60vh',
  ...rest
}) => {
  /**
   * Popover helpers
   */
  const [popoverRef, setPopoverRef] = useState<HTMLElement | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const openPopover = () => setIsPopoverOpen(true);
  const closePopover = () => setIsPopoverOpen(false);

  /**
   * Search helpers
   */
  const searchOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(e);
    openPopover();
  };

  const searchOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
    if (!popoverRef?.contains(e.relatedTarget as HTMLElement)) {
      closePopover();
    }
  };

  const searchOnInput = (e: FormEvent<HTMLInputElement>) => {
    onInput?.(e.target);
    openPopover();
  };

  const searchOnChange = (value: string) => {
    onSearch?.(value);
  };

  /**
   * Status
   */
  let icon = '';
  let color = '';

  if (statusMap[status]) {
    icon = statusMap[status].icon || '';
    color = statusMap[status].color || '';
  }

  // EuiFieldText's append accepts an array of elements so start by creating an empty array
  const appendArray = [];

  const [statusSaved, statusUnsaved] = useEuiI18n(
    ['euiSuggest.stateSavedTooltip', 'euiSuggest.stateUnsavedTooltip'],
    ['Saved.', 'Changes have not been saved.']
  );
  statusMap.saved.tooltip = statusSaved;
  statusMap.unsaved.tooltip = statusUnsaved;

  const statusElement = (status === 'saved' || status === 'unsaved') && (
    <EuiToolTip
      position="left"
      content={tooltipContent || statusMap[status].tooltip}
    >
      <EuiIcon
        className="euiSuggestInput__statusIcon"
        color={color}
        type={icon}
      />
    </EuiToolTip>
  );

  // Push the status element to the array if it is not undefined
  if (statusElement) appendArray.push(statusElement);

  // Check to see if consumer passed an append item and if so, add it to the array
  if (append) appendArray.push(append);

  const [stateLoading, stateSaved, stateUnsaved, stateUnchanged] = useEuiI18n(
    [
      'euiSuggest.stateLoading',
      'euiSuggest.stateSaved',
      'euiSuggest.stateUnsaved',
      'euiSuggest.stateUnchanged',
    ],
    ['State: loading.', 'State: saved.', 'State: unsaved.', 'State: unchanged.']
  );

  const stateMessageMap = {
    loading: stateLoading,
    saved: stateSaved,
    unsaved: stateUnsaved,
    unchanged: stateUnchanged,
  };
  const stateMessage = stateMessageMap[status];

  /**
   * Options list
   */
  const suggestionList = suggestions.map((props: EuiSuggestionProps) => {
    // Omit props destined for the EuiSuggestItem so that they don't
    // cause warnings or render in the DOM of the EuiSelectableItem
    const data = {};
    const liProps = { label: props.label };
    Object.keys(props).forEach((key) => {
      if (suggestItemPropsKeys.includes(key)) {
        // @ts-ignore string index type
        data[key] = props[key];
      } else {
        // @ts-ignore string index type
        liProps[key] = props[key];
      }
    });
    return {
      ...(liProps as typeof props),
      data,
      className: classNames(props.className, 'euiSuggestItemOption'),
      // Force truncation if `isVirtualized` is true
      truncate: isVirtualized ? true : props.truncate,
    };
  });

  const renderOption = useCallback((props: EuiSuggestionProps) => {
    return <EuiSuggestItem {...props} />;
  }, []);

  const onItemSelect = useCallback(
    (options: EuiSelectableOption[]) => {
      if (onItemClick) {
        const selectedIndex = options.findIndex(
          (option) => option.checked === 'on'
        );
        if (selectedIndex >= 0) {
          const selectedSuggestion = suggestions[selectedIndex];
          onItemClick(selectedSuggestion);
        }
      }
    },
    [onItemClick, suggestions]
  );

  return (
    <>
      <EuiSelectable<EuiSuggestionProps>
        selectableScreenReaderText={stateMessage}
        singleSelection={true}
        height={isVirtualized ? undefined : 'full'}
        options={suggestionList}
        renderOption={renderOption}
        onChange={onItemSelect}
        listProps={{
          bordered: false,
          showIcons: false,
          onFocusBadge: false,
          paddingSize: 'none',
          textWrap: isVirtualized ? 'truncate' : 'wrap',
          isVirtualized,
        }}
        searchable
        isPreFiltered={isPreFiltered}
        searchProps={{
          id,
          append: appendArray.length ? appendArray : undefined,
          fullWidth,
          isLoading: status === 'loading' ? true : false,
          onFocus: searchOnFocus,
          onBlur: searchOnBlur,
          onInput: searchOnInput,
          onChange: searchOnChange,
          'aria-label': ariaLabel,
          'aria-labelledby': labelId,
          ...rest,
        }}
      >
        {(list, search) => (
          <EuiInputPopover
            disableFocusTrap
            input={<>{search}</>}
            isOpen={isPopoverOpen}
            panelPaddingSize="none"
            fullWidth={fullWidth}
            closePopover={closePopover}
            panelRef={setPopoverRef}
            panelProps={{
              'aria-live': undefined,
              'aria-modal': false,
              role: undefined,
            }}
          >
            <div style={{ maxHeight }} className="eui-yScroll">
              {list}
            </div>
          </EuiInputPopover>
        )}
      </EuiSelectable>
    </>
  );
};

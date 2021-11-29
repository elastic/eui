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
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../common';
import { useGeneratedHtmlId } from '../../services';

import { EuiScreenReaderOnly } from '../accessibility';
import { EuiIcon } from '../icon';
import { useEuiI18n } from '../i18n';
import { EuiInputPopover } from '../popover';
import { EuiSelectable, EuiSelectableListItemProps } from '../selectable';
import { EuiToolTip } from '../tool_tip';

import { EuiSuggestItem, _EuiSuggestItemPropsBase } from './suggest_item';
import { EuiSuggestInputProps } from './suggest_input';

interface Status {
  icon?: string;
  color?: string;
  tooltip?: string;
}

interface StatusMap {
  unsaved: Status;
  saved: Status;
  unchanged: Status;
  loading: Status;
}

const statusMap: StatusMap = {
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
export interface EuiSuggestionProps
  extends CommonProps,
    _EuiSuggestItemPropsBase {
  onClick?: EuiSelectableListItemProps['onClick'];
}

type _EuiSuggestProps = CommonProps &
  Omit<EuiSuggestInputProps, 'suggestions'> & {
    /**
     * List of suggestions to display using EuiSuggestItem.
     * Accepts props from #EuiSuggestItemProps
     */
    suggestions: EuiSuggestionProps[];

    /**
     * Handler for click on an EuiSuggestItem.
     */
    onItemClick?: (item: EuiSuggestionProps) => void;

    onInputChange?: (target: EventTarget) => void;

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
  onInputChange,
  status = 'unchanged',
  append,
  tooltipContent,
  suggestions,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': labelId,
  isVirtualized = false,
  fullWidth = true,
  maxHeight = '60vh',
  onFocus,
  onBlur,
  sendValue,
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
    onFocus && onFocus(e);
    openPopover();
  };

  const searchOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur && onBlur(e);
    if (!popoverRef?.contains(e.relatedTarget as HTMLElement)) {
      closePopover();
    }
  };

  const searchOnInput = (e: FormEvent<HTMLInputElement>) => {
    onInputChange && onInputChange(e.target);
    openPopover();
  };

  const searchOnChange = (value: string) => {
    sendValue && sendValue(value);
  };

  const inputDescribedbyId = useGeneratedHtmlId({ prefix: id });

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
    ['State: loading', 'State: saved', 'State: unsaved', 'State: unchanged']
  );

  /**
   * Options list
   */
  const suggestionList = suggestions.map((item: EuiSuggestionProps) => {
    const { className, ...props } = item;
    if (onItemClick) {
      props.onClick = () => onItemClick(item);
    }

    // Omit props destined for the EuiSuggestItem so that they don't
    // cause warnings or render in the DOM of the EuiSelectableItem
    const labelProps = {};
    const liProps = { label: props.label };
    Object.keys(props).forEach((key) => {
      if (suggestItemPropsKeys.includes(key)) {
        // @ts-ignore string index type
        labelProps[key] = props[key];
      } else {
        // @ts-ignore string index type
        liProps[key] = props[key];
      }
    });
    return {
      ...(liProps as typeof props),
      labelProps,
      className: classNames(className, 'euiSuggestItemOption'),
    };
  });

  const renderOption = (option: EuiSuggestionProps) => {
    // `onClick` handled by EuiSelectable
    const { onClick, ...props } = option;
    return <EuiSuggestItem {...props} />;
  };

  const classes = classNames('euiInputPopover', {
    'euiInputPopover--fullWidth': fullWidth,
  });

  return (
    <>
      <EuiSelectable<EuiSuggestionProps>
        id={id}
        singleSelection={true}
        height={isVirtualized ? undefined : 'full'}
        options={suggestionList}
        renderOption={renderOption}
        listProps={{
          bordered: false,
          showIcons: false,
          onFocusBadge: false,
          paddingSize: 'none',
          isVirtualized,
          ...rest,
        }}
        searchable
        searchProps={{
          append: appendArray,
          fullWidth,
          isLoading: status === 'loading' ? true : false,
          onFocus: searchOnFocus,
          onBlur: searchOnBlur,
          onInput: searchOnInput,
          onSearch: searchOnChange,
          'aria-describedby': inputDescribedbyId,
        }}
      >
        {(list, search) => (
          <EuiInputPopover
            className={classes}
            input={<>{search}</>}
            isOpen={isPopoverOpen}
            panelPaddingSize="none"
            fullWidth={fullWidth}
            closePopover={closePopover}
            panelRef={setPopoverRef}
          >
            <div style={{ maxHeight }} className="eui-yScroll">
              {list}
            </div>
          </EuiInputPopover>
        )}
      </EuiSelectable>
      <EuiScreenReaderOnly>
        <div>
          <p id={inputDescribedbyId}>
            {`${(() => {
              switch (status) {
                case 'loading':
                  return stateLoading;
                case 'saved':
                  return stateSaved;
                case 'unsaved':
                  return stateUnsaved;
                case 'unchanged':
                  return stateUnchanged;
              }
            })()}.`}
          </p>
        </div>
      </EuiScreenReaderOnly>
    </>
  );
};

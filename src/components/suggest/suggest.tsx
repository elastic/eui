/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FormEvent, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../common';

import { useCombobox } from '../../services';

import { EuiScreenReaderOnly } from '../accessibility';
import { EuiSelectable, EuiSelectableListItemProps } from '../selectable';

import { EuiSuggestItem, _EuiSuggestItemPropsBase } from './suggest_item';
import { EuiSuggestInput, EuiSuggestInputProps } from './suggest_input';

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
  ...rest
}) => {
  const {
    containerAttributes,
    inputAttributes,
    listAttributes: { id: listAttrsId, ...listAttrs },
    infoAttributes,
    instructionsAttributes,
    methods: { optionIdGenerator, setFocusedOptionIndex, setListBoxOpen },
    state: { isListBoxOpen },
  } = useCombobox({
    id,
    ariaLabel,
    labelId,
  });

  const onChange = (e: FormEvent<HTMLDivElement>) => {
    onInputChange ? onInputChange(e.target) : null;
  };

  const suggestionList = suggestions.map((item: EuiSuggestionProps) => {
    const { className, ...props } = item;
    if (onItemClick) {
      props.onClick = () => onItemClick(item);
    }
    return {
      ...props,
      className: classNames(className, 'euiSuggestItemOption'),
    };
  });

  const renderOption = (option: EuiSuggestionProps) => {
    // `onClick` handled by EuiSelectable
    const { onClick, ...props } = option;
    return <EuiSuggestItem {...props} />;
  };

  return (
    <>
      <div onChange={onChange} {...containerAttributes}>
        <EuiSelectable<EuiSuggestionProps>
          id={listAttrsId}
          singleSelection={true}
          options={suggestionList}
          listProps={{
            bordered: true,
            showIcons: false,
            onFocusBadge: false,
            paddingSize: 'none',
            ...listAttrs,
          }}
          renderOption={renderOption}
          optionIdGenerator={optionIdGenerator}
          onActiveOptionIndexChange={setFocusedOptionIndex}
          searchable
        >
          {(list) => (
            <EuiSuggestInput
              status={status}
              tooltipContent={tooltipContent}
              append={append}
              onListOpen={setListBoxOpen}
              suggestions={suggestionList.length > 0 ? list : undefined}
              {...rest}
              {...inputAttributes}
            />
          )}
        </EuiSelectable>
      </div>
      <EuiScreenReaderOnly>
        <div>
          <p {...infoAttributes}>
            State: {isListBoxOpen ? 'list exanded' : 'list collapsed'}.
          </p>
          <p {...instructionsAttributes}>
            Use up and down arrows to move focus over options. Enter to select.
            Escape to collapse options.
          </p>
        </div>
      </EuiScreenReaderOnly>
    </>
  );
};

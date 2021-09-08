/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { EuiSelectable, EuiSelectableListItemProps } from '../selectable';

import { EuiSuggestItem, _EuiSuggestItemPropsBase } from './suggest_item';
import { EuiSuggestInput, EuiSuggestInputProps } from './suggest_input';

export interface EuiSuggestionProps
  extends CommonProps,
    _EuiSuggestItemPropsBase {
  onClick?: EuiSelectableListItemProps['onClick'];
}

export type EuiSuggestProps = CommonProps &
  Omit<EuiSuggestInputProps, 'suggestions'> & {
    /**
     * List of suggestions to display using 'suggestItem'.
     */
    suggestions: EuiSuggestionProps[];

    /**
     * Handler for click on a suggestItem.
     */
    onItemClick?: (item: EuiSuggestionProps) => void;

    onInputChange?: (target: EventTarget) => void;
  };

export const EuiSuggest: FunctionComponent<EuiSuggestProps> = ({
  onItemClick,
  onInputChange,
  status = 'unchanged',
  append,
  tooltipContent,
  suggestions,
  ...rest
}) => {
  const onChange = (e: React.FormEvent<HTMLDivElement>) => {
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
    <div onChange={onChange}>
      <EuiSuggestInput
        status={status}
        tooltipContent={tooltipContent}
        append={append}
        suggestions={
          suggestionList.length > 0 ? (
            <EuiSelectable<EuiSuggestionProps>
              singleSelection={true}
              options={suggestionList}
              listProps={{
                bordered: true,
                showIcons: false,
                onFocusBadge: false,
                paddingSize: 'none',
              }}
              renderOption={renderOption}
            >
              {(list) => list}
            </EuiSelectable>
          ) : undefined
        }
        {...rest}
      />
    </div>
  );
};

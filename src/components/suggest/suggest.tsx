import React, { FunctionComponent } from 'react';
import { CommonProps } from '../common';
import { EuiSuggestItem, EuiSuggestItemProps } from './suggest_item';
import { EuiSuggestInput, EuiSuggestInputProps } from './suggest_input';

export type EuiSuggestProps = CommonProps &
  EuiSuggestInputProps & {
    /**
     * List of suggestions to display using 'suggestItem'.
     */
    suggestions: EuiSuggestItemProps[];

    /**
     * Handler for click on a suggestItem.
     */
    onItemClick?: (item: EuiSuggestItemProps) => void;

    onInputChange?: (target: EventTarget) => void;
  };

export const EuiSuggest: FunctionComponent<EuiSuggestProps> = (
  props: EuiSuggestProps
) => {
  const {
    onItemClick,
    onInputChange,
    status,
    append,
    tooltipContent,
    suggestions,
    ...rest
  } = props;

  const onChange = (e: React.FormEvent<HTMLDivElement>) => {
    onInputChange ? onInputChange(e.target) : null;
  };

  const suggestionList = suggestions.map((item: EuiSuggestItemProps, index) => (
    <EuiSuggestItem
      type={item.type}
      key={index}
      label={item.label}
      onClick={onItemClick ? () => onItemClick(item) : undefined}
      description={item.description}
    />
  ));

  const suggestInput = (
    <EuiSuggestInput
      status={status}
      tooltipContent={tooltipContent}
      append={append}
      suggestions={suggestionList}
      {...rest}
    />
  );

  return <div onChange={onChange}>{suggestInput}</div>;
};

EuiSuggestInput.defaultProps = {
  status: 'unchanged',
};

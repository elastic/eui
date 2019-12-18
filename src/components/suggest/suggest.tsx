import React, { useState, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import { EuiSuggestItem, EuiSuggestItemProps } from './suggest_item';
import { EuiSuggestInput } from './suggest_input';

export type EuiSuggestProps = CommonProps & {
  tooltipContent?: string;

  /**
   * Status of the current query 'notYetSaved', 'saved', 'unchanged' or 'loading'.
   */
  status?: 'unsaved' | 'saved' | 'unchanged' | 'loading';

  /**
   * Element to be appended to the input bar (e.g. hashtag popover).
   */
  append?: JSX.Element;

  /**
   * List of suggestions to display using 'suggestItem'.
   */
  suggestions: EuiSuggestItemProps[];

  /**
   * Handler for click on a suggestItem.
   */
  onItemClick?: Function;

  onInputChange?: Function;
};

export const EuiSuggest: FunctionComponent<EuiSuggestProps> = (
  props: EuiSuggestProps
) => {
  const setValue = useState<string>('')[1];

  const {
    onItemClick,
    onInputChange,
    status,
    append,
    tooltipContent,
    suggestions,
    ...rest
  } = props;

  const getValue = (val: string) => {
    setValue(val);
  };

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
      sendValue={getValue}
      suggestions={suggestionList}
      {...rest}
    />
  );

  return <div onChange={onChange}>{suggestInput}</div>;
};

EuiSuggestInput.defaultProps = {
  status: 'unchanged',
};

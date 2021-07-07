/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

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

  const suggestionList = suggestions.map((item: EuiSuggestItemProps, index) => {
    const props = { ...item };
    if (onItemClick) {
      props.onClick = () => onItemClick(item);
    }
    return <EuiSuggestItem key={index} {...props} />;
  });

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

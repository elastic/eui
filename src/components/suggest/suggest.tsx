/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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

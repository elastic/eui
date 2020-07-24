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

import React, { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { CommonProps, ExclusiveUnion } from '../common';

export type EuiSelectableOptionCheckedType = 'on' | 'off' | undefined;

export interface EuiSelectableOptionBase extends CommonProps {
  /**
   * Visible label of option.
   * Must be unique across items if `key` is not supplied
   */
  label: string;
  /**
   * Optionally change the searchable term by passing a different string other than the `label`.
   * Best used when creating a custom `optionRender` to separate the label from metadata but allowing to search on both
   */
  searchableLabel?: string;
  /**
   * Must be unique across items.
   * Will be used to match options instead of `label`
   */
  key?: string;
  /**
   * Leave `undefined` to indicate not selected,
   * 'on' to indicate inclusion and
   * 'off' to indicate exclusion
   */
  checked?: EuiSelectableOptionCheckedType;
  disabled?: boolean;
  /**
   * Optional `boolean`.
   * Set to `true` to indicate object is just a grouping label, not a selectable item
   */
  isGroupLabel?: false;
  /**
   * Node to add between the selection icon and the label
   */
  prepend?: React.ReactNode;
  /**
   * Node to add to the far right of the item
   */
  append?: React.ReactNode;
  ref?: (optionIndex: number) => void;
  /**
   * The following allows for consumers to keep their data objects intact
   * the same without needing to do key lookups when using `renderOption`
   */
  [key: string]: any;
}

export interface EuiSelectableGroupLabelOption
  extends Omit<EuiSelectableOptionBase, 'isGroupLabel'>,
    HTMLAttributes<HTMLDivElement> {
  isGroupLabel: true;
}

export interface EuiSelectableLIOption
  extends EuiSelectableOptionBase,
    ButtonHTMLAttributes<HTMLLIElement> {}

export type EuiSelectableOption = ExclusiveUnion<
  EuiSelectableGroupLabelOption,
  EuiSelectableLIOption
>;

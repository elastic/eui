/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes } from 'react';
import { CommonProps, ExclusiveUnion } from '../common';
import type { EuiTextTruncateProps } from '../text_truncate';

export type EuiSelectableOptionCheckedType = 'on' | 'off' | 'mixed' | undefined;

export type EuiSelectableOptionBase = CommonProps & {
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
   * Leave `undefined` to indicate not selected. Pass a string of
   * 'on' to indicate inclusion, 'off' to indicate exclusion,
   * or 'mixed' to indicate inclusion for some.
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
   * Disallow `id` from being set.
   * Option item `id`s are coordinated at a higher level for a11y reasons.
   */
  id?: never;
  /**
   * Option data to pass through to the `renderOptions` element.
   * Bypass `EuiSelectableItem` and avoid DOM attribute warnings.
   */
  data?: { [key: string]: any };
  /**
   * How to handle long text within the item.
   * Wrapping only works if `isVirtualization` is false.
   * @default 'truncate'
   */
  textWrap?: 'truncate' | 'wrap';
  /**
   * If textWrap is set to `truncate`, you can pass a custom truncation configuration
   * that accepts any [EuiTextTruncate](/#/utilities/text-truncation) prop except for
   * `text` and `children`.
   *
   * Note: when searching, custom truncation props are ignored. The highlighted search
   * text will always take precedence.
   */
  truncationProps?: Partial<Omit<EuiTextTruncateProps, 'text' | 'children'>>;
};

type _EuiSelectableGroupLabelOption = Omit<
  EuiSelectableOptionBase,
  'isGroupLabel'
> &
  Exclude<HTMLAttributes<HTMLDivElement>, 'id'> & {
    isGroupLabel: true;
  };

export type EuiSelectableGroupLabelOption<T> = _EuiSelectableGroupLabelOption &
  T;

type _EuiSelectableLIOption = EuiSelectableOptionBase &
  Exclude<HTMLAttributes<HTMLLIElement>, 'id'>;

export type EuiSelectableLIOption<T> = _EuiSelectableLIOption & T;

export type EuiSelectableOption<T = {}> = ExclusiveUnion<
  EuiSelectableGroupLabelOption<T>,
  EuiSelectableLIOption<T>
>;

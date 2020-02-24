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
}

export interface EuiSelectableGroupLabelOption
  extends Omit<EuiSelectableOptionBase, 'isGroupLabel'>,
    HTMLAttributes<HTMLDivElement> {
  isGroupLabel: true;
}

export interface EuiSelectableButtonOption
  extends EuiSelectableOptionBase,
    ButtonHTMLAttributes<HTMLButtonElement> {}

export type EuiSelectableOption = ExclusiveUnion<
  EuiSelectableGroupLabelOption,
  EuiSelectableButtonOption
>;

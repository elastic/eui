import React, { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { CommonProps, ExclusiveUnion } from '../common';

export type OptionCheckedType = 'on' | 'off' | undefined;

export interface BaseOption extends CommonProps {
  /**
   * Visible label of option. Must be unique across items if `key` is not supplied
   */
  label: string;
  /**
   * Must be unique across items
   */
  key?: string;
  id?: string;
  /**
   * Leave off to indicate not selected,
   * 'on' to indicate inclusion and
   * 'off' to indicate exclusion
   */
  checked?: OptionCheckedType;
  disabled?: boolean;
  /**
   * Optional boolean. Set to true to indicate object is just a grouping label, not a selectable item
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

export interface GroupLabelOption
  extends Omit<BaseOption, 'isGroupLabel'>,
    HTMLAttributes<HTMLDivElement> {
  isGroupLabel: true;
}

export interface SelectableOption
  extends BaseOption,
    ButtonHTMLAttributes<HTMLButtonElement> {}

export type Option = ExclusiveUnion<GroupLabelOption, SelectableOption>;

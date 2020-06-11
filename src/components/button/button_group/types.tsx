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

import { ReactNode } from 'react';
import { CommonProps } from '../../common';
import { IconType } from '../../icon';
import { ButtonIconSide, ButtonColor } from '../button';

export type ButtonGroupOptionProps = {
  color: EuiButtonGroupProps['color'];
  size: EuiButtonGroupProps['buttonSize'];
  isIconOnly: EuiButtonGroupProps['isIconOnly'];
  isGroupDisabled: EuiButtonGroupProps['isDisabled'];
  onChange: EuiButtonGroupProps['onChange'];
};

export type EuiButtonMultiGroupOptionProps = EuiButtonGroupOptionProps;
export type EuiButtonSingleGroupOptionProps = EuiButtonGroupOptionProps & {
  /**
   * The `name` attribute for radio inputs
   */
  name?: string;
  /**
   * The value of the radio input.
   */
  value?: any;
};

type EuiButtonGroupOptionProps = CommonProps & {
  /**
   * Each option must have a unique `id` for maintaining selection
   */
  id: string;
  /**
   * Each option must have a `label` even for icons which will be applied as the `aria-label`
   */
  label: ReactNode;
  isDisabled?: boolean;
  /**
   * Any `type` accepted by EuiIcon
   */
  iconType?: IconType;
  iconSide?: ButtonIconSide;
};

export type EuiButtonGroupProps = CommonProps & {
  /**
   * Typical sizing is `s`. Medium `m` size should be reserved for major features.
   * `compressed` is meant to be used alongside and within compressed forms.
   */
  buttonSize?: 's' | 'm' | 'compressed';
  isDisabled?: boolean;
  /**
   * Expands the whole group to the full width of the container.
   * Each button gets equal widths no matter the content
   */
  isFullWidth?: boolean;
  /**
   * Hides the label to only show the `iconType` provided by the `option`
   */
  isIconOnly?: boolean;

  /**
   * A hidden group title (required for accessibility)
   */
  legend: string;
  /**
   * Compressed styles don't support `ghost` color (Color will be changed to "text")
   */
  color?: ButtonColor;
  /**
   * Determines how the selection of the group should be handled.
   * With `'single'` only one option can be selected at a time (similar to radio group).
   * With `'multi'` multiple options selected (similar to checkbox group).
   */
  type?: 'single' | 'multi';
} & (
    | {
        type: 'single';
        /**
         * An array of #EuiButtonSingleGroupOptionProps
         */
        options: EuiButtonSingleGroupOptionProps[];
        /**
         * Styles the selected option to look selected (usually with `fill`)
         */
        idSelected: string;
        /**
         * Returns the `id` of the clicked option and the `value`
         */
        onChange: (id: string, value?: any) => void;
        idToSelectedMap?: never;
      }
    | {
        type: 'multi';
        /**
         * An array of #EuiButtonMultiGroupOptionProps
         */
        options: EuiButtonMultiGroupOptionProps[];
        /**
         * A map of `id`s as keys with the selected boolean values.
         */
        idToSelectedMap?: { [id: string]: boolean };
        /**
         * Returns the `id` of the clicked option
         */
        onChange: (id: string) => void;
        idSelected?: never;
      });

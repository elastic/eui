/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiButtonGroupButton } from './button_group_button';
import { colorToClassNameMap, ButtonColor } from '../button';
import { EuiButtonContentProps } from '../button_content';
import { CommonProps } from '../../common';
import { htmlIdGenerator } from '../../../services';

export interface EuiButtonGroupOptionProps
  extends EuiButtonContentProps,
    CommonProps {
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
   * The value of the radio input.
   */
  value?: any;
  /**
   * The type of the underlying HTML button
   */
  type?: 'button' | 'submit' | 'reset';
}

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
   * Actual type is `'single' | 'multi'`.
   * Determines how the selection of the group should be handled.
   * With `'single'` only one option can be selected at a time (similar to radio group).
   * With `'multi'` multiple options selected (similar to checkbox group).
   */
  type?: 'single' | 'multi';
  /**
   * An array of #EuiButtonGroupOptionProps
   */
  options: EuiButtonGroupOptionProps[];
} & (
    | {
        /**
         * Default for `type` is single so it can also be excluded
         */
        type?: 'single';
        /**
         * The `name` attribute for radio inputs;
         * Defaults to a random string
         */
        name?: string;
        /**
         * Styles the selected option to look selected (usually with `fill`)
         * Required by and only used in `type='single'`.
         */
        idSelected: string;
        /**
         * Single: Returns the `id` of the clicked option and the `value`
         */
        onChange: (id: string, value?: any) => void;
        idToSelectedMap?: never;
      }
    | {
        type: 'multi';
        /**
         * A map of `id`s as keys with the selected boolean values.
         * Required by and only used in `type='multi'`.
         */
        idToSelectedMap?: { [id: string]: boolean };
        /**
         * Multi: Returns the `id` of the clicked option
         */
        onChange: (id: string) => void;
        idSelected?: never;
        name?: never;
      }
  );

type Props = Omit<HTMLAttributes<HTMLFieldSetElement>, 'onChange' | 'color'> &
  EuiButtonGroupProps;

const groupSizeToClassNameMap = {
  s: '--small',
  m: '--medium',
  compressed: '--compressed',
};

export const EuiButtonGroup: FunctionComponent<Props> = ({
  className,
  buttonSize = 's',
  color = 'text',
  idSelected = '',
  idToSelectedMap = {},
  isDisabled = false,
  isFullWidth = false,
  isIconOnly = false,
  legend,
  name,
  onChange,
  options = [],
  type = 'single',
  ...rest
}) => {
  // Compressed style can't support `ghost` color because it's more like a form field than a button
  const badColorCombo = buttonSize === 'compressed' && color === 'ghost';
  const resolvedColor = badColorCombo ? 'text' : color;
  if (badColorCombo) {
    console.warn(
      'EuiButtonGroup of compressed size does not support the ghost color. It will render as text instead.'
    );
  }

  const classes = classNames(
    'euiButtonGroup',
    `euiButtonGroup${groupSizeToClassNameMap[buttonSize]}`,
    `euiButtonGroup${colorToClassNameMap[resolvedColor]}`,
    {
      'euiButtonGroup--fullWidth': isFullWidth,
      'euiButtonGroup--isDisabled': isDisabled,
    },
    className
  );

  const typeIsSingle = type === 'single';
  const nameIfSingle = name || htmlIdGenerator()();

  return (
    <fieldset className={classes} {...rest} disabled={isDisabled}>
      <EuiScreenReaderOnly>
        <legend>{legend}</legend>
      </EuiScreenReaderOnly>

      <div className="euiButtonGroup__buttons">
        {options.map((option, index) => {
          return (
            <EuiButtonGroupButton
              key={index}
              name={nameIfSingle}
              isDisabled={isDisabled}
              {...(option as EuiButtonGroupOptionProps)}
              element={typeIsSingle ? 'label' : 'button'}
              isSelected={
                typeIsSingle
                  ? option.id === idSelected
                  : idToSelectedMap[option.id]
              }
              color={resolvedColor}
              size={buttonSize}
              isIconOnly={isIconOnly}
              onChange={onChange}
            />
          );
        })}
      </div>
    </fieldset>
  );
};

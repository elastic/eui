/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

import { useEuiTheme, useGeneratedHtmlId } from '../../../services';
import { EuiScreenReaderOnly } from '../../accessibility';
import { CommonProps } from '../../common';

import { _EuiButtonColor } from '../../../themes/amsterdam/global_styling/mixins';
import { EuiButtonDisplayContentProps } from '../button_display/_button_display_content';
import { EuiButtonGroupButton } from './button_group_button';
import {
  euiButtonGroupStyles,
  euiButtonGroupButtonsStyles,
} from './button_group.styles';

export interface EuiButtonGroupOptionProps
  extends EuiButtonDisplayContentProps,
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
   * Any of the named color palette options.
   */
  color?: _EuiButtonColor;
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
  const euiTheme = useEuiTheme();

  const wrapperStyles = euiButtonGroupStyles();
  const wrapperCssStyles = [
    wrapperStyles.euiButtonGroup,
    isFullWidth && wrapperStyles.fullWidth,
  ];

  const styles = euiButtonGroupButtonsStyles(euiTheme);
  const cssStyles = [
    styles.euiButtonGroup__buttons,
    isFullWidth && styles.fullWidth,
    styles[buttonSize],
  ];

  const classes = classNames(
    'euiButtonGroup',
    { 'euiButtonGroup-isDisabled': isDisabled },
    className
  );

  const typeIsSingle = type === 'single';
  const nameIfSingle = useGeneratedHtmlId({ conditionalId: name });

  return (
    <fieldset
      css={wrapperCssStyles}
      className={classes}
      {...rest}
      disabled={isDisabled}
    >
      <EuiScreenReaderOnly>
        <legend>{legend}</legend>
      </EuiScreenReaderOnly>

      <div css={cssStyles} className="euiButtonGroup__buttons">
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
              color={color}
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

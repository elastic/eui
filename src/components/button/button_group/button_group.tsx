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

import React, { ReactNode, FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { EuiScreenReaderOnly } from '../../accessibility';
import { CommonProps } from '../../common';
import { IconType } from '../../icon';
import { ToggleType } from '../../toggle';
import { ButtonColor, ButtonIconSide, EuiButton } from '../button';
import { EuiIcon } from '../../icon/icon';

export interface EuiButtonGroupIdToSelectedMap {
  [id: string]: boolean;
}

export type GroupButtonSize = 's' | 'm' | 'compressed';

export interface EuiButtonGroupOptionProps extends CommonProps {
  /**
   * Each option must have a unique `id` for maintaining selection
   */
  id: string;
  /**
   * Each option must have a `label` even for icons which will be applied as the `aria-label`
   */
  label: ReactNode;
  /**
   * *DEPRECATED:* Was necessary when toggles were inputs, but now they're buttons.
   * Use `label` instead
   */
  name?: string;
  isDisabled?: boolean;
  /**
   * The value of the radio input.
   * Only necessary/used when `type="single"`
   * TODO @myasonik enforce with TS
   */
  value?: any;
  iconSide?: ButtonIconSide;
  /**
   * Any `type` accepted by EuiIcon
   */
  iconType?: IconType;
}

export interface EuiButtonGroupProps extends CommonProps {
  /**
   * An array of #EuiButtonGroupOption
   */
  options?: EuiButtonGroupOptionProps[];
  /**
   * Returns the `id` of the clicked option and the `value`
   * if it is of `type="single"`
   */
  onChange: (id: string, value?: any) => void;
  /**
   * Typical sizing is `s`. Medium `m` size should be reserved for major features.
   * `compressed` is meant to be used alongside and within compressed forms.
   */
  buttonSize?: GroupButtonSize;
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
   * Styles the selected option to look selected (usually with `fill`)
   */
  idSelected?: string;
  /**
   * A hidden group title (required for accessibility)
   */
  legend: string;
  color?: ButtonColor;
  /**
   * The `name` attribute for radio inputs. Only necessary/used when `type="single"`
   * TODO @myasonik enforce with TS
   */
  name?: string;
  /**
   * Determines how the selection of the group should be handled.
   * With `'single'` only one option can be selected at a time (similar to radio group).
   * With `'multi'` multiple options selected (similar to checkbox group).
   */
  type?: ToggleType;
  /**
   * A map of `id`s as keys with the selected boolean values.
   * Only necessary/used when `type="single"`
   * TODO @myasonik enforce with TS
   */
  idToSelectedMap?: EuiButtonGroupIdToSelectedMap;
}

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  EuiButtonGroupProps;

export const EuiButtonGroup: FunctionComponent<Props> = ({
  className,
  buttonSize = 's',
  color = 'text',
  idSelected,
  idToSelectedMap = {},
  isDisabled,
  isFullWidth,
  isIconOnly,
  name,
  legend,
  onChange,
  options = [],
  type = 'single',
  ...rest
}) => {
  // Compressed style can't support `ghost` color because it's more like a form field than a button
  const badColorCombo = buttonSize === 'compressed' && color === 'ghost';
  if (badColorCombo) {
    console.warn(
      'EuiButtonGroup of compressed size does not support the ghost color. It will render as text instead.'
    );
  }

  const classes = classNames(
    'euiButtonGroup',
    `euiButtonGroup--${color}`,
    {
      'euiButtonGroup--fullWidth': isFullWidth,
      'euiButtonGroup--compressed': buttonSize === 'compressed',
      'euiButtonGroup--disabled': isDisabled,
    },
    className
  );

  const fieldsetClasses = classNames('euiButtonGroup__fieldset', {
    'euiButtonGroup__fieldset--fullWidth': isFullWidth,
  });

  return (
    <fieldset className={fieldsetClasses}>
      <EuiScreenReaderOnly>
        <legend>{legend}</legend>
      </EuiScreenReaderOnly>

      <div className={classes} {...rest}>
        {options.map((option, index) => {
          const {
            id,
            name: optionName,
            value,
            label,
            isDisabled: optionDisabled,
            className,
            iconType,
            iconSide,
            ...optionRest
          } = option;

          let isSelectedState;
          if (type === 'multi') {
            isSelectedState = idToSelectedMap[id] || false;
          } else {
            isSelectedState = id === idSelected;
          }

          let fill;
          if (buttonSize !== 'compressed') {
            fill = isSelectedState;
          }
          const buttonClasses = classNames(
            'euiButtonGroup__button',
            'euiButton--no-hover',
            {
              'euiButtonGroup__button--selected': isSelectedState,
              'euiButtonGroup__button--iconOnly': isIconOnly,
            },
            className
          );

          if (type === 'multi') {
            return (
              <EuiButton
                className={buttonClasses}
                id={id}
                color={badColorCombo ? 'text' : color}
                fill={fill}
                isDisabled={optionDisabled || isDisabled}
                aria-pressed={isSelectedState}
                size={buttonSize === 'compressed' ? 's' : buttonSize}
                onClick={() => onChange(id, value)}
                key={index}
                iconSide={iconSide}
                iconType={iconType}
                {...optionRest}>
                {isIconOnly ? (
                  <EuiScreenReaderOnly>
                    <span>{label}</span>
                  </EuiScreenReaderOnly>
                ) : (
                  <>{label}</>
                )}
              </EuiButton>
            );
          }

          const wrapperClasses = classNames(
            'euiButton',
            'euiButton--no-hover',
            'euiButtonGroup__toggle',
            {
              'euiButton--disabled': isDisabled,
              'euiButtonGroup__toggle--iconOnly': isIconOnly,
              'euiButton--fill': fill,
              'euiButton--small':
                buttonSize === 'compressed' || buttonSize === 's',
            },
            buttonClasses
          );

          const icon = iconType && (
            <EuiIcon type={iconType} color={color} size="m" />
          );

          const isActuallyDisabled = optionDisabled || isDisabled;
          return (
            <div className={wrapperClasses} key={index}>
              <input
                id={id}
                className="euiButtonGroup__input"
                name={name}
                onChange={() => onChange(id, value)}
                checked={isSelectedState}
                disabled={isActuallyDisabled}
                value={value}
                type="radio"
                {...optionRest}
              />
              <label
                htmlFor={id}
                className="euiButton__content euiButtonGroup__label">
                {isIconOnly ? (
                  <>
                    <EuiScreenReaderOnly>
                      <span>{label}</span>
                    </EuiScreenReaderOnly>
                    {icon}
                  </>
                ) : (
                  <>
                    {iconSide === 'left' && icon}
                    <span className="euiButton__text">{label}</span>
                    {iconSide === 'right' && icon}
                  </>
                )}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};

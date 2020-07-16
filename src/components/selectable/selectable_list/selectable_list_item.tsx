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

import classNames from 'classnames';
import React, { Component, LiHTMLAttributes } from 'react';
import { CommonProps } from '../../common';
import { EuiI18n } from '../../i18n';
import { EuiIcon, IconColor, IconType } from '../../icon';
import { EuiSelectableOptionCheckedType } from '../selectable_option';
import { EuiScreenReaderOnly } from '../../accessibility';

function resolveIconAndColor(
  checked: EuiSelectableOptionCheckedType
): { icon: IconType; color?: IconColor } {
  if (!checked) {
    return { icon: 'empty' };
  }
  return checked === 'on'
    ? { icon: 'check', color: 'text' }
    : { icon: 'cross', color: 'text' };
}

export type EuiSelectableListItemProps = LiHTMLAttributes<HTMLLIElement> &
  CommonProps & {
    children?: React.ReactNode;
    /**
     * Applies an icon and visual styling to activated items
     */
    checked?: EuiSelectableOptionCheckedType;
    /**
     * Shows icons based on `checked` type
     */
    showIcons: boolean;
    /**
     * Highlights the item for pseudo focus
     */
    isFocused?: boolean;
    disabled?: boolean;
    prepend?: React.ReactNode;
    append?: React.ReactNode;
    allowExclusions?: boolean;
  };

// eslint-disable-next-line react/prefer-stateless-function
export class EuiSelectableListItem extends Component<
  EuiSelectableListItemProps
> {
  static defaultProps = {
    showIcons: true,
  };

  constructor(props: EuiSelectableListItemProps) {
    super(props);
  }

  render() {
    const {
      children,
      className,
      disabled = false,
      checked,
      isFocused,
      showIcons,
      prepend,
      append,
      allowExclusions,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiSelectableListItem',
      {
        'euiSelectableListItem-isFocused': isFocused,
      },
      className
    );

    let optionIcon: React.ReactNode;
    if (showIcons) {
      const { icon, color } = resolveIconAndColor(checked);
      optionIcon = (
        <EuiIcon
          className="euiSelectableListItem__icon"
          color={color}
          type={icon}
        />
      );
    }

    let prependNode: React.ReactNode;
    if (prepend) {
      prependNode = (
        <span className="euiSelectableListItem__prepend">{prepend}</span>
      );
    }

    let appendNode: React.ReactNode;
    if (append) {
      appendNode = (
        <span className="euiSelectableListItem__append">{append}</span>
      );
    }

    let state: React.ReactNode;
    let instruction: React.ReactNode;
    if (allowExclusions && checked === 'on') {
      state = (
        <EuiScreenReaderOnly>
          <span>
            <EuiI18n
              token="euiSelectableListItem.includedOption"
              default="Included option."
            />
          </span>
        </EuiScreenReaderOnly>
      );
      instruction = (
        <EuiScreenReaderOnly>
          <span>
            <EuiI18n
              token="euiSelectableListItem.includedOptionInstructions"
              default="To exclude this option, press enter or space."
            />
          </span>
        </EuiScreenReaderOnly>
      );
    } else if (allowExclusions && checked === 'off') {
      state = (
        <EuiScreenReaderOnly>
          <span>
            <EuiI18n
              token="euiSelectableListItem.excludedOption"
              default="Excluded option."
            />
          </span>
        </EuiScreenReaderOnly>
      );
      instruction = (
        <EuiScreenReaderOnly>
          <span>
            <EuiI18n
              token="euiSelectableListItem.excludedOptionInstructions"
              default="To deselect this option, press enter or space."
            />
          </span>
        </EuiScreenReaderOnly>
      );
    }

    return (
      <li
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="option"
        aria-selected={!disabled && typeof checked === 'string'}
        className={classes}
        aria-disabled={disabled}
        {...rest}>
        <span className="euiSelectableListItem__content">
          {optionIcon}
          {prependNode}
          <span className="euiSelectableListItem__text">
            {state}
            {children}
            {instruction}
          </span>
          {appendNode}
        </span>
      </li>
    );
  }
}

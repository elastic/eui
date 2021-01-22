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

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { css } from '@emotion/react';
import chroma from 'chroma-js';
import { CommonProps } from '../common';
import { useEuiTheme } from '../../services/theme';
import { tint, shade } from '../../services/theme/theme';

interface EuiTableRowProps {
  /**
   * Indicates if the table has a single column of checkboxes for selecting
   * rows (affects mobile only)
   */
  isSelectable?: boolean;
  /**
   * Indicates the current row has been selected
   */
  isSelected?: boolean;
  /**
   * Indicates if the table has a dedicated column for icon-only actions
   * (affects mobile only)
   */
  hasActions?: boolean;
  /**
   * Indicates if the row will have an expanded row
   */
  isExpandable?: boolean;
  /**
   * Indicates if the row will be the expanded row
   */
  isExpandedRow?: boolean;
}

type Props = CommonProps &
  HTMLAttributes<HTMLTableRowElement> &
  EuiTableRowProps;

export const EuiTableRow: FunctionComponent<Props> = ({
  children,
  className,
  isSelected,
  isSelectable,
  hasActions,
  isExpandedRow,
  isExpandable,
  onClick,
  ...rest
}) => {
  const [theme, colorMode] = useEuiTheme();
  const euiTableHoverColor =
    colorMode === 'light' // tintOrShade
      ? tint(theme.colors.euiColorLightestShade, 0.5)
      : shade(theme.colors.euiColorLightestShade, 0.2);
  const euiTableSelectedColor =
    colorMode === 'light'
      ? tint(theme.colors.euiFocusBackgroundColor, 0.3)
      : theme.colors.euiFocusBackgroundColor;
  const euiTableHoverSelectedColor =
    colorMode === 'light'
      ? theme.colors.euiFocusBackgroundColor
      : shade(theme.colors.euiFocusBackgroundColor, 0.1);
  const euiTableHoverClickableColor = chroma(theme.colors.euiColorPrimary)
    .alpha(0.05)
    .css();
  const euiTableFocusClickableColor = chroma(theme.colors.euiColorPrimary)
    .alpha(0.1)
    .css();
  const styles = css`
    &:hover {
      background-color: ${euiTableHoverColor};
    }
    ${isExpandedRow
      ? `
        & .euiTableRowCell {
          background-color: ${euiTableHoverColor};
        }`
      : null}
    ${isSelected
      ? `
          background-color: ${euiTableSelectedColor};
          
          & + .euiTableRow.euiTableRow-isExpandedRow .euiTableRowCell {
            background-color: ${euiTableSelectedColor};
          }

          &:hover,
          &:hover + .euiTableRow.euiTableRow-isExpandedRow .euiTableRowCell {
            background-color: ${euiTableHoverSelectedColor};
          }
      `
      : null};
    ${onClick
      ? `
          &:hover {
            background-color: ${euiTableHoverClickableColor};
          }

          &:focus {
            background-color: ${euiTableFocusClickableColor};
          }
      `
      : null}
  `;
  const classes = classNames('euiTableRow', className, {
    'euiTableRow-isSelectable': isSelectable,
    'euiTableRow-isSelected': isSelected,
    'euiTableRow-hasActions': hasActions,
    'euiTableRow-isExpandedRow': isExpandedRow,
    'euiTableRow-isExpandable': isExpandable,
    'euiTableRow-isClickable': onClick,
  });

  return (
    <tr css={styles} className={classes} onClick={onClick} {...rest}>
      {children}
    </tr>
  );
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { HTMLAttributes, ReactNode } from 'react';
import { CommonProps } from '../common';

export interface EuiDescriptionListProps {
  listItems?: Array<{
    title: NonNullable<ReactNode>;
    description: NonNullable<ReactNode>;
  }>;
  /**
   * Text alignment
   */
  align?: EuiDescriptionListAlignment;
  /**
   * Smaller text and condensed spacing
   */
  compressed?: boolean;
  /**
   * How should the content be styled, by default
   * this will emphasize the title
   */
  textStyle?: 'normal' | 'reverse';
  /**
   * How each item should be laid out
   */
  type?: EuiDescriptionListType;
  /**
   * Props object to be passed to `EuiDescriptionListTitle`
   */
  titleProps?: HTMLAttributes<HTMLElement> & CommonProps;
  /**
   * Props object to be passed to `EuiDescriptionListDescription`
   */
  descriptionProps?: HTMLAttributes<HTMLElement> & CommonProps;
  /**
   * Allows customizing the vertical spacing between rows.
   */
  rowGutterSize?: EuiDescriptionListGutterSizes;
  /**
   * Allows customizing the horizontal spacing between columns.
   *
   * Only applies to `column` and `responsiveColumn` types.
   */
  columnGutterSize?: EuiDescriptionListColumnGapSizes;
  /**
   * Allows customizing specific column widths (e.g. `['100px', '200px']`). The first
   * array value applies to the title column, and the second applies to the description column.
   *
   * Passing numbers instead of CSS width strings will use a ratio of widths.
   * For example, [1, 3] will render a description column 3x the width of the title column.
   * In other words, descriptions will have a width of `75%` and titles will have a width of `25%`.
   *
   * Only applies to `column` and `responsiveColumn` types.
   *
   * _Advanced usage note:_ column width strings also accept [CSS grid special units,
   * sizing, keywords, and sizing functions](https://css-tricks.com/snippets/css/complete-guide-grid/#aa-special-units-functions).
   */
  columnWidths?: [number | string, number | string];
}

export const CHILD_TYPES = ['row', 'inline', 'column'] as const;
export type EuiDescriptionListChildTypes = (typeof CHILD_TYPES)[number];

export const TYPES = [...CHILD_TYPES, 'responsiveColumn'] as const;
export type EuiDescriptionListType = (typeof TYPES)[number];

export const ALIGNMENTS = ['center', 'left'] as const;
export type EuiDescriptionListAlignment = (typeof ALIGNMENTS)[number];

export const TEXT_STYLES = ['normal', 'reverse'] as const;
export type EuiDescriptionListTextStyle = (typeof TEXT_STYLES)[number];

export const ROW_GUTTER_SIZES = ['s', 'm'] as const;
export type EuiDescriptionListGutterSizes = (typeof ROW_GUTTER_SIZES)[number];

export const COLUMN_GUTTER_SIZES = ['s', 'm'] as const;
export type EuiDescriptionListColumnGapSizes =
  (typeof COLUMN_GUTTER_SIZES)[number];

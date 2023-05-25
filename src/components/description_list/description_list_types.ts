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
   * Vertical spacing added between `EuiDescriptionList` elements
   */
  gutterSize?: EuiDescriptionListGutterSizes;
}

export const TYPES = ['row', 'inline', 'column', 'responsiveColumn'] as const;
export type EuiDescriptionListType = (typeof TYPES)[number];

export const ALIGNMENTS = ['center', 'left'] as const;
export type EuiDescriptionListAlignment = (typeof ALIGNMENTS)[number];

export const TEXT_STYLES = ['normal', 'reverse'] as const;
export type EuiDescriptionListTextStyle = (typeof TEXT_STYLES)[number];

export const GUTTER_SIZES = ['s', 'm'] as const;
export type EuiDescriptionListGutterSizes = (typeof GUTTER_SIZES)[number];

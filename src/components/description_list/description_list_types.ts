/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { HTMLAttributes, ReactNode } from 'react';
import { CommonProps, keysOf } from '../common';

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
  textStyle?: EuiDescriptionListTextStyle;
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
}

export type EuiDescriptionListType = keyof typeof typesToClassNameMap;
export type EuiDescriptionListAlignment = keyof typeof alignmentsToClassNameMap;
export type EuiDescriptionListTextStyle = keyof typeof textStylesToClassNameMap;

export const typesToClassNameMap = {
  row: 'euiDescriptionList--row',
  inline: 'euiDescriptionList--inline',
  column: 'euiDescriptionList--column',
  responsiveColumn: 'euiDescriptionList--responsiveColumn',
};

export const TYPES = keysOf(typesToClassNameMap);

export const alignmentsToClassNameMap = {
  center: 'euiDescriptionList--center',
  left: '',
};

export const ALIGNMENTS = keysOf(alignmentsToClassNameMap);

export const textStylesToClassNameMap = {
  normal: '',
  reverse: 'euiDescriptionList--reverse',
};

export const TEXT_STYLES = keysOf(textStylesToClassNameMap);

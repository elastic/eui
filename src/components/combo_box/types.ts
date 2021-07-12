/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ButtonHTMLAttributes } from 'react';
import { CommonProps } from '../common';

// note similarity to `Option` in `components/selectable/types.tsx`
export interface EuiComboBoxOptionOption<
  T = string | number | string[] | undefined
> extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  isGroupLabelOption?: boolean;
  label: string;
  key?: string;
  options?: Array<EuiComboBoxOptionOption<T>>;
  value?: T;
}

export type UpdatePositionHandler = (
  listElement?: RefInstance<HTMLDivElement>
) => void;
export type OptionHandler<T> = (option: EuiComboBoxOptionOption<T>) => void;

export type RefInstance<T> = T | null;

export type EuiComboBoxOptionsListPosition = 'top' | 'bottom';

export interface EuiComboBoxSingleSelectionShape {
  asPlainText?: boolean;
}

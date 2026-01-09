/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext } from 'react';
import { EuiFormControlLayoutProps } from './form_control_layout';

type FormControlLayoutContext = Pick<
  EuiFormControlLayoutProps,
  'compressed' | 'inputId' | 'isDisabled' | 'isInvalid' | 'readOnly'
>;

/**
 * Context to share props between `EuiFormControlLayout` and passed children like e.g. EuiFormAppend/Prepend
 */
export const EuiFormControlLayoutContext =
  createContext<FormControlLayoutContext>({
    compressed: false,
    inputId: '',
    isDisabled: false,
    isInvalid: false,
    readOnly: false,
  });

export const EuiFormControlLayoutContextProvider =
  EuiFormControlLayoutContext.Provider;

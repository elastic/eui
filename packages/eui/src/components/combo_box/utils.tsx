/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren } from 'react';

import { useEuiTheme } from '../../services';
import { logicalStyle } from '../../global_styling';

import { EuiComboBoxOptionOption } from './types';

/**
 * DRY util for rendering an option with its prepend and append properties
 */
export const EuiComboBoxOptionAppendPrepend = <T,>({
  children,
  option,
  classNamePrefix,
  marginSize = 'xs',
}: PropsWithChildren & {
  option?: EuiComboBoxOptionOption<T>;
  classNamePrefix?: string;
  marginSize?: 's' | 'xs' | 'xxs';
}) => {
  const { euiTheme } = useEuiTheme();
  const margin = euiTheme.size[marginSize];

  return (
    <>
      {option?.prepend && (
        <span
          className={`${classNamePrefix}__prepend`}
          css={logicalStyle('margin-right', margin)}
        >
          {option.prepend}
        </span>
      )}
      {children}
      {option?.append && (
        <span
          className={`${classNamePrefix}__append`}
          css={logicalStyle('margin-left', margin)}
        >
          {option.append}
        </span>
      )}
    </>
  );
};

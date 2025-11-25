/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { ReactWrapper } from 'enzyme';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Checks if an Enzyme wrapper has EUI disabled state (it checks `disabled`, `isDisabled` and `aria-disabled` props)
       */
      toHaveEuiDisabledProp(): R;
    }
  }
}

export declare const toHaveEuiDisabledProp: (wrapper: ReactWrapper<any>) => {
  message: () => string;
  pass: boolean;
};

export declare const hasEuiDisabledProp: (
  props: Record<string, any>
) => boolean;

export declare const euiEnzymeMatchers: {
  toHaveEuiDisabledProp: typeof toHaveEuiDisabledProp;
};

export declare const setupEuiEnzymeMatchers: () => void;

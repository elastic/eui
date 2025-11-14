/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

/* eslint-env jest */

export const euiEnzymeMatchers = {
  /**
   * Checks if an Enzyme wrapper has an EUI disabled state.
   * It looks for `disabled`, `isDisabled` and `aria-disabled` props
   */
  toHaveEuiDisabledProp(props: Record<string, any>) {
    if (!props || typeof props !== 'object') {
      throw new Error(
        'toHaveEuiDisabledProp() must be called with the props value from ReactWrapper.props()'
      );
    }

    const isDisabled = hasEuiDisabledProp(props);

    return {
      message: () =>
        isDisabled
          ? 'Expected component NOT to have EUI disabled prop, but it was disabled'
          : 'Expected component to have EUI disabled prop (`disabled`, `isDisabled` or `aria-disabled="true"`)',
      pass: isDisabled,
    };
  },
};

export const setupEuiEnzymeMatchers = () => {
  expect.extend(euiEnzymeMatchers);
};

/* Utilities */

/**
 * Checks if a ReactWrapper has one of the following disabled props enabled:
 * `disabled`, `isDisabled` or attribute or `aria-disabled="true"`.
 */
export const hasEuiDisabledProp = (props: Record<string, any>) => {
  return (
    props.disabled === true ||
    props.isDisabled === true ||
    props['aria-disabled'] === true ||
    props['aria-disabled'] === 'true'
  );
};

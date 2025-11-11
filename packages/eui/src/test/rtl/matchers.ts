/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { elementCanBeDisabled } from '../../utils';

const NATIVE_DISABLED_ATTR = 'disabled';
const CUSTOM_DISABLED_ATTR = 'aria-disabled';

const toBeEuiDisabled = (element: HTMLElement) => {
  const { isDisabled, canBeDisabled, isNativelyDisabled } =
    getEuiDisabledState(element);

  return {
    message: () => {
      if (isDisabled) {
        const method = isNativelyDisabled
          ? `\`${NATIVE_DISABLED_ATTR}\``
          : `\`${CUSTOM_DISABLED_ATTR}="true"\``;

        if (!canBeDisabled) {
          return `Element cannot be disabled (based on its role), but it was disabled via ${method}`;
        } else {
          return `Expected element NOT to be disabled, but it was disabled via ${method}`;
        }
      } else {
        return `Expected element to be disabled via either \`${NATIVE_DISABLED_ATTR}\` or \`${CUSTOM_DISABLED_ATTR}="true"\` attribute, but found neither`;
      }
    },
    pass: isDisabled,
  };
};

const toBeEuiEnabled = (element: HTMLElement) => {
  const { isDisabled, isNativelyDisabled, isAriaDisabled } =
    getEuiDisabledState(element);

  return {
    message: () => {
      const attributes = [
        isNativelyDisabled ? `\`${NATIVE_DISABLED_ATTR}\`` : undefined,
        isAriaDisabled ? `\`${CUSTOM_DISABLED_ATTR}="true"\`` : undefined,
      ]
        .filter((item) => item !== undefined)
        .join(' and ');

      return `Expected element NOT to have attributes: ${attributes}.`;
    },
    pass: !isDisabled,
  };
};

export const euiMatchers = {
  toBeEuiDisabled,
  toBeEuiEnabled,
};

export const setupEuiMatchers = () => {
  expect.extend(euiMatchers);
};

export default euiMatchers;

/* Utilities */

/**
 * Retrieve an element's disabled state details.
 * Checks wheather the element has an `disabled` attribute or `aria-disabled="true"` attribute
 * @returns { isDisabled: boolean; canBeDisabled: boolean; isNativelyDisabled: boolean; isAriaDisabled: boolean }
 */
export const getEuiDisabledState = (element: HTMLElement) => {
  const canBeDisabled = elementCanBeDisabled(element);
  const isNativelyDisabled = element.hasAttribute('disabled');

  const isAriaDisabled = element.getAttribute('aria-disabled') === 'true';
  const isDisabled = canBeDisabled && (isNativelyDisabled || isAriaDisabled);

  return { isDisabled, canBeDisabled, isNativelyDisabled, isAriaDisabled };
};

/**
 * Checks if an element is disabled via `disabled` attribute or `aria-disabled="true"`.
 */
export const isEuiDisabled = (element: HTMLElement) => {
  return getEuiDisabledState(element).isDisabled;
};

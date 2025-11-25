/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="cypress" />

export function registerEuiCypressMatchers() {
  const chai = (window as any).chai;

  if (chai && !chai.__euiMatchersRegistered) {
    chai.use((_chai: any) => {
      _chai.Assertion.addProperty('euiDisabled', function (this: any) {
        const element = this._obj[0] || this._obj;

        const hasDisabledAttribute = element.hasAttribute('disabled');
        const hasAriaDisabled =
          element.getAttribute('aria-disabled') === 'true';
        const isDisabled = hasDisabledAttribute || hasAriaDisabled;

        this.assert(
          isDisabled,
          'expected element to be EUI disabled (= have `disabled` attribute or `aria-disabled="true"`)',
          'expected element not to be EUI disabled (= not have `disabled` attribute or `aria-disabled="true"`)',
          true,
          isDisabled
        );
      });

      _chai.Assertion.addProperty('euiEnabled', function (this: any) {
        const element = this._obj[0] || this._obj;

        const hasDisabledAttribute = element.hasAttribute('disabled');
        const hasAriaDisabled =
          element.getAttribute('aria-disabled') === 'true';
        const isDisabled = hasDisabledAttribute || hasAriaDisabled;

        this.assert(
          !isDisabled,
          'expected element to be EUI enabled (= not have `disabled` attribute or `aria-disabled="true"`)',
          'expected element not to be EUI enabled (= have `disabled` attribute or `aria-disabled="true"`)',
          false,
          isDisabled
        );
      });
    });

    // Mark as registered to prevent double registration
    chai.__euiMatchersRegistered = true;
  }
}

// Register matchers when support file loads
export const setupEuiCypressMatchers = () => {
  if (typeof window !== 'undefined') {
    // Try to register immediately
    if ((window as any).chai) {
      registerEuiCypressMatchers();
    } else {
      // Wait for chai to be available
      const pollForChai = () => {
        if ((window as any).chai) {
          registerEuiCypressMatchers();
        } else {
          setTimeout(pollForChai, 10);
        }
      };
      pollForChai();
    }
  }
};

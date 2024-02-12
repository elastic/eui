/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test';

import { EuiErrorBoundary } from './error_boundary';

const GoodComponent = () => <div>No error</div>;

const errorMessage =
  "I'm here to kick butt and chew bubblegum.\n\nAnd I'm all out of gum.";

const BadComponent = () => {
  throw new Error(errorMessage);
};

describe('EuiErrorBoundary', () => {
  describe('without an error thrown', () => {
    it('does not render the UI', () => {
      const { container } = render(
        <EuiErrorBoundary {...requiredProps}>
          <GoodComponent />
        </EuiErrorBoundary>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('with an error thrown', () => {
    it('renders UI', () => {
      // Because the error contains the stack trace, it's non-deterministic. So we'll just check that
      // it contains our error message.
      const { container } = render(
        <EuiErrorBoundary {...requiredProps}>
          <BadComponent />
        </EuiErrorBoundary>
      );

      expect(container.textContent).toContain(errorMessage);
    });

    it('renders data-test-subj', () => {
      const { getByTestSubject } = render(
        <EuiErrorBoundary data-test-subj="test">
          <BadComponent />
        </EuiErrorBoundary>
      );

      expect(getByTestSubject('euiErrorBoundary test')).toBeTruthy();
    });

    it('calls onError', () => {
      const onError = jest.fn();
      render(
        <EuiErrorBoundary onError={onError}>
          <BadComponent />
        </EuiErrorBoundary>
      );

      expect(onError).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});

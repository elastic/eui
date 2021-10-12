/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { requiredProps, takeMountedSnapshot } from '../../test';

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
      const component = takeMountedSnapshot(
        mount(
          <EuiErrorBoundary {...requiredProps}>
            <GoodComponent />
          </EuiErrorBoundary>
        )
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('with an error thrown', () => {
    it('renders UI', () => {
      // Because the error contains the stack trace, it's non-deterministic. So we'll just check that
      // it contains our error message.
      const errorText = mount(
        <EuiErrorBoundary {...requiredProps}>
          <BadComponent />
        </EuiErrorBoundary>
      ).text();

      expect(errorText).toContain(errorMessage);
    });

    it('renders data-test-subj', () => {
      const errorHtml = mount(
        <EuiErrorBoundary {...requiredProps}>
          <BadComponent />
        </EuiErrorBoundary>
      ).html();

      expect(errorHtml).toContain('euiErrorBoundary');
      expect(errorHtml).toContain('test subject string');
    });
  });
});

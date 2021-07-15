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
  test('is rendered without an error', () => {
    const component = takeMountedSnapshot(
      mount(
        <EuiErrorBoundary {...requiredProps}>
          <GoodComponent />
        </EuiErrorBoundary>
      )
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with an error', () => {
    // Prevent the React boundary error from appearing in the terminal.
    spyOn(console, 'error'); // eslint-disable-line no-undef

    // Because the error contains the stack trace, it's non-deterministic. So we'll just check that
    // it contains our error message.
    const errorText = mount(
      <EuiErrorBoundary {...requiredProps}>
        <BadComponent />
      </EuiErrorBoundary>
    ).text();

    expect(errorText).toContain(errorMessage);
  });
});

import React from 'react';
import { mount } from 'enzyme';
import {
  requiredProps,
  takeMountedSnapshot,
} from '../../test';

import { EuiErrorBoundary } from './error_boundary';

const GoodComponent = () => (
  <div>No error</div>
);

const BadComponent = () => {
  throw new Error('I\'m here to kick butt and chew bubblegum.\n\n\And I\'m all out of gum.');
};

describe('EuiErrorBoundary', () => {
  test('is rendered without an error', () => {
    const component = mount(
      <EuiErrorBoundary {...requiredProps}>
        <GoodComponent />
      </EuiErrorBoundary>
    );

    expect(takeMountedSnapshot(component))
      .toMatchSnapshot();
  });

  test('is rendered with an error', () => {
    // Prevent the React boundary error from appearing in the terminal.
    spyOn(console, 'error'); // eslint-disable-line no-undef

    const component = mount(
      <EuiErrorBoundary {...requiredProps}>
        <BadComponent />
      </EuiErrorBoundary>
    );

    expect(takeMountedSnapshot(component))
      .toMatchSnapshot();
  });
});

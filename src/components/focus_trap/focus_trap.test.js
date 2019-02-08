import React from 'react';
import { render } from 'enzyme';

import { EuiFocusTrap } from './focus_trap';

describe('EuiFocusTrap', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFocusTrap>
        <div />
      </EuiFocusTrap>
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('can be disabled', () => {
    const component = render(
      <EuiFocusTrap disabled>
        <div />
      </EuiFocusTrap>
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('can have outside click detection', () => {
    const component = render(
      <EuiFocusTrap clickOutsideDisables>
        <div />
      </EuiFocusTrap>
    );

    expect(component)
      .toMatchSnapshot();
  });
});

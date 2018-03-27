import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiFlyout } from './flyout';

describe('EuiFlyout', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFlyout
        {...requiredProps}
        onClose={() => {}}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

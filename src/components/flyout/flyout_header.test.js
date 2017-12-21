import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiFlyoutHeader } from './flyout_header';

describe('EuiFlyoutHeader', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFlyoutHeader {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

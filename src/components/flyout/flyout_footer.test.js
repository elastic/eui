import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiFlyoutFooter } from './flyout_footer';

describe('EuiFlyoutFooter', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFlyoutFooter {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

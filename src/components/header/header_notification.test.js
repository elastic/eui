import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiHeaderNotification } from './header_notification';

describe('EuiHeaderNotification', () => {
  test('is rendered', () => {
    const component = render(
      <EuiHeaderNotification {...requiredProps}>
        Content
      </EuiHeaderNotification>
    );

    expect(component)
      .toMatchSnapshot();
  });
});

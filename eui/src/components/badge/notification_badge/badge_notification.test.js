import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiNotificationBadge } from './badge_notification';

describe('EuiNotificationBadge', () => {
  test('is rendered', () => {
    const component = render(
      <EuiNotificationBadge {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

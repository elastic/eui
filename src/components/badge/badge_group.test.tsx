import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiBadge } from './badge';
import { EuiBadgeGroup } from './badge_group';

describe('EuiBadgeGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiBadgeGroup {...requiredProps}>
        <EuiBadge isDisabled {...requiredProps}>
          Content
        </EuiBadge>
      </EuiBadgeGroup>
    );

    expect(component).toMatchSnapshot();
  });
});

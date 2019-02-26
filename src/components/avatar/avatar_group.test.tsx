import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiAvatar } from './avatar';
import { EuiAvatarGroup } from './avatar_group';

describe('EuiAvatarGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiAvatarGroup
        avatars={[
          <EuiAvatar key="1" name="Rafael" />,
          <EuiAvatar key="2" name="Donatello" />,
          <EuiAvatar key="3" name="Leornardo" color="#BD10E0" />,
          <EuiAvatar key="4" name="Michaelangelo" />,
        ]}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });
});

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTogglePill } from './toggle_pill';

describe('EuiTogglePill', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTogglePill {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

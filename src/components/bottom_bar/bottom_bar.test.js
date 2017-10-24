import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiBottomBar } from './bottom_bar';

describe('EuiBottomBar', () => {
  test('is rendered', () => {
    const component = render(
      <EuiBottomBar {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

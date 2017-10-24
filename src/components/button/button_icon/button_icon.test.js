import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiButtonIcon } from './button_icon';

describe('EuiButtonIcon', () => {
  test('is rendered', () => {
    const component = render(
      <EuiButtonIcon {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiButtonIcon } from './button_icon';

describe('EuiButtonIcon', () => {
  test('is rendered', () => {
    const component = render(
      <EuiButtonIcon aria-label="ariaLabel" {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

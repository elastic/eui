import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTextColor } from './text_color';

describe('EuiTextColor', () => {
  test('is rendered', () => {
    const component = render(<EuiTextColor {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});

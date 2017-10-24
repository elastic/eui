import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiButtonEmpty } from './button_empty';

describe('EuiButtonEmpty', () => {
  test('is rendered', () => {
    const component = render(
      <EuiButtonEmpty {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

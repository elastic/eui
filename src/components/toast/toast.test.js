import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiToast } from './toast';

describe('EuiToast', () => {
  test('is rendered', () => {
    const component = render(
      <EuiToast {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

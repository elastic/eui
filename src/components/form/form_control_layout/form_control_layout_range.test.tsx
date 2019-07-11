import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFormControlLayoutRange } from './form_control_layout_range';

describe('EuiFormControlLayoutRange', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormControlLayoutRange
        startControl={<span>start</span>}
        endControl={<span>end</span>}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });
});

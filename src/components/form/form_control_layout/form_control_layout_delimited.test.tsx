import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFormControlLayoutDelimited } from './form_control_layout_delimited';

describe('EuiFormControlLayoutDelimited', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormControlLayoutDelimited
        startControl={<span>start</span>}
        endControl={<span>end</span>}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });
});

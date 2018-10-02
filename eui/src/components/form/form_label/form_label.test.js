import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFormLabel } from './form_label';

describe('EuiFormLabel', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormLabel {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

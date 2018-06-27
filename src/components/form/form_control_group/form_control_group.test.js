import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiFormControlGroup } from './form_control_group';

describe('EuiFormControlGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormControlGroup {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

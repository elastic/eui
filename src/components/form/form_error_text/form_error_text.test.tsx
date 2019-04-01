import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiFormErrorText } from './form_error_text';

describe('EuiFormErrorText', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormErrorText {...requiredProps}>This is an error.</EuiFormErrorText>
    );

    expect(component).toMatchSnapshot();
  });
});

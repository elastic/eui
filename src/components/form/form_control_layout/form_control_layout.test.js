import React from 'react';
import { render } from 'enzyme';

import { EuiFormControlLayout } from './form_control_layout';

describe('EuiFormControlLayout', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormControlLayout>
        <input />
      </EuiFormControlLayout>
    );

    expect(component)
      .toMatchSnapshot();
  });
});

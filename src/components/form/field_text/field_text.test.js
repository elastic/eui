import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFieldText } from './field_text';

describe('EuiFieldText', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFieldText {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

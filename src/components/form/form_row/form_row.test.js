import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFormRow } from './form_row';

jest.mock(`./make_id`, () => () => `generated-id`);

describe('EuiFormRow', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormRow {...requiredProps}>
        <input />
      </EuiFormRow>
    );

    expect(component)
      .toMatchSnapshot();
  });
});

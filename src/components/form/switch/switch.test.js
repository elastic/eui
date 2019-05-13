import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiSwitch } from './switch';

jest.mock(`../form_row/make_id`, () => () => `generated-id`);

describe('EuiSwitch', () => {
  test('is rendered', () => {
    const component = render(<EuiSwitch id="test" {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('assigns automatically generated ID to label', () => {
    const component = render(<EuiSwitch />);

    expect(component).toMatchSnapshot();
  });
});

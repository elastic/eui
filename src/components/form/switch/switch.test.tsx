import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiSwitch } from './switch';

const props = {
  checked: false,
  label: 'Label',
  onChange: () => {},
};

jest.mock('../form_row/make_id', () => () => 'generated-id');

describe('EuiSwitch', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSwitch id="test" {...props} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('assigns automatically generated ID to label', () => {
    const component = render(<EuiSwitch {...props} />);

    expect(component).toMatchSnapshot();
  });
});

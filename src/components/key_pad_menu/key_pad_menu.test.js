import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiKeyPadMenu } from './key_pad_menu';

describe('EuiKeyPadMenu', () => {
  test('is rendered', () => {
    const component = render(<EuiKeyPadMenu {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});

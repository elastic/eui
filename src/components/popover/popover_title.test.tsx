import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiPopoverTitle } from './popover_title';

describe('EuiPopoverTitle', () => {
  test('is rendered', () => {
    const component = render(<EuiPopoverTitle {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});

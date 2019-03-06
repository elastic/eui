import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiPopoverFooter } from './popover_footer';

describe('EuiPopoverFooter', () => {
  test('is rendered', () => {
    const component = render(<EuiPopoverFooter {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});

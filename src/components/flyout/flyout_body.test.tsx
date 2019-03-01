import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiFlyoutBody } from './flyout_body';

describe('EuiFlyoutBody', () => {
  test('is rendered', () => {
    const component = render(<EuiFlyoutBody {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});

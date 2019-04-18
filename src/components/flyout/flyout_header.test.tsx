import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiFlyoutHeader } from './flyout_header';

describe('EuiFlyoutHeader', () => {
  test('is rendered', () => {
    const component = render(<EuiFlyoutHeader {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('border is rendered', () => {
      const component = render(<EuiFlyoutHeader hasBorder />);

      expect(component).toMatchSnapshot();
    });
  });
});

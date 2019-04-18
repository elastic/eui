import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiHorizontalRule } from './horizontal_rule';

describe('EuiHorizontalRule', () => {
  test('is rendered', () => {
    const component = render(<EuiHorizontalRule {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});

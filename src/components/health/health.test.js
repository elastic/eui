import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiHealth } from './health';

describe('EuiHealth', () => {
  test('is rendered', () => {
    const component = render(<EuiHealth {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});

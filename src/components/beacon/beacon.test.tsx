import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiBeacon } from './beacon';

describe('EuiBeacon', () => {
  test('is rendered', () => {
    const component = render(<EuiBeacon {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiPanel } from './panel';

describe('EuiPanel', () => {
  test('is rendered', () => {
    const component = render(<EuiPanel {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSelectable } from './selectable';

describe('EuiSelectable', () => {
  test('is rendered', () => {
    const component = render(<EuiSelectable {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});

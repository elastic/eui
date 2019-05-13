import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiPageSideBar } from './page_side_bar';

describe('EuiPageSideBar', () => {
  test('is rendered', () => {
    const component = render(<EuiPageSideBar {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});

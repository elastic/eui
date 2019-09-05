import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiPagination } from './pagination';

describe('EuiPagination', () => {
  test('is rendered', () => {
    const component = render(<EuiPagination {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});

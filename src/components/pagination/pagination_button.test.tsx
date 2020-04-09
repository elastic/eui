import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiPaginationButton } from './pagination_button';

describe('EuiPaginationButton', () => {
  test('is rendered', () => {
    const component = render(
      <EuiPaginationButton pageIndex={1} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});

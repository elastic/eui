import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFieldSearch } from './field_search';

describe('EuiFieldSearch', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFieldSearch {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

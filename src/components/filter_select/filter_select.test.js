import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiFilterSelect } from './filter_select';

describe('EuiFilterSelect', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFilterSelect {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

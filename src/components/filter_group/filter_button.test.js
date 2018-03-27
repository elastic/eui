import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiFilterButton } from './filter_button';

describe('EuiFilterButton', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFilterButton {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

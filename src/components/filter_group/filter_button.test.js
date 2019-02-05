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

  test('renders zero properly', () => {
    const component = render(
      <EuiFilterButton {...requiredProps} numFilters={0} />
    );

    expect(component).toMatchSnapshot();
  });
});

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiHeaderBreadcrumbs } from './header_breadcrumbs';

describe('EuiHeaderBreadcrumbs', () => {
  test('is rendered', () => {
    const component = render(
      <EuiHeaderBreadcrumbs {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

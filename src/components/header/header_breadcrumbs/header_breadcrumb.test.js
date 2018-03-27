import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiHeaderBreadcrumb } from './header_breadcrumb';

describe('EuiHeaderBreadcrumb', () => {
  test('is rendered', () => {
    const component = render(
      <EuiHeaderBreadcrumb {...requiredProps}>
        content
      </EuiHeaderBreadcrumb>
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('href is rendered', () => {
    const component = render(
      <EuiHeaderBreadcrumb href="#" />
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('isActive is rendered', () => {
    const component = render(
      <EuiHeaderBreadcrumb isActive={true} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

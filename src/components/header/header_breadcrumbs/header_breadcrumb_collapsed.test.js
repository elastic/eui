import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiHeaderBreadcrumbCollapsed } from './header_breadcrumb_collapsed';

describe('EuiHeaderBreadcrumbCollapsed', () => {
  test('is rendered', () => {
    const component = render(
      <EuiHeaderBreadcrumbCollapsed {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

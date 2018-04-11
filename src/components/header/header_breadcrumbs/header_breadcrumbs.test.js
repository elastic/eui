import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiHeaderBreadcrumbs } from './header_breadcrumbs';

describe('EuiHeaderBreadcrumbs', () => {
  test('is rendered', () => {
    const component = render(
      <EuiHeaderBreadcrumbs {...requiredProps}>
        <span>
          I thought I would sail about a little and see the watery part of the world.
        </span>
      </EuiHeaderBreadcrumbs>
    );

    expect(component)
      .toMatchSnapshot();
  });
});

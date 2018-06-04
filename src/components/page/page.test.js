import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiPage } from './page';

describe('EuiPage', () => {
  test('is rendered', () => {
    const component = render(
      <EuiPage {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('sets a max-width', () => {
    const component = render(
      <EuiPage {...requiredProps} restrictWidth={1024} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

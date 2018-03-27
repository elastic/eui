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
});

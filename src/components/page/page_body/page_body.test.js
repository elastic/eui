import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiPageBody } from './page_body';

describe('EuiPageBody', () => {
  test('is rendered', () => {
    const component = render(
      <EuiPageBody {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

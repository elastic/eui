import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCode } from './code';

describe('EuiCode', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCode {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

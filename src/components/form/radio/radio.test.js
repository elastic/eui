import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiRadio } from './radio';

describe('EuiRadio', () => {
  test('is rendered', () => {
    const component = render(
      <EuiRadio id="id" onChange={() => {}} {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiAccordion } from './accordion';

describe('EuiAccordion', () => {
  test('is rendered', () => {
    const component = render(
      <EuiAccordion {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

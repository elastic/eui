import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiAccordion } from './accordion';

let id = 0;
const getId = () => (`${id++}`);

describe('EuiAccordion', () => {
  test('is rendered', () => {
    const component = render(
      <EuiAccordion
        id={getId()}
        {...requiredProps}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });
});

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCode } from './code';

const code = `var some = 'code';
console.log(some);`;

describe('EuiCode', () => {
  test('renders a code snippet', () => {
    const component = render(<EuiCode {...requiredProps}>{code}</EuiCode>);

    expect(component).toMatchSnapshot();
  });
});

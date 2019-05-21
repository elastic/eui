import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCodeBlock } from './code_block';

const code = `var some = 'code';
console.log(some);`;

describe('EuiCodeBlock', () => {
  test('renders a code block', () => {
    const component = render(
      <EuiCodeBlock {...requiredProps}>{code}</EuiCodeBlock>
    );

    expect(component).toMatchSnapshot();
  });
});

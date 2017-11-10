import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCodeBlock } from './code_block';

jest.mock('./_code_block', () => ({ EuiCodeBlockImpl: 'EuiCodeBlockImpl' }));

const code = `var some = 'code';
console.log(some);`;

describe('EuiCodeBlock', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCodeBlock {...requiredProps}>
        {code}
      </EuiCodeBlock>
    );

    expect(component)
      .toMatchSnapshot();
  });
});

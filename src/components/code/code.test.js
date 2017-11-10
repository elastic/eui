import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCode } from './code';

jest.mock('./_code_block', () => ({ EuiCodeBlockImpl: 'EuiCodeBlockImpl' }));

const code = `var some = 'code';
console.log(some);`;

describe('EuiCode', () => {
  test('is rendered using EuiCodeBlockImpl', () => {
    const component = render(
      <EuiCode {...requiredProps}>
        {code}
      </EuiCode>
    );

    expect(component)
      .toMatchSnapshot();
  });
});

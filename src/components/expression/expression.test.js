import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import {
  EuiExpression,
} from './expression';

describe('EuiExpression', () => {
  test('renders', () => {
    const component = (
      <EuiExpression {...requiredProps} />
    );

    expect(render(component)).toMatchSnapshot();
  });

  describe('Props', () => {
    describe('children', () => {
      test('is rendered', () => {
        const component = render(
          <EuiExpression>
            some expression
          </EuiExpression>
        );

        expect(component)
          .toMatchSnapshot();
      });
    });
  });
});

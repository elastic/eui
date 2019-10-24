import React from 'react';
import { render } from 'enzyme';
import {
  requiredProps,
  startThrowingReactWarnings,
  stopThrowingReactWarnings,
} from '../../test';

import { EuiFlexItem, GROW_SIZES } from './flex_item';

beforeAll(startThrowingReactWarnings);
afterAll(stopThrowingReactWarnings);

describe('EuiFlexItem', () => {
  test('is rendered', () => {
    const component = render(<EuiFlexItem {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('grow', () => {
    GROW_SIZES.concat([true, false]).forEach(value => {
      test(`${value} is rendered`, () => {
        const component = render(<EuiFlexItem grow={value} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});

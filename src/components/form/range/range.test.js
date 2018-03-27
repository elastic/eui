import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiRange } from './range';

describe('EuiRange', () => {
  test('is rendered', () => {
    const component = render(
      <EuiRange
        name="name"
        id="id"
        min={1}
        max={10}
        value="value"
        onChange={() => {}}
        {...requiredProps}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth should render', () => {
      const component = render(
        <EuiRange fullWidth/>
      );

      expect(component)
        .toMatchSnapshot();
    });
  });
});

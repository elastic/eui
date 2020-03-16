import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiToggle } from './toggle';

describe('EuiToggle', () => {
  test('is rendered', () => {
    const component = render(
      <EuiToggle label="Is toggle on?" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('is disabled', () => {
      const component = render(
        <EuiToggle label="Is toggle on?" isDisabled {...requiredProps} />
      );

      expect(component).toMatchSnapshot();
    });

    test('is rendered with onChange provided', () => {
      const component = render(
        <EuiToggle
          label="Is toggle on?"
          onChange={jest.fn()}
          {...requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('is checked', () => {
      const component = render(
        <EuiToggle
          label="Is toggle on?"
          checked
          onChange={jest.fn()}
          {...requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});

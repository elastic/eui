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
    test('isDisabled is rendered', () => {
      const component = render(<EuiToggle label="Is toggle on?" isDisabled />);

      expect(component).toMatchSnapshot();
    });

    test('onChange is rendered', () => {
      const component = render(
        <EuiToggle
          label="Is toggle on?"
          onChange={jest.fn()}
          {...requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('type is rendered', () => {
      const component = render(
        <EuiToggle label="Is toggle on?" type="single" {...requiredProps} />
      );

      expect(component).toMatchSnapshot();
    });

    test('checked is rendered', () => {
      const component = render(
        <EuiToggle
          label="Is toggle on?"
          checked
          {...requiredProps}
          onChange={jest.fn()}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});

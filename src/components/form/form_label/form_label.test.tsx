import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFormLabel } from './form_label';

describe('EuiFormLabel', () => {
  test('is rendered', () => {
    const component = render(<EuiFormLabel {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('isFocused is rendered', () => {
      const component = render(<EuiFormLabel isFocused />);

      expect(component).toMatchSnapshot();
    });

    test('isInvalid is rendered', () => {
      const component = render(<EuiFormLabel isInvalid />);

      expect(component).toMatchSnapshot();
    });

    test('type can be changed to legend', () => {
      const component = render(<EuiFormLabel type="legend" />);

      expect(component).toMatchSnapshot();
    });
  });
});

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFormFieldset } from './form_fieldset';

describe('EuiFormFieldset', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormFieldset {...requiredProps}>
        <input />
      </EuiFormFieldset>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('legend is rendered', () => {
      const component = render(
        <EuiFormFieldset legend={{ children: 'Legend' }}>
          <input />
        </EuiFormFieldset>
      );

      expect(component).toMatchSnapshot();
    });
  });
});

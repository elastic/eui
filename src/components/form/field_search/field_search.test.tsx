/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFieldSearch } from './field_search';

jest.mock('../form_control_layout', () => ({
  EuiFormControlLayout: 'eui-form-control-layout',
}));
jest.mock('../validatable_control', () => ({
  EuiValidatableControl: 'eui-validatable-control',
}));

describe('EuiFieldSearch', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFieldSearch
        name="elastic"
        id="1"
        placeholder="Placeholder"
        value="1"
        onChange={() => {}}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('isInvalid is rendered', () => {
      const component = render(<EuiFieldSearch isInvalid />);

      expect(component).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(<EuiFieldSearch fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const component = render(<EuiFieldSearch isLoading />);

      expect(component).toMatchSnapshot();
    });

    describe('isClearable', () => {
      test('is accepted', () => {
        const component = render(<EuiFieldSearch isClearable />);

        expect(component).toMatchSnapshot();
      });

      test('is rendered when a value exists', () => {
        const component = render(
          <EuiFieldSearch isClearable defaultValue="Hello" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    test('prepend is rendered', () => {
      const component = render(<EuiFieldSearch prepend="Prepend" />);

      expect(component).toMatchSnapshot();
    });

    test('append is rendered', () => {
      const component = render(<EuiFieldSearch prepend="Append" />);

      expect(component).toMatchSnapshot();
    });
  });
});

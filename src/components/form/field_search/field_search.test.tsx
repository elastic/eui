/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiForm } from '../form';
import { EuiFieldSearch } from './field_search';

jest.mock('../form_control_layout', () => ({
  EuiFormControlLayout: 'eui-form-control-layout',
}));
jest.mock('../validatable_control', () => ({
  EuiValidatableControl: 'eui-validatable-control',
}));

describe('EuiFieldSearch', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiFieldSearch
        name="elastic"
        id="1"
        placeholder="Placeholder"
        value="1"
        onChange={() => {}}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('isInvalid is rendered', () => {
      const { container } = render(<EuiFieldSearch isInvalid />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const { container } = render(<EuiFieldSearch fullWidth />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const { container } = render(<EuiFieldSearch isLoading />);

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('isClearable', () => {
      test('is accepted', () => {
        const { container } = render(<EuiFieldSearch isClearable />);

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered when a value exists', () => {
        const { container } = render(
          <EuiFieldSearch isClearable defaultValue="Hello" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    test('prepend is rendered', () => {
      const { container } = render(<EuiFieldSearch prepend="Prepend" />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('append is rendered', () => {
      const { container } = render(<EuiFieldSearch prepend="Append" />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const { container } = render(
        <EuiForm fullWidth>
          <EuiFieldSearch />
        </EuiForm>
      );

      const input = container.querySelector('.euiFieldSearch');
      expect(input).toHaveClass('euiFieldSearch--fullWidth');
    });
  });
});

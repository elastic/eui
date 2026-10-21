/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test/required_props';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { render, fireEvent } from '../../../test/rtl';

import { EuiForm } from '../form';
import { EuiFieldSearch } from './field_search';

jest.mock('../form_control_layout', () => ({
  EuiFormControlLayout: 'eui-form-control-layout',
}));
jest.mock('../validatable_control', () => ({
  EuiValidatableControl: 'eui-validatable-control',
}));

describe('EuiFieldSearch', () => {
  shouldRenderCustomStyles(<EuiFieldSearch />);

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
      expect(input?.className).toContain('fullWidth');
    });
  });
    describe('behavioral tests', () => {
    test('incremental onSearch fires once per value', () => {
      const onSearch = jest.fn();
      const { getByRole } = render(
        <EuiFieldSearch incremental onSearch={onSearch} />
      );
      const input = getByRole('searchbox');

      fireEvent.change(input, { target: { value: 'a' } });
      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenLastCalledWith('a');
    });

    test('native search event triggers onSearch', () => {
      const onSearch = jest.fn();
      const { getByRole } = render(<EuiFieldSearch onSearch={onSearch} />);
      const input = getByRole('searchbox');

      fireEvent(input, new Event('search'));
      expect(onSearch).toHaveBeenCalled();
    });

    test('clear button empties value and refocuses input', () => {
      const onSearch = jest.fn();
      const { getByRole, getByTestId } = render(
        <EuiFieldSearch defaultValue="hello" onSearch={onSearch} />
      );
      const input = getByRole('searchbox');
      const clearButton = getByTestId('clearSearchButton');

      fireEvent.click(clearButton);
      
      expect(input).toHaveValue('');
      expect(input).toHaveFocus();
      expect(onSearch).toHaveBeenCalledWith('');
    });

    test('listener cleanup on unmount', () => {
      const { unmount, getByRole } = render(<EuiFieldSearch />);
      const input = getByRole('searchbox');
      
      const removeEventListenerSpy = jest.spyOn(input, 'removeEventListener');
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
    });
  });
});

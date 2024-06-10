/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
/* eslint-disable no-irregular-whitespace */

import React from 'react';
import { requiredProps } from '../../../test/required_props';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { render } from '../../../test/rtl';

import { EuiForm } from '../form';
import { EuiSelect } from './select';

jest.mock('../form_control_layout', () => ({
  EuiFormControlLayout: 'eui-form-control-layout',
}));
jest.mock('../validatable_control', () => ({
  EuiValidatableControl: 'eui-validatable-control',
}));

describe('EuiSelect', () => {
  shouldRenderCustomStyles(<EuiSelect />);

  it('is rendered', () => {
    const { container } = render(
      <EuiSelect id="id" name="name" {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    it('options are rendered', () => {
      const { container } = render(
        <EuiSelect
          options={[
            { value: '1', text: 'Option #1' },
            { value: '2', text: 'Option #2' },
          ]}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('isInvalid is rendered', () => {
      const { container } = render(<EuiSelect isInvalid />);

      expect(container.firstChild).toMatchSnapshot();
    });

    it('fullWidth is rendered', () => {
      const { container } = render(<EuiSelect fullWidth />);

      expect(container.firstChild).toMatchSnapshot();
    });

    it('isLoading is rendered', () => {
      const { container } = render(<EuiSelect isLoading />);

      expect(container.firstChild).toMatchSnapshot();
    });

    it('disabled options are rendered', () => {
      const { container } = render(
        <EuiSelect
          options={[
            { value: '1', text: 'Option #1', disabled: false },
            { value: '2', text: 'Option #2', disabled: true },
          ]}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('value option is rendered', () => {
      const { container } = render(
        <EuiSelect
          options={[
            { value: '1', text: 'Option #1' },
            { value: '2', text: 'Option #2' },
          ]}
          value={'1'}
          onChange={() => {}}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('hasNoInitialSelection', () => {
    it('renders with an extra option at the top', () => {
      const { container } = render(
        <EuiSelect
          hasNoInitialSelection
          options={[
            { value: '1', text: 'Option #1' },
            { value: '2', text: 'Option #2' },
          ]}
          onChange={() => {}}
        />
      );

      expect(container.querySelectorAll('option').length).toBe(3);
      expect(container.querySelector('option')).toMatchInlineSnapshot(`
        <option
          disabled=""
          hidden=""
          style="display: none;"
          value=""
        >
           
        </option>
      `);
    });

    it('can be reset to an empty initial selection', () => {
      const props = {
        hasNoInitialSelection: true,
        options: [
          { value: '1', text: 'Option #1' },
          { value: '2', text: 'Option #2' },
        ],
        onChange: () => {},
        'data-test-subj': 'select',
      };
      const { getByTestSubject, rerender } = render(
        <EuiSelect {...props} value="1" />
      );

      expect(getByTestSubject('select')).toHaveValue('1');

      rerender(<EuiSelect {...props} value="" />);
      expect(getByTestSubject('select')).toHaveValue('');

      rerender(<EuiSelect {...props} value="2" />);
      expect(getByTestSubject('select')).toHaveValue('2');

      rerender(<EuiSelect {...props} />);
      expect(getByTestSubject('select')).toHaveValue('');
    });
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const { container } = render(
        <EuiForm fullWidth>
          <EuiSelect />
        </EuiForm>
      );

      const select = container.querySelector('.euiSelect');
      expect(select!.className).toContain('fullWidth');
    });
  });
});

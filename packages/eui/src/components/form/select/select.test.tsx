/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
/* eslint-disable no-irregular-whitespace */

import React from 'react';
import { mount } from 'enzyme';
import { requiredProps } from '../../../test/required_props';
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
      const component = mount(
        <EuiSelect
          hasNoInitialSelection
          options={[
            { value: '1', text: 'Option #1' },
            { value: '2', text: 'Option #2' },
          ]}
          onChange={() => {}}
        />
      );

      expect(component.find('option').length).toBe(3);
      expect(component.find('option').at(0)).toMatchInlineSnapshot(`
        <option
          disabled={true}
          hidden={true}
          style={
            Object {
              "display": "none",
            }
          }
          value=""
        >
           
        </option>
`);
    });

    it('can be reset to an empty initial selection', () => {
      const component = mount(
        <EuiSelect
          hasNoInitialSelection
          value="1"
          options={[
            { value: '1', text: 'Option #1' },
            { value: '2', text: 'Option #2' },
          ]}
          onChange={() => {}}
        />
      );

      expect(
        component.find('select').getDOMNode<HTMLSelectElement>().value
      ).toBe('1');

      component.setProps({ value: '' });
      expect(
        component.find('select').getDOMNode<HTMLSelectElement>().value
      ).toBe('');

      component.setProps({ value: '1' });
      expect(
        component.find('select').getDOMNode<HTMLSelectElement>().value
      ).toBe('1');

      component.setProps({ value: undefined });
      expect(
        component.find('select').getDOMNode<HTMLSelectElement>().value
      ).toBe('');
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
      expect(select).toHaveClass('euiSelect--fullWidth');
    });
  });
});

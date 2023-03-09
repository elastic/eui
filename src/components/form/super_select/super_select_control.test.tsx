/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiForm } from '../form';
import { EuiSuperSelectControl } from './super_select_control';

describe('EuiSuperSelectControl', () => {
  test('is rendered', () => {
    const component = render(<EuiSuperSelectControl {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth is rendered', () => {
      const component = render(<EuiSuperSelectControl fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('compressed is rendered', () => {
      const component = render(<EuiSuperSelectControl compressed />);

      expect(component).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const component = render(<EuiSuperSelectControl isLoading />);

      expect(component).toMatchSnapshot();
    });

    test('isInvalid is rendered', () => {
      const component = render(<EuiSuperSelectControl isInvalid />);

      expect(component).toMatchSnapshot();
    });

    test('disabled options are rendered', () => {
      const component = render(
        <EuiSuperSelectControl
          options={[
            { value: '1', inputDisplay: 'Option #1', disabled: false },
            { value: '2', inputDisplay: 'Option #2', disabled: true },
          ]}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('value option is rendered', () => {
      const component = render(
        <EuiSuperSelectControl
          options={[
            { value: '1', inputDisplay: 'Option #1' },
            { value: '2', inputDisplay: 'Option #2' },
          ]}
          value={'1'}
          onChange={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('empty value option is rendered', () => {
      const value = undefined;
      const component = render(
        <EuiSuperSelectControl
          options={[
            { value: '1', inputDisplay: 'Option #1' },
            { value: '2', inputDisplay: 'Option #2' },
          ]}
          value={value}
          onChange={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const component = render(
        <EuiForm fullWidth>
          <EuiSuperSelectControl />
        </EuiForm>
      );

      if (
        !component
          .find('.euiSuperSelectControl')
          .hasClass('euiSuperSelectControl--fullWidth')
      ) {
        throw new Error(
          'expected EuiSuperSelectControl to inherit fullWidth from EuiForm'
        );
      }
    });
  });

  describe('accessible prepend and append', () => {
    test('prepended label is accessible', () => {
      const component = render(
        <EuiSuperSelectControl
          id="eui-super-select-1"
          options={[
            { value: '1', inputDisplay: 'Option #1' },
            { value: '2', inputDisplay: 'Option #2' },
          ]}
          prepend={<span className="euiFormLabel">Prepend</span>}
        />
      );

      const button = component.find('button#eui-super-select-1');
      const prepend = component.find('span#prepend-0-eui-super-select-1');

      expect(button).toHaveLength(1);
      expect(prepend).toHaveLength(1);

      expect(button.prop('aria-labelledby')).toEqual(
        'prepend-0-eui-super-select-1 eui-super-select-1'
      );

      expect(component).toMatchSnapshot();
    });

    test('appended label is accessible', () => {
      const component = render(
        <EuiSuperSelectControl
          id="eui-super-select-1"
          options={[
            { value: '1', inputDisplay: 'Option #1' },
            { value: '2', inputDisplay: 'Option #2' },
          ]}
          append={<span className="euiFormLabel">Append</span>}
        />
      );

      const button = component.find('button#eui-super-select-1');
      const append = component.find('span#append-0-eui-super-select-1');

      expect(button).toHaveLength(1);
      expect(append).toHaveLength(1);

      expect(button.prop('aria-labelledby')).toEqual(
        'eui-super-select-1 append-0-eui-super-select-1'
      );

      expect(component).toMatchSnapshot();
    });

    test('prepended and appended labels are accessible', () => {
      const component = render(
        <EuiSuperSelectControl
          id="eui-super-select-1"
          options={[
            { value: '1', inputDisplay: 'Option #1' },
            { value: '2', inputDisplay: 'Option #2' },
          ]}
          append={<span className="euiFormLabel">Append</span>}
          prepend={<span className="euiFormLabel">Prepend</span>}
        />
      );

      const button = component.find('button#eui-super-select-1');
      const append = component.find('span#append-0-eui-super-select-1');
      const prepend = component.find('span#prepend-0-eui-super-select-1');

      expect(button).toHaveLength(1);
      expect(append).toHaveLength(1);
      expect(prepend).toHaveLength(1);

      expect(button.prop('aria-labelledby')).toEqual(
        'prepend-0-eui-super-select-1 eui-super-select-1 append-0-eui-super-select-1'
      );

      expect(component).toMatchSnapshot();
    });

    test('multiple labels are accessible', () => {
      const component = render(
        <EuiSuperSelectControl
          id="eui-super-select-1"
          options={[
            { value: '1', inputDisplay: 'Option #1' },
            { value: '2', inputDisplay: 'Option #2' },
          ]}
          append={[
            <span className="euiFormLabel">Append 1</span>,
            <span className="euiFormLabel">Append 2</span>,
          ]}
          prepend={[
            <span className="euiFormLabel">Prepend 1</span>,
            <span className="euiFormLabel">Prepend 2</span>,
          ]}
        />
      );

      const button = component.find('button#eui-super-select-1');

      expect(button).toHaveLength(1);

      expect(button.prop('aria-labelledby')).toEqual(
        'prepend-0-eui-super-select-1 prepend-1-eui-super-select-1 eui-super-select-1 append-0-eui-super-select-1 append-1-eui-super-select-1'
      );

      expect(component).toMatchSnapshot();
    });
  });
});

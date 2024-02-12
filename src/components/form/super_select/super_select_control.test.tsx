/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test';
import { render } from '../../../test/rtl';

import { EuiForm } from '../form';
import { EuiSuperSelectControl } from './super_select_control';

describe('EuiSuperSelectControl', () => {
  test('is rendered', () => {
    const { container } = render(<EuiSuperSelectControl {...requiredProps} />);

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth is rendered', () => {
      const { container } = render(<EuiSuperSelectControl fullWidth />);

      expect(container).toMatchSnapshot();
    });

    test('compressed is rendered', () => {
      const { container } = render(<EuiSuperSelectControl compressed />);

      expect(container).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const { container } = render(<EuiSuperSelectControl isLoading />);

      expect(container).toMatchSnapshot();
    });

    test('isInvalid is rendered', () => {
      const { container } = render(<EuiSuperSelectControl isInvalid />);

      expect(container).toMatchSnapshot();
    });

    test('disabled options are rendered', () => {
      const { container } = render(
        <EuiSuperSelectControl
          options={[
            { value: '1', inputDisplay: 'Option #1', disabled: false },
            { value: '2', inputDisplay: 'Option #2', disabled: true },
          ]}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('value option is rendered', () => {
      const { container } = render(
        <EuiSuperSelectControl
          options={[
            { value: '1', inputDisplay: 'Option #1' },
            { value: '2', inputDisplay: 'Option #2' },
          ]}
          value={'1'}
          onChange={() => {}}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('empty value option is rendered', () => {
      const value = undefined;
      const { container } = render(
        <EuiSuperSelectControl
          options={[
            { value: '1', inputDisplay: 'Option #1' },
            { value: '2', inputDisplay: 'Option #2' },
          ]}
          value={value}
          onChange={() => {}}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('placeholder is rendered', () => {
      const { container } = render(
        <EuiSuperSelectControl
          options={[
            { value: '1', inputDisplay: 'Option #1' },
            { value: '2', inputDisplay: 'Option #2' },
          ]}
          placeholder="Select an option"
          onChange={() => {}}
        />
      );

      expect(container).toMatchSnapshot();
      const placeholder = container.querySelector(
        '.euiSuperSelectControl__placeholder'
      );

      expect(placeholder).toBeInTheDocument();
    });
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const { container } = render(
        <EuiForm fullWidth>
          <EuiSuperSelectControl />
        </EuiForm>
      );

      const control = container.querySelector('.euiSuperSelectControl');
      expect(control).toHaveClass('euiSuperSelectControl--fullWidth');
    });
  });

  describe('falsy values', () => {
    describe('when value is falsy but not null/undefined', () => {
      test('empty string', () => {
        const { getByTestSubject, container } = render(
          <EuiSuperSelectControl
            data-test-subj="value"
            options={[
              { value: '', inputDisplay: 'Empty string' },
              { value: 'test', inputDisplay: 'Test string' },
            ]}
            value={''}
          />
        );

        expect(getByTestSubject('value')).toHaveTextContent('Empty string');
        expect(container.querySelector('input')).toHaveValue('');
      });

      test('boolean', () => {
        const { getByTestSubject, container } = render(
          <EuiSuperSelectControl<boolean>
            data-test-subj="value"
            options={[
              { value: true, inputDisplay: 'True' },
              { value: false, inputDisplay: 'False' },
            ]}
            value={false}
          />
        );

        expect(getByTestSubject('value')).toHaveTextContent('False');
        expect(container.querySelector('input')).toHaveValue('false');
      });
    });

    describe('when value is undefined', () => {
      it('uses defaultValue', () => {
        const { getByTestSubject, container } = render(
          <EuiSuperSelectControl
            data-test-subj="value"
            options={[{ value: 'test', inputDisplay: 'Test string' }]}
            defaultValue="test"
          />
        );

        expect(getByTestSubject('value')).toHaveTextContent('Test string');
        expect(container.querySelector('input')).toHaveValue('test');
      });

      it('renders empty if both value and defaultValue are undefined', () => {
        const { getByTestSubject, container } = render(
          <EuiSuperSelectControl data-test-subj="value" />
        );

        expect(getByTestSubject('value')).toHaveTextContent('');
        expect(container.querySelector('input')).toHaveValue('');
      });
    });
  });
});

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiForm } from '../form';
import { EuiFieldPassword, EuiFieldPasswordProps } from './field_password';

jest.mock('../validatable_control', () => ({
  EuiValidatableControl: 'eui-validatable-control',
}));

const TYPES: Array<EuiFieldPasswordProps['type']> = [
  'password',
  'text',
  'dual',
];

describe('EuiFieldPassword', () => {
  shouldRenderCustomStyles(<EuiFieldPassword type="dual" />, {
    childProps: ['dualToggleProps'],
  });

  test('is rendered', () => {
    const { container } = render(
      <EuiFieldPassword
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
      const { container } = render(<EuiFieldPassword isInvalid />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const { container } = render(<EuiFieldPassword fullWidth />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const { container } = render(<EuiFieldPassword isLoading />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('prepend and append is rendered', () => {
      const { container } = render(
        <EuiFieldPassword prepend="String" append="String" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('compressed is rendered', () => {
      const { container } = render(<EuiFieldPassword compressed />);

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('type', () => {
      TYPES.forEach((type) => {
        test(`${type} is rendered`, () => {
          const { container } = render(<EuiFieldPassword type={type} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('dual', () => {
      test('dualToggleProps is rendered', () => {
        const { container } = render(
          <EuiFieldPassword type="dual" dualToggleProps={requiredProps} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('dual type also renders append', () => {
        const { container } = render(
          <EuiFieldPassword
            type="dual"
            append={['String', <span>Span</span>]}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('dual does not mutate the append array prop', () => {
        const props: EuiFieldPasswordProps = {
          type: 'dual',
          append: ['one', 'two'],
          dualToggleProps: {
            'data-test-subj': 'toggleButton',
          },
        };
        const component = mount(<EuiFieldPassword {...props} />);

        expect(
          component.find('button[data-test-subj="toggleButton"]').length
        ).toBe(1);
        expect(
          component
            .find('button[data-test-subj="toggleButton"] EuiIcon')
            .props().type
        ).toBe('eye');

        component
          .find('button[data-test-subj="toggleButton"]')
          .simulate('click');

        expect(
          component.find('button[data-test-subj="toggleButton"]').length
        ).toBe(1);
        expect(
          component
            .find('button[data-test-subj="toggleButton"] EuiIcon')
            .props().type
        ).toBe('eyeClosed');
      });
    });
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const { container } = render(
        <EuiForm fullWidth>
          <EuiFieldPassword />
        </EuiForm>
      );

      const input = container.querySelector('.euiFieldPassword');
      expect(input).toHaveClass('euiFieldPassword--fullWidth');
    });
  });
});

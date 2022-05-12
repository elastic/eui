/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

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
  test('is rendered', () => {
    const component = render(
      <EuiFieldPassword
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
      const component = render(<EuiFieldPassword isInvalid />);

      expect(component).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(<EuiFieldPassword fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const component = render(<EuiFieldPassword isLoading />);

      expect(component).toMatchSnapshot();
    });

    test('prepend and append is rendered', () => {
      const component = render(
        <EuiFieldPassword prepend="String" append="String" />
      );

      expect(component).toMatchSnapshot();
    });

    test('compressed is rendered', () => {
      const component = render(<EuiFieldPassword compressed />);

      expect(component).toMatchSnapshot();
    });

    describe('type', () => {
      TYPES.forEach((type) => {
        test(`${type} is rendered`, () => {
          const component = render(<EuiFieldPassword type={type} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('dual', () => {
      test('dualToggleProps is rendered', () => {
        const component = render(
          <EuiFieldPassword type="dual" dualToggleProps={requiredProps} />
        );

        expect(component).toMatchSnapshot();
      });

      test('dual type also renders append', () => {
        const component = render(
          <EuiFieldPassword
            type="dual"
            append={['String', <span>Span</span>]}
          />
        );

        expect(component).toMatchSnapshot();
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
});

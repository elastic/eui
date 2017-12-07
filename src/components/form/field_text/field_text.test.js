import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFieldText } from './field_text';

jest.mock('../form_control_layout', () => ({ EuiFormControlLayout: 'eui-form-control-layout' }));
jest.mock('../validatable_control', () => ({ EuiValidatableControl: 'eui-validatable-control' }));

describe('EuiFieldText', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFieldText
        name="elastic"
        id="1"
        placeholder="Placeholder"
        value="1"
        icon="foo"
        inputRef={() => {}}
        onChange={() => {}}
        {...requiredProps}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    describe('isInvalid', () => {
      [true, false].forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiFieldText
              isInvalid={value}
            />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });

    describe('fullWidth', () => {
      [true, false].forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiFieldText
              fullWidth={value}
            />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });

    describe('isLoading', () => {
      [true, false].forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiFieldText
              isLoading={value}
            />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });
  });
});


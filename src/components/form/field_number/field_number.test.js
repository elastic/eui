import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFieldNumber } from './field_number';

jest.mock('../form_control_layout', () => ({ EuiFormControlLayout: 'eui-form-control-layout' }));
jest.mock('../validatable_control', () => ({ EuiValidatableControl: 'eui-validatable-control' }));

describe('EuiFieldNumber', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFieldNumber
        id="1"
        name="elastic"
        min={1}
        max={8}
        step={1}
        value={1}
        icon="alert"
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
            <EuiFieldNumber
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
            <EuiFieldNumber
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
            <EuiFieldNumber
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

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFieldSearch } from './field_search';

jest.mock('../form_control_layout', () => ({ EuiFormControlLayout: 'eui-form-control-layout' }));
jest.mock('../validatable_control', () => ({ EuiValidatableControl: 'eui-validatable-control' }));

describe('EuiFieldSearch', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFieldSearch
        name="elastic"
        id="1"
        placeholder="Placeholder"
        value="1"
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
            <EuiFieldSearch
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
            <EuiFieldSearch
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
            <EuiFieldSearch
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

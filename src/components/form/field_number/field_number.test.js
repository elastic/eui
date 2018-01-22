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
    test(`isInvalid is rendered`, () => {
      const component = render(
        <EuiFieldNumber
          isInvalid
        />
      );

      expect(component)
        .toMatchSnapshot();
    });

    test(`fullWidth is rendered`, () => {
      const component = render(
        <EuiFieldNumber
          fullWidth
        />
      );

      expect(component)
        .toMatchSnapshot();
    });

    test(`isLoading is rendered`, () => {
      const component = render(
        <EuiFieldNumber
          isLoading
        />
      );

      expect(component)
        .toMatchSnapshot();
    });

    describe('value', () => {
      let value = 0;
      const onChange = (evt) => {
        value = parseFloat(evt.target.value);
        if (isNaN(value)) {
          value = '';
        }
      };

      test(`value is number`, () => {
        const component = render(
          <EuiFieldNumber
            value={value}
            onChange={onChange}
          />
        );
        expect(component)
          .toMatchSnapshot();
      });

      test(`no initial value`, () => {
        value = '';
        const component = render(
          <EuiFieldNumber
            value={value}
            onChange={onChange}
          />
        );
        expect(component)
          .toMatchSnapshot();
      });

    });

  });
});

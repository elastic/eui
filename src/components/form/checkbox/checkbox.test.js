import React from 'react';
import { render } from 'enzyme';
import {
  requiredProps,
  startThrowingReactWarnings,
  stopThrowingReactWarnings,
} from '../../../test';

import { EuiCheckbox, TYPES } from './checkbox';

beforeAll(startThrowingReactWarnings);
afterAll(stopThrowingReactWarnings);

const checkboxRequiredProps = {
  id: 'id',
  onChange: () => {},
};

describe('EuiCheckbox', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCheckbox id="id" onChange={() => {}} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('id is required', () => {
      expect(() => (
        <EuiCheckbox checked={true} onChange={() => {}} />
      )).toThrow();
    });

    test('onChange is required', () => {
      expect(() => <EuiCheckbox id="id" checked={true} />).toThrow();
    });

    test('check is rendered', () => {
      const component = render(
        <EuiCheckbox {...checkboxRequiredProps} checked />
      );

      expect(component).toMatchSnapshot();
    });

    test('label is rendered', () => {
      const component = render(
        <EuiCheckbox {...checkboxRequiredProps} label={<span>Label</span>} />
      );

      expect(component).toMatchSnapshot();
    });

    describe('type', () => {
      TYPES.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiCheckbox {...checkboxRequiredProps} type={value} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('disabled', () => {
      test('disabled is rendered', () => {
        const component = render(
          <EuiCheckbox {...checkboxRequiredProps} disabled />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});

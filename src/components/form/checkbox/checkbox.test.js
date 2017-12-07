import React from 'react';
import { render } from 'enzyme';
import {
  requiredProps,
  startThrowingReactWarnings,
  stopThrowingReactWarnings,
} from '../../../test';

import {
  EuiCheckbox,
  TYPES,
} from './checkbox';

beforeAll(startThrowingReactWarnings);
afterAll(stopThrowingReactWarnings);

const checkboxRequiredProps = {
  id: 'id',
  onChange: () => {},
};

describe('EuiCheckbox', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCheckbox
        id="id"
        onChange={() => {}}
        {...requiredProps}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    test('id is required', () => {
      expect(() => render(
        <EuiCheckbox checked={true} onChange={() => {}}/>
      )).toThrow();
    });

    test('onChange is required', () => {
      expect(() => render(
        <EuiCheckbox id="id" checked={true}/>
      )).toThrow();
    });

    describe('checked', () => {
      [true, false].forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiCheckbox
              {...checkboxRequiredProps}
              checked={value}
            />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });

    describe('label', () => {
      [(<span>Label</span>)].forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiCheckbox
              {...checkboxRequiredProps}
              label={value}
            />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });

    describe('type', () => {
      TYPES.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiCheckbox
              {...checkboxRequiredProps}
              type={value}
            />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });

    describe('disabled', () => {
      [true, false].forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiCheckbox
              {...checkboxRequiredProps}
              disabled={value}
            />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });
    /*
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    label: PropTypes.node,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.oneOf(TYPES),
    disabled: PropTypes.bool,
    */

  });
});

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import {
  EuiFlexGroup,
  GUTTER_SIZES,
  ALIGN_ITEMS,
  JUSTIFY_CONTENTS,
} from './flex_group';

const consoleWarn = console.warn;
const consoleError = console.error;

beforeAll(() => {
  console.warn = console.error = (msg) => { throw msg; };
});

afterAll(() => {
  console.warn = consoleWarn;
  console.error = consoleError;
});

describe('EuiFlexGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFlexGroup {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    test('children', () => {
      const component = render(
        <EuiFlexGroup {...requiredProps}>
          <h2>My Child</h2>
        </EuiFlexGroup>
      );

      expect(component)
        .toMatchSnapshot();
    });

    describe('responsive', () => {
      [true, false].forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiFlexGroup
              responsive={value}
              {...requiredProps}
            />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });

    describe('gutterSize', () => {
      GUTTER_SIZES.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiFlexGroup
              gutterSize={value}
              {...requiredProps}
            />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });

    describe('alignItems', () => {
      ALIGN_ITEMS.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiFlexGroup
              alignItems={value}
              {...requiredProps}
            />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });

    describe('justifyContent', () => {
      JUSTIFY_CONTENTS.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiFlexGroup
              justifyContent={value}
              {...requiredProps}
            />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });

    describe('component', () => {
      ['div', 'span'].forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiFlexGroup
              component={value}
              {...requiredProps}
            />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });

      ['h2'].forEach(value => {
        test(`${value} is not rendered`, () => {
          expect(() => render(
            <EuiFlexGroup
              component={value}
              {...requiredProps}
            />
          )).toThrow();
        });
      });
    });

    describe('wrap', () => {
      [true, false].forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiFlexGroup
              wrap={value}
              {...requiredProps}
            />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });
  });
});

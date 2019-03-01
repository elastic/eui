import React from 'react';
import { render } from 'enzyme';
import {
  requiredProps,
  startThrowingReactWarnings,
  stopThrowingReactWarnings,
} from '../../test';

import {
  EuiFlexGroup,
  GUTTER_SIZES,
  ALIGN_ITEMS,
  JUSTIFY_CONTENTS,
  DIRECTIONS,
} from './flex_group';

beforeAll(startThrowingReactWarnings);
afterAll(stopThrowingReactWarnings);

describe('EuiFlexGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFlexGroup {...requiredProps}>
        <h2>My Child</h2>
      </EuiFlexGroup>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('responsive', () => {
      [true, false].forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(<EuiFlexGroup responsive={value} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('gutterSize', () => {
      GUTTER_SIZES.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(<EuiFlexGroup gutterSize={value} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('alignItems', () => {
      ALIGN_ITEMS.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(<EuiFlexGroup alignItems={value} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('justifyContent', () => {
      JUSTIFY_CONTENTS.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(<EuiFlexGroup justifyContent={value} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('direction', () => {
      DIRECTIONS.forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(<EuiFlexGroup direction={value} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('component', () => {
      ['div', 'span'].forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiFlexGroup component={value as 'div' | 'span'} />
          );

          expect(component).toMatchSnapshot();
        });
      });

      ['h2'].forEach(value => {
        test(`${value} is not rendered`, () => {
          expect(() =>
            render(
              // intentionally passing an invalid value
              // @ts-ignore
              <EuiFlexGroup component={value} />
            )
          ).toThrow();
        });
      });
    });

    describe('wrap', () => {
      [true, false].forEach(value => {
        test(`${value} is rendered`, () => {
          const component = render(<EuiFlexGroup wrap={value} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});

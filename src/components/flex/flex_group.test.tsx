/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test';
import {
  shouldRenderCustomStyles,
  testOnReactVersion,
} from '../../test/internal';
import { render } from '../../test/rtl';

import {
  EuiFlexGroup,
  GUTTER_SIZES,
  ALIGN_ITEMS,
  JUSTIFY_CONTENTS,
  DIRECTIONS,
  COMPONENT_TYPES,
} from './flex_group';

describe('EuiFlexGroup', () => {
  shouldRenderCustomStyles(<EuiFlexGroup />);

  test('is rendered', () => {
    const { container } = render(
      <EuiFlexGroup {...requiredProps}>
        <h2>My Child</h2>
      </EuiFlexGroup>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('responsive', () => {
      [true, false].forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(<EuiFlexGroup responsive={value} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('gutterSize', () => {
      GUTTER_SIZES.forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(<EuiFlexGroup gutterSize={value} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('alignItems', () => {
      ALIGN_ITEMS.forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(<EuiFlexGroup alignItems={value} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('justifyContent', () => {
      JUSTIFY_CONTENTS.forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(<EuiFlexGroup justifyContent={value} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('direction', () => {
      DIRECTIONS.forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(<EuiFlexGroup direction={value} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('wrap', () => {
      [true, false].forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(<EuiFlexGroup wrap={value} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('component', () => {
      COMPONENT_TYPES.forEach((value) => {
        test(`${value} is rendered`, () => {
          const { container } = render(<EuiFlexGroup component={value} />);

          expect(container.firstChild!.nodeName).toEqual(value.toUpperCase());
        });
      });

      // React 18 throws a false error on test unmount for components w/ ref callbacks
      // that throw in a `useEffect`. Note: This only affects the test env, not prod
      // @see https://github.com/facebook/react/issues/25675#issuecomment-1363957941
      // TODO: Remove `testOnReactVersion` once the above bug is fixed
      testOnReactVersion(['16', '17'])(
        `invalid component types throw an error`,
        () => {
          // @ts-expect-error intentionally passing an invalid value
          expect(() => render(<EuiFlexGroup component="h2" />)).toThrow();
        }
      );
    });
  });
});
